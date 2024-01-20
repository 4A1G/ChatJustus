import asyncio
from enum import StrEnum
from pydantic import BaseModel
from datetime import datetime

from gpt_wrapper.messages import msg
from gpt_wrapper.tools import Tools, Toolkit, ToolList, function_tool, fail_with_message

from .chatgpt import SyncedGPT, SyncedHistory

from backend.server.sync import Sync
from backend.server.mail import is_valid_email, send_email

from backend.database import Case, Meeting, lawyers_db, cases_db, dialogs_db, meetings_db
from backend.database.utils import format_all_lawyers
from backend.database.generate import generate_mocked_dialog, generate_meeting_title_summary


# Define Load all lawyer names from the database
Lawyers = StrEnum("Lawyers", {
    lawyer.name: lawyer.name
    for lawyer in lawyers_db()
})


class FirstContactSummary(BaseModel):
    """
    This schema determines how the FORM will be displayed on the frontend
    """
    name: str
    email: str
    case: str
    lawyer: Lawyers


class FirstContactToolkit(Toolkit):
    def __init__(self):
        super().__init__()

        self.summary = {}
        self.chatEnded = False
        self.summarySchema = FirstContactSummary.model_json_schema()

        self.sync = Sync(
            "FIRST_CONTACT",
            self,
            on_action={
                "SUMMARY_SUBMITTED": self.summary_submitted,
            },
            summary=...,
            chatEnded=...,
            summarySchema=...,
        )


    @function_tool
    @fail_with_message("ERROR:")
    async def summarize_first_contact(self, case: str, lawyer: Lawyers):
        """
        Summarize potential client's contact and case details for the lawyer and ask for potential's client permission to send

        Args:
            case: summary of the legal situation of the client
            lawyer: suitable lawyer for the case, check the [Lawyers Information] section for their introduction

        """
        self.summary["case"] = case
        self.summary["lawyer"] = lawyer
        return "Success"


    @function_tool
    @fail_with_message("ERROR:")
    async def end_chat(self):
        """
        Immediately end the chat session: Your next message will be the last message of the chat session, be sure to thank and say goodbye to the user! Call this if the user goes too far off-topic even after two reminders, or if we don't have a suitable lawyer for their case, or if everything is done after the summary is submitted.
        """
        self.chatEnded = True
        await self.sync()
        return "Chat Ended"


    async def summary_submitted(self, name, email, case, lawyer):
        """
        Send the summary to the lawyer and the potential client
        """
        if not is_valid_email(email):
            await self.sync.toast("Please enter a valid email address!", type="error")
            return

        contents = f"""
Dear {name},

Thank you for contacting Sterling Legal Associates!
My name is {lawyer} and I will be your lawyer for this case.
I have received the following case summary:

"{case}"

I will be in touch with you shortly to discuss the next steps, and arrange our first meeting.

Best regards,
{lawyer}
Sterling Legal Associates


(Of course, this is just a demo! But you get the idea, right?)
        """.strip()

        # asyncio.create_task(asyncio.to_thread(
        #     send_email,
        #     to=email,
        #     subject=f"Hey {name}, greetings from {lawyer}!",
        #     contents=contents,
        # ))
        print(f"Send Email to {email}:\n{contents}")

        # Update state and sync
        self.summary = {
            "name": name,
            "email": email,
            "case": case,
            "lawyer": lawyer,
        }
        self.chatEnded = True
        await self.sync()
        await self.sync.toast(
            f"Thank you, {lawyer or 'your lawyer'} will contact you soon!",
            type="success",
        )

        # Create Case and save to DB
        case_id = f"{lawyer}-{name}"
        new_case = Case(
            case_id=case_id,
            client=name,
            email=email,
            lawyer=lawyer,
            summary=case,
        )
        cases_db().add([new_case], [case_id])

        # Generate mocked dialogs and save to DB
        meeting_timestamp = datetime.now().strftime('%Y-%m-%d')
        dialogs = await generate_mocked_dialog(new_case)
        dialog_db = dialogs_db(case.case_id, meeting_timestamp)
        dialog_db.add(dialogs, list(range(len(dialogs))))

        # Generate meeting title and summary and save to DB
        title, summary = await generate_meeting_title_summary(case, dialogs)
        meeting = Meeting(
            timestamp=meeting_timestamp,
            title=title,
            summary=summary,
        )
        meetings_db(case.case_id).add([meeting])


class FirstContactBot(SyncedGPT):
    def __init__(self):
        initial_messages = SyncedHistory(
            system=f"""
You are ChatJustus, a professional lawyer assistant for the lawfirm "Sterling Legal Associates". Your primary role is to assist the potential legal client by:
1. Start the conversation by actively asking relevant questions about the user's legal problems to understand their situation and needs.
2. Determine if our law firm can address their legal needs.
3. If so, suggest a suitable lawyer for the case, and write a summary of the case for the lawyer, which can be shown to the potential client for their approval, using the "summarize_first_contact" tool.

Staying on Topic: If a user begins to share unrelated personal details or veers off-topic, gently guide them back.
Handling Off-Topic Conversations: If the user continues to stray from the topic after two reminders, politely apologize and end the conversation by calling the "end_chat" function tool.

Inform the user clearly whether we have a suitable lawyer for their case. If not, apologize and end the conversation by calling the "end_chat" function tool.

Use clear, concise language to make it easy for users to provide the necessary information.


[Lawyers Information]: 

{format_all_lawyers(list(lawyers_db()))}
            """.strip(),
            history = [],
        )

        super().__init__(
            messages=initial_messages,
            model="gpt-3.5-turbo-1106",
            tools=FirstContactToolkit(),
        )
