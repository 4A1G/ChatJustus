from backend.database.embedding import MockEmbedding, OpenAIEmbedding
from backend.database.vector_db import VectorDB, EmbedData, Field, EmbedField
import json

from gpt_wrapper.api import openai_chat
from gpt_wrapper.assistants import ChatGPT
from gpt_wrapper.messages import SimpleHistory, msg
from gpt_wrapper.tools import function_tool


class Dialog(EmbedData):
    speaker: str
    content: str = EmbedField()

class Meeting(EmbedData):
    timestamp: int # unix timestamp, serves as id
    
    # AI-generated
    title: str # shown on the sidebar
    summary: str = EmbedField() # shown at the beginning of after-meeting 





async def create_mocked_dialogs(name, lawyer, case_id, meeting_timestamp, case):
    # Step 2: dialog generator
    # response = await openai_chat(
    #     model="gpt-3.5-turbo-1106",
    #     messages=[msg(user=f"""Generate a dialog (around 20 conversations) with the ID of {meeting_timestamp} between the {lawyer} and the {name} based on the 
    # information from {case}. It should be the first interaction of the lawyer and client. Usually, talk about general things about the case, 
    # the lawyer's strategy, and the fee. The conversation always starts with the lawyer speaking first.""")]
    #     tools=generate_dialogs.schema,
    #     tool_choice={"type": "function", "function": {"name": "generate_dialogs"}}
    # )
    # dialog = response.choices[0].message.tool_calls[0].function.arguments

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
    await dialogger.first_tool_call(f"""Generate a LONG imaginary dialog (around 20 messages!) with the ID of {meeting_timestamp} between the {lawyer} and the {name} based on the 
    case summary below. It should be the first interaction of the lawyer and client. Usually, talk about general things about the case, 
    the lawyer's strategy, and the fee. The conversation always starts with the lawyer speaking first.\nCase Summary: {case}""")

    # at this point, mocked_dialogs is filled with the generated dialogs

    # Step 3: Generate an object for the database
    meeting_timestamp = meeting_timestamp
    dialogs_db = VectorDB(f"Dialog_{case_id}_{meeting_timestamp}", Dialog)
    dialogs_db.reset()
    dialogs_db.add(mocked_dialogs)  

    return mocked_dialogs


async def create_meeting_from_dialogs(name, lawyer, case_id, meeting_timestamp, dialogs: list[Dialog]):
    formatted_dialog = format_dialogs(dialogs)

    # Step 1: Summarize
    summarizer = ChatGPT(messages=SimpleHistory(), model="gpt-4-1106-preview")
    summary = await summarizer(f"""
The following is a full trasncript of a legal meeting between the lawyer {lawyer} and the client {name}.
Please summarize for the client {name}, the 3 most important points of the meeting to be reminded about.
You MUST address {name} directly in your summary! Start the summary with "In your last meeting..." and end by 1 sentence asking if {name} has any questions about the meeting.
Use markdown formatting and bullet points.

[Trascript]:
{formatted_dialog}""".strip(), temperature=0.5)

    # Step 2: Generate a title
    titlizer = ChatGPT(messages=SimpleHistory(), model="gpt-4-1106-preview")
    title = await titlizer(f"Please generate a short title (<10 words) for the given meeting summary:\n\n{summary}", temperature=0.5)

    # Add to meetings DB
    meeting_db = VectorDB(f"Meetings_{case_id}", Meeting)
    meeting_db.reset() # reset if exists
    meeting = Meeting(timestamp=meeting_timestamp, title=title, summary=summary)
    meeting_db.add(meeting) 


def format_dialogs(dialogs: list[Dialog]):
    return "\n".join([f"{d.speaker}: {d.content}" for d in dialogs])