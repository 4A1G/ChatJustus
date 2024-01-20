from backend.database.embedding import MockEmbedding, OpenAIEmbedding
from backend.database.vector_db import VectorDB, EmbedData, Field, EmbedField
import json

class Dialog(EmbedData):
    speaker: str
    content: str = EmbedField()


class Meeting(EmbedData):
    timestamp: int # unix timestamp, serves as id
    
    # AI-generated
    title: str # shown on the sidebar
    summary: str = EmbedField() # shown at the beginning of after-meeting 
    
    
class LawArticle(EmbedData):
    book: str
    article_number: str
    title: str
    content: str = EmbedField()
    
    
class CaseRecord(EmbedData):
    timestamp: int # unix timestamp
    title: str
    content: str = EmbedField()


class User(EmbedData):
    user_id: str
    email: str
    case_id: str


def get_user_info(name, email, case_id):
    return VectorDB(f"User_{name}", User)

def get_dialogs(case_id, meeting_timestamp):
    dialogs_by_case = {
        'JUSTICIUS-MARCO_2023-11-13': [
    Dialog(speaker="Justicius", content="Hello, I'm Justicius, your divorce attorney. Nice to meet you, Marco!"),
    Dialog(speaker="Marco", content="Hey, Justicius. Pleasure to meet you too."),
    Dialog(speaker="Justicius", content="As we discussed on the phone, I'll be representing you in your divorce case. How can I assist you further, Marco?"),
    Dialog(speaker="Marco", content="I'm in need of guidance on the overall strategy for my divorce proceedings."),
    Dialog(speaker="Justicius", content="Certainly, Marco. Can you share any specific concerns or priorities you have for the divorce proceedings?"),
    Dialog(speaker="Marco", content="Well, I want to ensure a fair division of assets and a smooth resolution, considering we've already discussed the details on the phone."),
    Dialog(speaker="Justicius", content="Understood, Marco. We'll work towards achieving a fair settlement. Now, let's discuss the strategy. Regarding fees, my hourly rate is 250 euros. I will provide you with detailed invoices, and I'll ensure transparency in tracking the time spent on your case. Additionally, I can provide you with a document outlining the fee structure for your reference."),
    Dialog(speaker="Marco", content="Sounds good. I appreciate your flexibility. Regarding the lawyer's fees, how do you usually structure payments?"),
    Dialog(speaker="Justicius", content="Typically, clients pay a retainer upfront, and then I bill against that retainer on an hourly basis. If a flat fee arrangement works better for you, we can certainly explore that option. What are your preferences, Marco?"),
    Dialog(speaker="Marco", content="I think a flat fee would provide more predictability for me. Can we discuss the details of what that would cover and any potential additional costs?"),
    Dialog(speaker="Justicius", content="Certainly, Marco. We'll outline the scope of work covered by the flat fee, including court filings, consultations, and other necessary tasks. Any additional costs, such as court fees, will be discussed transparently. Now, let's move on to the strategy discussion."),
    Dialog(speaker="Marco", content="Great. I appreciate the clarity. Regarding the strategy, what steps do you propose in handling my divorce case?"),
    Dialog(speaker="Justicius", content="First, I'll review all the relevant documentation. We'll strategize on the best approach to secure your interests, keeping your priorities in mind. I'll keep you informed at every step of the process."),
    Dialog(speaker="Marco", content="That's reassuring. How long do you estimate the divorce process will take, given our prior discussions?"),
    Dialog(speaker="Justicius", content="The timeline depends on various factors, but I'll provide you with a more accurate estimate as we progress. Rest assured, I'll work diligently to expedite the process."),
    Dialog(speaker="Marco", content="Good to know. How often can we expect meetings or updates on the progress of my divorce case?"),
    Dialog(speaker="Justicius", content="I suggest a check-in in two weeks to discuss updates and address any concerns. Additionally, we have a chatbot tool called ChatJustus that will assist you with follow-up questions and updates. It's available 24/7 for your convenience."),
    Dialog(speaker="Marco", content="That works for me. Let's move forward with the representation. Do you need any further information from me at this stage?"),
    Dialog(speaker="Justicius", content="I'll need copies of the relevant documents, including your marriage certificate, financial statements, and any existing prenuptial or postnuptial agreements. Additionally, we'll finalize the details of the flat fee arrangement, and I'll provide you with the separate document on fees. I'm looking forward to working together, Marco."),
    Dialog(speaker="Marco", content="Likewise. Thanks for taking on my divorce case. I'll provide the necessary documents, and we can finalize the fee arrangement. I'm relieved to have you on my side."),
    Dialog(speaker="Justicius", content="It's my pleasure, Marco. I'm here to advocate for your best interests throughout the divorce process. Feel free to reach out if you have any questions before our next meeting."),
    Dialog(speaker="Marco", content="Thank you, I will. Looking forward to a smooth resolution."),
    Dialog(speaker="Justicius", content="Likewise, Marco. Have a great day, and we'll be in touch soon.")
],
        'JUSTICIUS-MARCO_2023-11-27': [
    Dialog(speaker="Justicius", content="Good day, Marco! I trust everything has been going smoothly since our last discussion."),
    Dialog(speaker="Marco", content="Hello, Justicius! Yes, everything's been fine. I've had some time to review the documents we discussed, and I'm ready for our next steps."),
    Dialog(speaker="Justicius", content="Excellent. I'm glad to hear that. Let's delve into the details. I've thoroughly reviewed the documents you provided, including your marriage certificate and financial statements. It's essential to have a comprehensive understanding of your situation."),
    Dialog(speaker="Marco", content="I appreciate your thoroughness, Justicius. Is there anything specific you need from me at this point?"),
    Dialog(speaker="Justicius", content="Not at the moment. You've done a great job compiling the necessary information. In our current discussion, let's focus on the key elements of our divorce strategy. One significant aspect is addressing potential challenges that may arise, such as disagreements on asset division, spousal support, or child custody. By anticipating these challenges now, we can formulate proactive solutions."),
    Dialog(speaker="Marco", content="That sounds important, Justicius. What strategies do you propose for handling potential disagreements on asset division?"),
    Dialog(speaker="Justicius", content="For asset division, it's crucial to establish a clear inventory of shared assets and debts. During our strategy discussions, we'll delve into detailed negotiation approaches, considering your priorities and what's fair and equitable. If needed, we can explore mediation or alternative dispute resolution methods to find common ground."),
    Dialog(speaker="Marco", content="I see. And what about potential challenges regarding spousal support?"),
    Dialog(speaker="Justicius", content="Spousal support considerations vary widely. We'll examine your financial situation and your spouse's to determine a fair arrangement. This involves calculating factors like income, earning capacity, and the duration of the marriage. By addressing these details upfront, we aim to minimize disputes and streamline the process."),
    Dialog(speaker="Marco", content="That makes sense. Child custody is also a concern. How can we approach that?"),
    Dialog(speaker="Justicius", content="Child custody matters are sensitive. Our strategy involves crafting a parenting plan that prioritizes the child's best interests. We'll discuss factors like the child's relationship with each parent, living arrangements, and visitation schedules. By being proactive and considering the child's well-being, we aim to create a plan that both parties find acceptable."),
    Dialog(speaker="Marco", content="I appreciate the detailed insight, Justicius. It's reassuring to know we're being proactive about potential challenges."),
    Dialog(speaker="Marco", content="Also, I've found ChatJustus to be quite helpful. It's available 24/7 for quick updates or questions, providing additional convenience."),
    Dialog(speaker="Justicius", content="I'm glad to hear that, Marco. ChatJustus is indeed a valuable resource. Strategy is key in navigating a divorce, and having ChatJustus at your disposal ensures continuous support. Our goal is to approach each aspect thoughtfully, addressing potential issues before they become major obstacles. If you have any specific concerns or preferences in these areas, feel free to share them, and we'll incorporate them into our strategy."),
    Dialog(speaker="Marco", content="Thank you, Justicius. I feel more informed and confident about the road ahead. Let's continue developing our strategy."),
    Dialog(speaker="Justicius", content="Certainly, Marco. Your input is valuable as we tailor our approach to your unique situation. Remember, open communication is crucial throughout this process. If you have any questions or thoughts between our scheduled meetings, don't hesitate to reach out via ChatJustus or directly. We're here to support you."),
    Dialog(speaker="Marco", content="I appreciate that, Justicius. Looking forward to crafting a solid strategy together. Have a great day!"),
    Dialog(speaker="Justicius", content="You too, Marco. We'll be in touch soon.")
]
    }

    
    key = f"{case_id}_{meeting_timestamp}"

    
    return dialogs_by_case.get(key, [])


