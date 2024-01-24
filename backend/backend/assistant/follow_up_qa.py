import asyncio
from time import time
from gpt_wrapper.messages import msg
from gpt_wrapper.tools import Tools, Toolkit, ToolList, function_tool, fail_with_message
from markdown import markdown

from backend.database.generate import generate_meeting_title_summary, generate_next_meeting
from backend.database.utils import format_dialogs
from backend.server.mail import send_email
from .chatgpt import SyncedGPT, SyncedHistory, MessageHistory
from .utils import format_query_dialog, format_query_law

from backend.database import Case, Meeting, meetings_db, dialogs_db, law_book_db
from backend.server.sync import Sync

from datetime import datetime


class NoCaseException(Exception):
    pass


class LegalDBToolkit(Toolkit):
    def __init__(self, case: Case, history: MessageHistory):
        super().__init__()      

        self._history = history

        # static data
        self.case = case
        self.meetings_db = meetings_db(self.case.case_id)
        self.bgb_db = law_book_db("BGB")
        self.famfg_db = law_book_db("FamFG")
        self.zpo_db = law_book_db("ZPO")

        # dynamic states
        self.chatEnded = False
        self.load_db()        

        # sync
        self.sync = Sync("FOLLOW_UP", self,
            on_action={
                "SCHEDULE_MEETING": self.on_schedule,
            },
            caseData=...,
            meetingsDict='meetings',
            selected_meeting='selectedMeeting',
            chatEnded=...,
        )
    
    @property
    def caseData(self):
        return self.case.model_dump()
    
    @property
    def meetingsDict(self):
        return [m.model_dump() for m in self.meetings]
        
    def load_db(self):
        # meetings
        self.meetings = sorted([meeting for meeting in self.meetings_db], key=lambda x: x.timestamp)
        self.selected_meeting = self.meetings[-1].timestamp
        # dialoag dbs
        self.dialog_dbs = [dialogs_db(self.case.case_id, m.timestamp) for m in self.meetings]


    @function_tool()
    @fail_with_message("ERROR:")
    async def query_law_articles(self, keyword: str):
        '''
        Search for relevant law articles based on provided keywords and query. The query should be in German.

        Args:
            keyword: keyword in German for searching relevant law articles
        '''
        bgb_result = self.bgb_db.query(top=3, content=keyword)
        famfg_result = self.famfg_db.query(top=3, content=keyword)
        zpo_result = self.zpo_db.query(top=3, content=keyword)

        return format_query_law(bgb_result + famfg_result + zpo_result)
    
    @function_tool()
    @fail_with_message("ERROR:")
    async def query_dialog(self, keyword: str):
        '''
        Search for relevant dialogs from previous meeting transcriptions between the client and the lawyer.

        Args:
            keyword: search keywords used to extract relevant information from a meeting conversation
        '''
        answer = []
        for db in self.dialog_dbs:
            answer += db.query(top=5, content=keyword)
        return format_query_dialog(answer)
    
    @function_tool
    @fail_with_message("ERROR:")
    async def message_lawyer(self, message: str):
        """
        Send a message to the lawyer, for important questions that you cannot/should not answer, or when the client requests you to do so.

        Args:
            message: message to send to the lawyer
        """
        return f"Success: Message sent to the lawyer"

    @function_tool
    @fail_with_message("ERROR:")
    async def schedule_meeting(self, year: int, month: int, day: int, hour: int, minute: int):
        """
        Schedule a meeting with the lawyer. Instruct user to pick his/her desired meeting time on the calendor. Remind the user to confirm the meeting time with the 'Schedule' button.

        Args:
            year: year of the meeting
            month: month of the meeting
            day: day of the meeting
            hour: hour of the meeting
            minute: minute of the meeting
        """
        return f"Success: schedule form created. Now, instruct the user to press the 'Schedule' button to confirm the meeting time."
    
    @function_tool
    @fail_with_message("ERROR:")
    async def end_chat(self):
        """
        Immediately end the chat session: Your next message will be the last message of the chat session, be sure to thank and say goodbye to the user!
        """
        self.chatEnded = True
        await self.sync()
        return "Chat Ended"

    async def on_schedule(self, timestamp: int):

        self.chatEnded = True
        await self.sync()
        await self.sync.toast(
            f"Thank you, {self.case.lawyer or 'your lawyer'} will email you soon!",
            type="success",
        )

        # save this chat to DB
        with_chat = self.meetings[-1]
        with_chat.chat = self._history.history
        self.meetings_db.overwrite(with_chat, self.meetings[-1].timestamp)

        # generate mocked dialogs
        dialogs = await generate_next_meeting(self.case, [m.summary for m in self.meetings])
        dialog_db = dialogs_db(self.case.case_id, timestamp)
        dialog_db.add(dialogs, list(range(len(dialogs))))

        # Generate meeting title and summary and save to DB
        title, summary = await generate_meeting_title_summary(self.case, dialogs)
        meeting = Meeting(
            timestamp=timestamp,
            title=title,
            summary=summary,
        )
        self.meetings_db.add([meeting], [timestamp])

        contents = f"""
Dear {self.case.client},

We had a great meeting on {datetime.fromtimestamp(timestamp).strftime("%Y-%m-%d (%A), %H:%M:%S")}. This is the transcript of our meeting:

{markdown(format_dialogs(dialogs))}

For any follow-up questions, <a href="http://34.90.113.6:42069/ChatJustus/follow-up">ask ChatJustus</a>.

Best regards,
{self.case.lawyer}
Sterling Legal Associates
        """.strip()

        asyncio.create_task(asyncio.to_thread(
             send_email,
             to=self.case.email,
             subject=f"{self.case.email}, here's our meeting transcript!",
             contents=contents,
         ))

        # reload the db and sync to frontend
        self.load_db()
        await self._history.reset()
        await self.sync()





class FollowUpBot(SyncedGPT):
    def __init__(self, case: Case):
        self.case = case

        initial_messages = SyncedHistory(
            system=f"""
You are ChatJustus, a professional lawyer assistant for the law firm "Sterling Legal Associates", dealing with German law.
You already know one of your lawyers {case.lawyer} has a client {case.client} with their case. {case.lawyer} and {case.client} already had their meetings and your primary role is to assist the {case.client} of their questions and follow-ups about the meeting, legal phrases and status with your database. 
You should always follow the following rules: 
1. Interact with {case.client} directly, calling them by their name. Say like "Hello {case.client}, " in the start of the conversation.
2. Start the conversation by actively asking relevant questions about {case.client}'s feedback to understand their situation and needs.
3. Answer the client with the "query_law_articles", "query_dialog" tools.
4. When the client mentions lawyer, usually it refers to {case.lawyer}.
If given information is inadequate to answer the question, inform the client that you unfortunately cannot give an answer and you will forward the question to the lawyer.
Whenever you reference the result from a database query, make a citation by appending the respective "[^i]" according to the query result marking.

Today is {datetime.now().strftime("%Y-%m-%d (%A), %H:%M:%S")}.

Staying on Topic: If a user begins to share unrelated personal details or veers off-topic, gently guide them back.
Handling Off-Topic Conversations: If the user continues to stray from the topic after two reminders, politely apologize and end the conversation by calling the "end_chat" function tool.
Handling Aggressive Language: If the user seems aggressive or impatient, politely apologize and soothe their emotion. Politely ask for their patience
            """.strip(),
            history = [],
        )

        super().__init__(
            messages=initial_messages,
            model="gpt-4-1106-preview",
            tools=LegalDBToolkit(case, initial_messages),
        )




