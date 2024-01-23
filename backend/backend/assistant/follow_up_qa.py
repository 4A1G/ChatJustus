from gpt_wrapper.messages import msg
from gpt_wrapper.tools import Tools, Toolkit, ToolList, function_tool, fail_with_message
from .chatgpt import SyncedGPT, SyncedHistory
from .utils import format_query_dialog, format_query_law

from backend.database import Case, Meeting, meetings_db, dialogs_db, law_book_db
from backend.server.sync import Sync

from datetime import datetime

class LegalDBToolkit(Toolkit):
    def __init__(self, case: Case, meetings: list[Meeting]):
        super().__init__()      

        # state
        # self.chatEnded = False

        # case information
        self.case = case
        self.meetings = meetings

        # databases
        self.dialog_dbs = [dialogs_db(case.case_id, m.timestamp) for m in self.meetings]
        self.bgb_db = law_book_db("BGB")
        self.famfg_db = law_book_db("FamFG")
        self.zpo_db = law_book_db("ZPO")

        # sync
        # self.sync = Sync("FOLLOW_UP", self,
            
        # )


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
        return f"Meeting Scheduled on {year}-{month}-{day} {hour}:{minute}"
    
    # @function_tool
    # @fail_with_message("ERROR:")
    # async def end_chat(self):
    #     """
    #     Immediately end the chat session: Your next message will be the last message of the chat session, be sure to thank and say goodbye to the user!
    #     """
    #     self.chatEnded = True
    #     await self.sync()
    #     return "Chat Ended"



class FollowUpBot(SyncedGPT):
    def __init__(self, case: Case, meetings: list[Meeting]):
        self.case = case
        self.meetings = meetings

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
            tools=LegalDBToolkit(case, meetings),
        )




