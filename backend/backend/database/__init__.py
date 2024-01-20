from backend.database.embedding import MockEmbedding, OpenAIEmbedding
from backend.database.vector_db import VectorDB, EmbedData, Field, EmbedField
from legal_db import Dialog, Meeting, LawArticle
import json


def get_dialog_db(case_id, meeting_timestamp):
    return VectorDB(f"Dialog_{case_id}_{meeting_timestamp}", Dialog)


def get_legal_text_db(book):
    return VectorDB(f"{book}", LawArticle)

def get_meeting_db(case_id):
    return VectorDB(f"Meetings_{case_id}", Meeting)