def to_timestamp(meeting_timestamp):
    import datetime
    date_object = datetime.datetime.strptime(meeting_timestamp, '%Y-%m-%d')
    return int(date_object.timestamp())


def get_meeting_summary(case_id, meeting_timestamp):
    meeting_by_case = {
        'JUSTICIUS-MARCO_2023-11-13': [
    Meeting(timestamp=to_timestamp(meeting_timestamp),title="Divorce Case Strategy and Fee Discussion with Justicius",
        summary= "In your last meeting with Justicius, the following key points were covered: Fee Structure : 1. Justicius provided information on his hourly rate and the possibility of a flat fee arrangement to give you more predictability in legal costs. 2. Divorce Strategy : A strategy will be developed to ensure a fair division of assets and a smooth resolution, with Justicius keeping you informed at every step of the process. 3. Documentation and Next Steps**: You'll need to provide relevant documents such as your marriage certificate and financial statements, and a check-in meeting is suggested in two weeks to discuss updates.Do you have any questions about these points or anything else from the meeting?")
],
        'JUSTICIUS-MARCO_2023-11-27': [
    Meeting(timestamp=to_timestamp(meeting_timestamp),title="Divorce Strategy and Support Tools Meeting",
        summary = "In your last meeting with your lawyer Justicius, the following key points were discussed: 1. Proactive Strategy for Potential Challenges: Justicius emphasized the importance of being proactive in addressing potential challenges in your divorce, such as asset division, spousal support, and child custody. He plans to anticipate these issues and formulate solutions in advance. 2. Detailed Negotiation and Parenting Plans: A clear inventory of shared assets and debts will be established for asset division, and detailed negotiation approaches will be considered. For child custody, a parenting plan that prioritizes your child's best interests will be crafted, taking into account various factors to ensure a fair and acceptable arrangement. 3. Use of ChatJustus for Support: You've found the ChatJustus tool helpful, and Justicius encourages its continued use. It provides 24/7 support for updates and questions, ensuring continuous assistance throughout your divorce proceedings.Do you have any questions or concerns about the points covered in the meeting?")
    
]
    }

    
    key = f"{case_id}_{meeting_timestamp}"

    
    return meeting_by_case.get(key, [])

