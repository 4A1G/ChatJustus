from gpt_wrapper.messages import msg
from gpt_wrapper.tools import Tools, Toolkit, ToolList, function_tool
from .chatgpt import SyncedGPT, SyncedHistory


class LegalDBToolkit(Toolkit):
    def __init__(self):
        super().__init__()


class FirstContactBot(SyncedGPT):
    def __init__(self):
        message = SyncedHistory([
            msg(system="You are a helpful assistant.")
        ])

        super().__init__(
            messages=message,
            tools=ToolList([LegalDBToolkit()])
        )

