from pydantic import BaseModel
from gpt_wrapper.api import openai_chat
from gpt_wrapper.assistants import ChatGPT, StructGPT
from gpt_wrapper.messages import SimpleHistory, msg
from gpt_wrapper.tools import function_tool

from .schemas import Dialog, Case
from .utils import format_dialogs, format_summaries


class MeetingDialogs(BaseModel):
    dialogs: list[Dialog]
dialog_generator = StructGPT(MeetingDialogs, "gpt-3.5-turbo-1106")

class MeetingTitle(BaseModel):
    title: str
titlizer = StructGPT(MeetingTitle, "gpt-3.5-turbo-1106")


async def generate_first_meeting(case: Case) -> list[Dialog]:
    try:
        d = await dialog_generator(f"""
Generate a LONG imaginary dialog (around 20 messages!) between the lawyer {case.lawyer} and the client {case.client} based on the case summary below.

It should be the first interaction of the lawyer and client. Usually, talk about general things about the case, the lawyer's strategy, and the fee. The conversation always starts with the lawyer speaking first, then taking turns. The legal case of the client should be memorable and interesting. Make up imaginary yet specific details, such that the lawyer answers the client's questions and actually makes PROGRESS on the legal case. For example, instead of saying "I will inform you about the fees", say something specific like "My fees are usually 200 euros per hour, but I offer a flat rate of 1000 euros for divorce cases.".

Case Summary:
{case.summary}
            """.strip(),
            temperature=0.5
        )
        return d.dialogs
    except Exception as e:
        print(e)
        return [
            Dialog(speaker=case.lawyer, content=f"Hello, {case.client}!"),
            Dialog(speaker=case.client, content=f"Hey nice to meet you, {case.lawyer}!"),
            Dialog(speaker=case.lawyer, content=f"Let's talk about your case. I understand your concerns."),
            Dialog(speaker=case.client, content=f"Thank you! I really hope we can win this case!"),
            Dialog(speaker=case.lawyer, content=f"Me too! Let's discuss fees. I charge 200 euros per hour."),
            Dialog(speaker=case.client, content=f"Okay, that's fine."),
            Dialog(speaker=case.lawyer, content=f"Great! I'll send you the contract soon."),
            Dialog(speaker=case.client, content=f"Thank you!"),
        ]


async def generate_next_meeting(case: Case, summaries: list[str]) -> list[Dialog]:
    formatted_summaries = format_summaries(summaries)
    try:
        d = await dialog_generator(f"""
Generate a LONG imaginary dialog (around 20 messages!) between the lawyer {case.lawyer} and the client {case.client} based on the summary of multiple meetings below.

The lawyer and client have already met more than once. Usually, talk about the progress about the case and the next steps. The conversation always starts with the lawyer speaking first, then taking turns. Make up imaginary yet specific details, such that the lawyer answers the client's questions and actually makes PROGRESS on the legal case. For example, instead of saying "I will inform you about the fees", say something specific like "My fees are usually 200 euros per hour, but I offer a flat rate of 1000 euros for divorce cases.".

Case Summary:
{case.summary}

Meeting Summaries:
{formatted_summaries}
            """.strip(),
            temperature=0.5
        )
        return d.dialogs
    except:
        return [
            Dialog(speaker=case.lawyer, content=f"Hello, {case.client}!"),
            Dialog(speaker=case.client, content=f"Great to see you again, {case.lawyer}!"),
            Dialog(speaker=case.lawyer, content=f"How did the court hearing go?"),
            Dialog(speaker=case.client, content=f"It went well!"),
            Dialog(speaker=case.lawyer, content=f"Great, see you next time!")
        ]



async def generate_meeting_title_summary(case: Case, dialogs: list[Dialog]) -> tuple[str, str]:
    formatted_dialog = format_dialogs(dialogs)

    # Step 1: Summarize
    summarizer = ChatGPT(messages=SimpleHistory(), model="gpt-4-1106-preview")
    summary = await summarizer(f"""
The following is a full transcript of a legal meeting between the lawyer {case.lawyer} and the client {case.client}.
Summarize for the client {case.client}, the 3 most important points of the meeting to be reminded about.
You MUST address {case.client} directly in your summary! Start the summary with "In your last meeting..." and end by 1 sentence asking if {case.client} has any questions about the meeting.
Use markdown formatting and bullet points.

[Meeting Transcript]:
{formatted_dialog}""".strip(), temperature=0.5)

    # Step 2: Generate a title
    t = await titlizer(f"Generate a short title (<10 words) for the given meeting summary:\n\n{summary}", temperature=0.5)
    title = t.title.replace('"', '').strip()

    return title, summary
