from gpt_wrapper.messages import msg
from gpt_wrapper.tools import Tools, Toolkit, ToolList, function_tool, fail_with_message
from .chatgpt import SyncedGPT, SyncedHistory
from backend.assistant.util import format_query_result, format_query_result_law
from backend.database.__init__ import get_dialog_db, get_legal_text_db, get_meeting_db, Dialog

from backend.server.sync import Sync

class LegalDBToolkit(Toolkit):
    def __init__(self):
        super().__init__()

        # state
        self.summary = {}
        self.chatEnded = False

        # databases
        case_id = 'JUSTICIUS-MARCO'
        meeting_timestamps = ['2023-11-13', '2023-11-27']
        self.client = 'Marco'
        self.lawyer = 'Justicius'
    

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
        return   format_query_result(answer)

    
    @function_tool(name = "end_chat")
    @fail_with_message("ERROR:")
    async def end_chat(self):
        '''
        Terminate chat
        '''
        self.chatEnded = True
        return "Success"



class FollowUpBot(SyncedGPT):
    def __init__(self):
        initial_messages = SyncedHistory([
            msg(system="""You are a professional lawyer assistant for the law firm "Sterling Legal Associates". Your firm is dealing with German law.
                You already know one of your lawyers {self.lawyer} is having a client name {self.client} with his case . This is a situation where Justicius and Marco had their meeting and your primary role is to assist the Marco of their questions and follow-ups about the meeting,  legal phrases and status with your database. 
                You should always follow the following rules: 
                Interact with Marco directly, meaning calling his name. Say like "Hello {self.client}, " in the start of the conversation.
                Start the conversation by actively asking relevant questions about Marco's feedback to understand his situation and needs.
                Answer the client with the "query_legal_text", "query_meeting" tools.
                You are ChatJustus, an AI chatbot.
                When the client mention lawyer, usually it refers to Justicius.
                If information is inadequate to answer the question, inform the client that you unfortunately cannot give an answer and you will forward the question to the lawyer.
                Whenever you reference the result from a database query, make a citatiion by appending the respective "[^i]" according to the query result marking. 

                Staying on Topic: If a user begins to share unrelated personal details or veers off-topic, gently guide them back.
                Handling Off-Topic Conversations: If the user continues to stray from the topic after two reminders, politely apologize and end the conversation by calling the "end_chat" function tool.
                Handling Aggressive Language: If the user seems aggressive or impatient, politely apologize and soothe their emotion. Politely ask for their patience
                """.strip())
        ])

        super().__init__(
            messages=initial_messages,
            model="gpt-4-1106-preview",
            tools=LegalDBToolkit(),
        )




