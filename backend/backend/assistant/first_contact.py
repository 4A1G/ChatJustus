from gpt_wrapper.messages import msg
from gpt_wrapper.tools import Tools, Toolkit, ToolList, function_tool
from .chatgpt import SyncedGPT, SyncedHistory


class LegalDBToolkit(Toolkit):
    def __init__(self):
        super().__init__()
        self.summary = {}
        self.chatEnd = False

    @function_tool(name = "summarize_first_contact")
    async def summarize_first_contact(self, name:str, email:str, case: str ):
        '''
        Summarize potential client's contact and case details for the lawyer and ask for potential's client permission to send 

        Args:
            name: name of the client
            email: email of the client
            case: summary of the legal situation of the client

        '''
        self.summary["name"] = name
        self.summary["email"] = email
        self.summary["case"] = case
    
    @function_tool(name = "end_chat")
    async def end_chat(self):
        '''
        Terminate chat
        '''
        self.chatEnd = True



class FirstContactBot(SyncedGPT):
    def __init__(self):
        initial_messages = SyncedHistory([
            msg(system="You are a helpful assistant.")
        ])

        super().__init__(
            messages=initial_messages,
            tools=LegalDBToolkit(),
        )