def get_legal_text(book):
    BGB, ZPO, FamFG = None, None, None  

    with open('BJNR001950896_output.json', 'r') as f:
        BGB_data = json.load(f)
        BGB = [
            LawArticle(
                book=article['jurabk'],
                article_number=article['enbez'],
                title=article['titel'],
                content=article['content']
            )
            for article in BGB_data
            if article['jurabk'] == 'BGB'
            and article.get('enbez')
            and article.get('titel')
            and article.get('content')
        ]

    with open('BJNR005330950_output.json', 'r') as f:
        ZPO_data = json.load(f)
        ZPO = [
            LawArticle(
                book=article['jurabk'],
                article_number=article['enbez'],
                title=article['titel'],
                content=article['content']
            )
            for article in ZPO_data
            if article['jurabk'] == 'ZPO'
            and article.get('enbez')
            and article.get('titel')
            and article.get('content')
        ]
    
    with open('BJNR258700008_output.json', 'r') as f:
        FamFG_data = json.load(f)
        FamFG = [
            LawArticle(
                book=article['jurabk'],
                article_number=article['enbez'],
                title=article['titel'],
                content=article['content']
            )
            for article in FamFG_data
            if article['jurabk'] == 'FamFG'
            and article.get('enbez')
            and article.get('titel')
            and article.get('content')
        ]

    legal_text_by_book = {
        'BGB': BGB,
        'ZPO': ZPO, 
        'FamFG': FamFG
    }

    return legal_text_by_book.get(book, [])
