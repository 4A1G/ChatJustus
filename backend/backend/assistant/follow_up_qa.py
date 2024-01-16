from gpt_wrapper.messages import msg
from gpt_wrapper.tools import Tools, Toolkit, ToolList, function_tool
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
        dialog_db1 = get_dialog_db(case_id, meeting_timestamp1)
        dialog_db2 = get_dialog_db(case_id, meeting_timestamp2)
        bgb_db = get_legal_text_db("BGB")
        famfg_db = get_legal_text_db("FamFG")
        zpo_db = get_legal_text_db("ZPO")



        @function_tool()
        async def query_legal_text(keyword: str):
            '''
            Search for relevant legal text based on provided keywords

            Args:
                
                keyword: keyword for search related legal text
                


            '''
            bgb_result = format_query_result(bgb_db.query(top=3, content=keyword))
            famfg_result = format_query_result(famfg_db.query(top=3, content=keyword))
            zpo_result = format_query_result(zpo_db.query(top=3, content=keyword))

            return bgb_result + famfg_result + zpo_result
        
        @function_tool
        async def query_dialog(content: str):
            '''
            Search for relevant cotent from a dialog database

            Args:
                content: search keywords used to extract relevant information from a meeting conversation
            '''
            return format_query_result(dialog_db1.query(top=3, content=content)) + format_query_result(dialog_db2.query(top=3, content=content))

        


        
        @function_tool(name = "end_chat")
        async def end_chat(self):
            '''
            Terminate chat
            '''
            self.chatEnded = True
            return "Success"



class FollowUpBot(SyncedGPT):
    def __init__(self):
        initial_messages = SyncedHistory([
            msg(system="You are a helpful assistant.")
        ])

        super().__init__(
            messages=initial_messages,
            tools=LegalDBToolkit(),
        )




