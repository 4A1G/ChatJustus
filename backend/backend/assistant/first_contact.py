import asyncio
from time import time
from enum import StrEnum
from pydantic import BaseModel
from markdown import markdown

from gpt_wrapper.messages import msg, MessageHistory
from gpt_wrapper.tools import Tools, Toolkit, ToolList, function_tool, fail_with_message

from .chatgpt import SyncedGPT, SyncedHistory

from backend.server.sync import Sync
from backend.server.mail import is_valid_email, send_email

from backend.database import Case, Meeting, lawyers_db, cases_db, dialogs_db, meetings_db
from backend.database.utils import format_all_lawyers, format_dialogs
from backend.database.generate import generate_first_meeting, generate_meeting_title_summary


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
    def __init__(self, user_id: str, history: MessageHistory):
        super().__init__()

        self.user_id = user_id
        self._history = history

        self.summary = {}
        self.chatEnded = cases_db().retrieve([user_id]) != []
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
        Summarize potential client's legal case details for the lawyer and ask for potential's client permission to send. The summary should be around 1 paragraph long, but it MUST include all important details of the case. Calling this will show a send form to the user.

        Args:
            case: summary of the legal situation of the client
            lawyer: suitable lawyer for the case, check the [Lawyers Information] section for their introduction
        """
        self.summary["case"] = case
        self.summary["lawyer"] = lawyer
        return "Success: contact form created. Now, instruct the user to fill out the form and press the 'Send' button. However, DO NOT repeat the contents of the summary in your message, since the user can already see the summary in the form!"


    @function_tool
    @fail_with_message("ERROR:")
    async def end_chat(self):
        """
        Immediately end the chat session: Your next message will be the last message of the chat session, be sure to thank and say goodbye to the user! Call this if the user goes too far off-topic even after two reminders, or if we don't have a suitable lawyer for their case.
        """
        self.chatEnded = True
        await self.sync()
        return "Chat Ended"


    async def summary_submitted(self, name, email, case, lawyer):
        """
        Send the summary to the lawyer and the potential client
        """
        # FIXME VIDEO
        # email = "joong-won.seo@tum.de"

        if not name.strip():
            await self.sync.toast("Please enter your name!", type="error")
            return
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

        asyncio.create_task(asyncio.to_thread(
            send_email,
            to=email,
            subject=f"Hey {name}, greetings from {lawyer}!",
            contents=contents,
        ))
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
        case_id = self.user_id
        new_case = Case(
            case_id=case_id,
            client=name,
            email=email,
            lawyer=lawyer,
            summary=case,
            chat=self._history.history,
        )
        cases_db().add([new_case], [case_id])

        # Generate mocked dialogs and save to DB
        meeting_timestamp = int(time())
        dialogs = await generate_first_meeting(new_case)
        dialog_db = dialogs_db(case_id, meeting_timestamp)
        dialog_db.add(dialogs, list(range(len(dialogs))))

        contents_dialog = f"""
Dear {name},

Thank you for trying out our demo!
The following is a mocked transcript of what should happen after the client's first official meeting with the lawyer.
Please use this dialog and the summary in the next email as a reference for the follow up questions.

{format_dialogs(dialogs)}

In the next email, you will receive a summary of the meeting, and a link to ChatJustus to continue. Have fun! :)
Best regards,
LegalRoad
        """.strip()

        asyncio.create_task(asyncio.to_thread(
             send_email,
             to=email,
             subject=f"{name}, here's our first meeting transcript!",
             contents= contents_dialog,
         ))

        # Generate meeting title and summary and save to DB
        title, summary = await generate_meeting_title_summary(new_case, dialogs)
        meeting = Meeting(
            timestamp=meeting_timestamp,
            title=title,
            summary=summary,
        )
        m_db = meetings_db(case_id)
        m_db.reset()
        m_db.add([meeting], [meeting_timestamp])

        # Send after-meeting summary to client
        contents_summary = f"""
Dear {name},

Here's a summary of today's meeting:
{markdown(summary)}
<a href="http://34.90.113.6:42069/ChatJustus/follow-up">Ask ChatJustus</a>

Best regards,
{lawyer}
Sterling Legal Associates

        """.strip()
        
        asyncio.create_task(asyncio.to_thread(
             send_email,
             to=email,
             subject=f"Summary from your first meeting with {lawyer}",
             contents=contents_summary,
         ))


class FirstContactBot(SyncedGPT):
    def __init__(self, user_id: str):

        # load chat if exists
        results = cases_db().retrieve([user_id])
        if len(results) > 0:
            case = results[0]
            initial_messages = SyncedHistory(
                system=case.chat[0],
                history=case.chat[1:],
            )
        else:
            initial_messages = SyncedHistory(
                system=f"""
You are ChatJustus, a professional lawyer assistant for the law firm "Sterling Legal Associates". Your primary role is to assist the potential legal client by:
1. Start the conversation by actively asking 2-3 relevant questions about the user's legal problems to understand their situation and needs.
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
            # model="gpt-3.5-turbo-1106",
            model="gpt-4-1106-preview",
            tools=FirstContactToolkit(user_id, initial_messages),
        )
