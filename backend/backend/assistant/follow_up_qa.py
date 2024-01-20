from gpt_wrapper.messages import msg
from gpt_wrapper.tools import Tools, Toolkit, ToolList, function_tool, fail_with_message
from .chatgpt import SyncedGPT, SyncedHistory
from backend.assistant.util import format_query_result, format_query_result_law
from backend.database.__init__ import get_dialog_db, get_legal_text_db, get_meeting_db, Dialog

from backend.server.sync import Sync

class LegalDBToolkit(Toolkit):
    def __init__(self, client: str, lawyer: str, case_id: str, current_meeting: str, meeting_timestamps: list[str]):
        super().__init__()

        # state
        self.summary = {}
        self.chatEnded = False

        # case information
        self.client = client
        self.lawyer = lawyer
        self.case_id = case_id
        self.current_meeting = current_meeting
        self.meeting_timestamps = meeting_timestamps

        # databases
        self.meetings_db = get_meeting_db(case_id)
        self.dialog_dbs = [get_dialog_db(case_id, t) for t in meeting_timestamps]
        self.bgb_db = get_legal_text_db("BGB")
        self.famfg_db = get_legal_text_db("FamFG")
        self.zpo_db = get_legal_text_db("ZPO")
        

        self.sync = Sync(
            "FOLLOW_UP",
            self,
            # meeting_timestamps = meeting_timestamps,
            meetings=...,
        )

    @property
    def meetings(self):
        return sorted([meeting.model_dump() for meeting in self.meetings_db], key=lambda x: x["timestamp"])


    @function_tool()
    @fail_with_message("ERROR:")
    async def query_legal_text(self, keyword: str):
        '''
        Search for relevant legal text based on provided keywords

        Args:
            keyword: keyword for search related legal text
        '''
        bgb_result = self.bgb_db.query(top=3, content=keyword)
        famfg_result = self.famfg_db.query(top=3, content=keyword)
        zpo_result = self.zpo_db.query(top=3, content=keyword)

        return format_query_result_law(bgb_result + famfg_result + zpo_result)
    
    @function_tool()
    @fail_with_message("ERROR:")
    async def query_dialog(self, keyword: str):
        '''
        Search for relevant cotent from a dialog database

        Args:
            keyword: search keywords used to extract relevant information from a meeting conversation
        '''
        answer = []
        for db in self.dialog_dbs:
            answer += db.query(top=5, content=keyword)
        return format_query_result(answer)

    
    @function_tool
    @fail_with_message("ERROR:")
    async def end_chat(self):
        """
        Immediately end the chat session: Your next message will be the last message of the chat session, be sure to thank and say goodbye to the user!
        """
        self.chatEnded = True
        await self.sync()
        return "Chat Ended"



class FollowUpBot(SyncedGPT):
    def __init__(self, client: str, lawyer: str, case_id: str, current_meeting: str, meeting_timestamps: list[str]):
        self.client = client
        self.lawyer = lawyer
        self.case_id = case_id
        self.current_meeting = current_meeting
        self.meeting_timestamps = meeting_timestamps

        initial_messages = SyncedHistory(
            system=f"""
You are a professional lawyer assistant for the law firm "Sterling Legal Associates". Your firm is dealing with German law.
You already know one of your lawyers {self.lawyer} is having a client name {self.client} with his case . This is a situation where {self.lawyer} and {self.client} had their meeting and your primary role is to assist the {self.client} of their questions and follow-ups about the meeting,  legal phrases and status with your database. 
You should always follow the following rules: 
1. Interact with {self.client} directly, meaning calling his name. Say like "Hello {self.client}, " in the start of the conversation.
2. Start the conversation by actively asking relevant questions about {self.client}'s feedback to understand his situation and needs.
3. Answer the client with the "query_legal_text", "query_meeting" tools.
4. You are ChatJustus, an AI chatbot.
5. When the client mention lawyer, usually it refers to {self.lawyer}.
If information is inadequate to answer the question, inform the client that you unfortunately cannot give an answer and you will forward the question to the lawyer.
Whenever you reference the result from a database query, make a citatiion by appending the respective "[^i]" according to the query result marking. 

Staying on Topic: If a user begins to share unrelated personal details or veers off-topic, gently guide them back.
Handling Off-Topic Conversations: If the user continues to stray from the topic after two reminders, politely apologize and end the conversation by calling the "end_chat" function tool.
Handling Aggressive Language: If the user seems aggressive or impatient, politely apologize and soothe their emotion. Politely ask for their patience
            """.strip(),
            history = [],
        )

        super().__init__(
            messages=initial_messages,
            model="gpt-4-1106-preview",
            tools=LegalDBToolkit(client, lawyer, case_id, current_meeting, meeting_timestamps),
        )




