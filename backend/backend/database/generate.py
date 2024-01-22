from gpt_wrapper.api import openai_chat
from gpt_wrapper.assistants import ChatGPT
from gpt_wrapper.messages import SimpleHistory, msg
from gpt_wrapper.tools import function_tool

from .schemas import Dialog, Case
from .utils import format_dialogs


async def generate_mocked_dialog(case: Case) -> list[Dialog]:
    # TODO: fix this and simplify
    mocked_dialogs = None

    @function_tool(require_doc=False)
    async def generate_dialogs(dialogs: list[Dialog]):
        nonlocal mocked_dialogs
        mocked_dialogs = [Dialog(**d) for d in dialogs]
    
    print(generate_dialogs.schema)

    class DialogGenerator(ChatGPT):
        def __init__(self):
            super().__init__(SimpleHistory(), generate_dialogs, "gpt-3.5-turbo-1106")
        
        async def first_tool_call(self, prompt: str):
            async for event in self.response_events(prompt):
                match event:
                    case self.ToolResultEvent():
                        return

    dialogger = DialogGenerator()
    await dialogger.first_tool_call(f"""
Generate a LONG imaginary dialog (around 20 messages!) between the lawyer {case.lawyer} and the client {case.client} based on the case summary below.

It should be the first interaction of the lawyer and client. Usually, talk about general things about the case, the lawyer's strategy, and the fee. The conversation always starts with the lawyer speaking first, then taking turns. Come up with creative and interesting details, instead of generic dialog. The legal case of the client should be memorable and interesting.

Case Summary: {case.summary}""")

    # at this point, mocked_dialogs is filled with the generated dialogs
    return mocked_dialogs


async def generate_meeting_title_summary(case: Case, dialogs: list[Dialog]) -> tuple[str, str]:
    formatted_dialog = format_dialogs(dialogs)

    # Step 1: Summarize
    summarizer = ChatGPT(messages=SimpleHistory(), model="gpt-4-1106-preview")
    summary = await summarizer(f"""
The following is a full trasncript of a legal meeting between the lawyer {case.lawyer} and the client {case.client}.
Please summarize for the client {case.client}, the 3 most important points of the meeting to be reminded about.
You MUST address {case.client} directly in your summary! Start the summary with "In your last meeting..." and end by 1 sentence asking if {case.client} has any questions about the meeting.
Use markdown formatting and bullet points.

[Meeting Transcript]:
{formatted_dialog}""".strip(), temperature=0.5)

    # Step 2: Generate a title
    titlizer = ChatGPT(messages=SimpleHistory(), model="gpt-3.5-turbo-1106")
    title = await titlizer(f"Please generate a short title (<10 words) for the given meeting summary:\n\n{summary}", temperature=0.5)
    title = title.replace('"', '').strip()

    return title, summary
