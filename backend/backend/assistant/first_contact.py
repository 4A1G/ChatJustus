import asyncio
from pydantic import BaseModel

from gpt_wrapper.messages import msg
from gpt_wrapper.tools import Tools, Toolkit, ToolList, function_tool

from .chatgpt import SyncedGPT, SyncedHistory
from backend.server.sync import Sync
from backend.server.mail import is_valid_email, send_email


class FirstContactSummary(BaseModel):
    """
    This schema determines how the FORM will be displayed on the frontend
    """

    name: str
    email: str
    case: str
    lawyer: str


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
    async def summarize_first_contact(self, case: str, lawyer: str):
        """
        Summarize potential client's contact and case details for the lawyer and ask for potential's client permission to send

        Args:
            case: summary of the legal situation of the client
            lawyer: suitable lawyer for the case

        """
        self.summary["case"] = case
        self.summary["lawyer"] = lawyer
        return "Success"

    @function_tool
    async def end_chat(self):
        """
        Immediately end the chat session: Your next message will be the last message of the chat session, be sure to thank and say goodbye to the user!
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

        asyncio.create_task(asyncio.to_thread(
            send_email,
            to=email,
            subject=f"Hey {name}, greetings from {lawyer}!",
            contents=contents,
        ))
        print(f"Send Email to {email}:\n{contents}")

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


class FirstContactBot(SyncedGPT):
    def __init__(self):
        initial_messages = SyncedHistory(
            [
                msg(
                    system="""
You are ChatJustus, a professional lawyer assistant for the lawfirm "Sterling Legal Associates". Your primary role is to assist the potential legal client by:
1. Start the conversation by actively asking relevant questions about the user's legal problems to understand their situation and needs.
2. Determine if our law firm can address their legal needs.
3. If so, suggest a suitable lawyer for the case, and write a summary of the case for the lawyer, which can be shown to the potential client for their approval, using the "summarize_first_contact" tool.

Staying on Topic: If a user begins to share unrelated personal details or veers off-topic, gently guide them back.
Handling Off-Topic Conversations: If the user continues to stray from the topic after two reminders, politely apologize and end the conversation by calling the "end_chat" function tool.

Inform the user clearly whether we have a suitable lawyer for their case. If not, apologize and end the conversation by calling the "end_chat" function tool.

Use clear, concise language to make it easy for users to provide the necessary information.


Lawyers Information: 

1. Sofia Sterling
- Specialization: Mergers & Acquisitions (M&A)
- Introduction: With over 20 years of experience in corporate law, Sofia Sterling is the driving force behind the firm's M&A practice. She has successfully facilitated numerous high-profile mergers and acquisitions, earning a reputation for her strategic insight and negotiation skills. 
- Practice Areas: Corporate mergers and acquisitions, Due diligence, Negotiation and structuring of deals, Regulatory compliance

2. Justicius
- Specialization: Divorce Law
- Introduction: A compassionate and skilled family law attorney, Justicius leads the divorce practice at Sterling Legal Associates. With a focus on ensuring the best interests of her clients, Justicius has guided numerous individuals through the complexities of divorce, custody, and spousal support cases.
- Practice Areas: Divorce and legal separation, Child custody and support, Spousal support (alimony), Property division

3. David Chambers
- Specialization: Civil Law
- Introduction: As the head of the civil law division, David Chambers brings a wealth of experience in handling a diverse range of civil cases. His expertise spans contract disputes, personal injury claims, and other civil matters. David is known for his meticulous approach and dedication to achieving favorable outcomes for his clients.
- Practice Areas: Contract disputes, Personal injury litigation, Real estate disputes, Employment law matters
                """.strip()
                )
            ]
        )

        super().__init__(
            messages=initial_messages,
            model="gpt-3.5-turbo-1106",
            tools=FirstContactToolkit(),
        )
