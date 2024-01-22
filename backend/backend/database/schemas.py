'''
This module defines the schemas and the databases
'''
from .core.vector_db import VectorDB, EmbedData, EmbedField



#========== For General DB ==========#
class Lawyer(EmbedData):
    '''
    For lawyer management: a lawyer's data
    '''
    name: str
    specialization: str
    introduction: str
    practice_areas: list[str]

def lawyers_db():
    # validate=False because we don't actually embed anything, just a normal documentDB
    return VectorDB("Lawyers", Lawyer, validate=False)


class Case(EmbedData):
    '''
    For case management: a client's data and their case
    '''
    case_id: str # this identifies both the user and the case: 1 user <=> 1 case
    client: str # name of the client
    email: str # email of the client
    lawyer: str # name of the lawyer
    summary: str # summary from First Contact

def cases_db():
    # validate=False because we don't actually embed anything, just a normal documentDB
    return VectorDB("Cases", Case, validate=False)



#========== For Case DB ==========#
class Meeting(EmbedData):
    '''
    A meeting from ONE case, each case has one Meeting DB.
    '''
    timestamp: int # unix timestamp, serves as id
    
    # AI-generated
    title: str # shown on the sidebar
    summary: str = EmbedField() # shown at the beginning of after-meeting
    chat: list[dict] | None = None # for after-meeting chat, only saved after conclusion

def meetings_db(case_id: str):
    return VectorDB(f"Meetings_{case_id}", Meeting)


class Dialog(EmbedData):
    '''
    A dialog from ONE meeting, each meeting has one Dialog DB.
    '''
    speaker: str
    content: str = EmbedField()

def dialogs_db(case_id: str, meeting_timestamp: str | int):
    return VectorDB(f"Dialogs_{case_id}_{meeting_timestamp}", Dialog)



#========== For Legal DB ==========#
class LawArticle(EmbedData):
    '''
    A single article from a law book
    '''
    book: str
    article_number: str
    title: str
    content: str = EmbedField()

def law_book_db(book: str):
    return VectorDB(book, LawArticle)
    

class CaseRecord(EmbedData):
    '''
    A single case record from a court, for reference in the future
    '''
    timestamp: int # unix timestamp
    title: str
    content: str = EmbedField()

def case_records_db():
    return VectorDB("CaseRecords", CaseRecord)


