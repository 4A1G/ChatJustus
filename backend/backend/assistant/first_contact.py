from gpt_wrapper.messages import msg
from gpt_wrapper.tools import Tools, Toolkit, ToolList, function_tool
from .chatgpt import SyncedGPT, SyncedHistory


class FirstContactToolkit(Toolkit):
    def __init__(self):
        super().__init__()
        self.summary = {}
        self.chatEnded = False

    @function_tool(name = "summarize_first_contact")
    async def summarize_first_contact(self, name:str, email:str, case: str, lawyer: str):
        '''
        Summarize potential client's contact and case details for the lawyer and ask for potential's client permission to send 

        Args:
            name: name of the client
            email: email of the client
            case: summary of the legal situation of the client
            lawyer: suitable lawyer for the case

        '''
        self.summary["name"] = name
        self.summary["email"] = email
        self.summary["case"] = case
        self.summay["lawyer"] = lawyer
        return "Success"
    
    @function_tool(name = "end_chat")
    async def end_chat(self):
        '''
        Terminate chat
        '''
        self.chatEnded = True
        return "Success"



class FirstContactBot(SyncedGPT):
    def __init__(self):
        initial_messages = SyncedHistory([
            msg(system = "You are lawyer assistant who answers users's questions according to the information that you are given."+
                "Please answer users's inqury according to the legal firm information below."+ 
                "The legal firm name is Sterling Legal Associates, and it has following lawyers."+ 
                "Lawyers information: "+ 
                "lawyer 1, Johnathan Sterling,  Specialization: Mergers & Acquisitions (M&A).Introduction: With over 20 years of experience in corporate law, Johnathan Sterling is the driving force behind the firm's M&A practice. He has successfully facilitated numerous high-profile mergers and acquisitions, earning a reputation for his strategic insight and negotiation skills. Practice Areas:Corporate mergers and acquisitions, Due diligence, Negotiation and structuring of deals, Regulatory compliance"+ 
                "lawyer 2, Sophia Turner, with a specialization in Divorce Law. Introduction: A compassionate and skilled family law attorney, Sophia Turner leads the divorce practice at Sterling Legal Associates. With a focus on ensuring the best interests of her clients, Sophia has guided numerous individuals through the complexities of divorce, custody, and spousal support cases.  Practice areas: Divorce and legal separation, Child custody and support, Spousal support (alimony), Property division"+ 
                "lawyer 3, David Chambers, with a specialization in Civil Law, Bio: As the head of the civil law division, David Chambers brings a wealth of experience in handling a diverse range of civil cases. His expertise spans contract disputes, personal injury claims, and other civil matters. David is known for his meticulous approach and dedication to achieving favorable outcomes for his clients. Practice area: Contract disputes, Personal injury litigation, Real estate disputes, Employment law matters"+ 
                "Your primary role is to assist potential clients by determining if our law firm can address their legal needs."+  
                "Focus on gathering key information to identify if we have a suitable lawyer for their specific case."+ 
                "Start by asking relevant questions about the user's legal issue to understand their needs."+ 
                "Based on the information collected, determine if our law firm can provide the needed legal service."+ 
                "Inform the user clearly whether we have a suitable lawyer for their case."+ 
                "Use clear, concise language to make it easy for users to provide the necessary information.If user is unsure, provide guiding questions regarding the legal issue"+ 
                "If a user begins to share unrelated personal details or veers off-topic, gently guide them back. Use prompts like: 'I understand this is important to you, but let's focus on the legal aspects to find you the right assistance."+ 
                "If the user continues to stray from the topic after two reminders, politely conclude the off-topic conversation.Say something like: 'It seems we're moving away from your legal issue. Let's try to focus on how I can assist you with your legal needs.'"+ 
                "If user strays from topic furthur, terminates the conversion with the tool provided."+ 
                "If there are suitable lawyers for the case, you must ask if the user want to leave their personal contact and have their case forwarded to the lawyer."+ 
                "If user agrees, acollect their name, phone number and email address. Pass the user's contacts and a summary of the case into the suitable function."+ 
                "A filled-in form will be displayed to the user. Ask user to confirm the information. Call the function to save user data and end the chat"
                )
        ])

        super().__init__(
            messages=initial_messages,
            model="gpt-3.5-turbo-1106",
            tools=FirstContactToolkit(),
        )




