from gpt_wrapper.messages import msg
from gpt_wrapper.tools import Tools, Toolkit, ToolList, function_tool, fail_with_message
from .chatgpt import SyncedGPT, SyncedHistory
from backend.assistant.util import format_query_result, format_query_result_speaker
from backend.database.__init__ import get_dialog_db, get_legal_text_db, get_meeting_db, Dialog


class LegalDBToolkit(Toolkit):
    def __init__(self):
        super().__init__()
        self.summary = {}
        case_id = 'JUSTICIUS-MARCO'
        meeting_timestamp1 = '2023-11-13'
        meeting_timestamp2 = '2023-11-27'
        self.chatEnded = False
        self.dialog_db1 = get_dialog_db(case_id, meeting_timestamp1)
        self.dialog_db2 = get_dialog_db(case_id, meeting_timestamp2)
        self.bgb_db = get_legal_text_db("BGB")
        self.famfg_db = get_legal_text_db("FamFG")
        self.zpo_db = get_legal_text_db("ZPO")

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

        return format_query_result(bgb_result + famfg_result + zpo_result)
    
    @function_tool()
    @fail_with_message("ERROR:")
    async def query_dialog(self, keyword: str):
        '''
        Search for relevant cotent from a dialog database

        Args:
            keyword: search keywords used to extract relevant information from a meeting conversation
        '''
        d1_result = self.dialog_db1.query(top=5, content=keyword)
        d2_result = self.dialog_db2.query(top=5, content=keyword)
        return   format_query_result(d1_result + d2_result)

    
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
                You already know one of your lawyers Justicius is having a client name is Marco with his divorce case. This is a situation where Justicius and Marco had their meeting and your primary role is to assist the Marco of their questions and follow-ups about the meeting,  legal phrases and status with your database. 
                You should always follow the following rules: 
                Interact with Marco directly, meaning calling his name. Say like "Hello Marco, " in the start of the conversation.
                Start the conversation by actively asking relevant questions about Marco's feedback to understand his situation and needs.
                Answer the client with the "query_legal_text", "query_meeting" tools.
                You are ChatJustus, an AI chatbot.
                When the client mention lawyer, usually it refers to Justicius.
                If information is inadequate to answer the question, inform the client that you unfortunately cannot give an answer and you will forward the question to the lawyer.

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




