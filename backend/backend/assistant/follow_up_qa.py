from gpt_wrapper.messages import msg
from gpt_wrapper.tools import Tools, Toolkit, ToolList, function_tool
from .chatgpt import SyncedGPT, SyncedHistory


class LegalDBToolkit(Toolkit):
    def __init__(self):
        super().__init__()
        self.summary = {}
        self.chatEnded = False

        @function_tool()
        async def query_legal_text(keyword: str, field: str):
            '''
            Search for relevant legal text based on provided keywords

            Args:
                keyword: keyword for provision query
                field: narrow down scope of query


            '''
            return "Success"
        
        @function_tool
        async def query_case(keyword: str):
            '''
            Search for relevant past cases with simialr situation

            Args:
                keyword: keyword for case query
            '''

            return "Success"


        
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




