from pydantic import BaseModel

from gpt_wrapper.messages import msg
from gpt_wrapper.tools import Tools, Toolkit, ToolList, function_tool

from backend.server.sync import Sync
from .chatgpt import SyncedGPT, SyncedHistory


class FirstContactSummary(BaseModel):
    '''
    This schema determines how the FORM will be displayed on the frontend
    '''
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

        self.sync = Sync("FIRST_CONTACT", self,
            summary=...,
            chatEnded=...,
            summarySchema=...,
        )

    @function_tool
    async def summarize_first_contact(self, case: str, lawyer: str):
        '''
        Summarize potential client's contact and case details for the lawyer and ask for potential's client permission to send 

        Args:
            case: summary of the legal situation of the client
            lawyer: suitable lawyer for the case

        '''
        self.summary["case"] = case
        self.summary["lawyer"] = lawyer
        return "Success"
    
    @function_tool
    async def end_chat(self):
        '''
        Immediately end the chat session: Your next message will be the last message of the chat session, be sure to thank and say goodbye to the user!
        '''
        self.chatEnded = True
        await self.sync()
        return "Chat Ended"



class FirstContactBot(SyncedGPT):
    def __init__(self):
        initial_messages = SyncedHistory([
            msg(system = '''
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
                '''.strip()
                )
        ])

        super().__init__(
            messages=initial_messages,
            model="gpt-3.5-turbo-1106",
            tools=FirstContactToolkit(),
        )




