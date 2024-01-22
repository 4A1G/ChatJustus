import asyncio
from backend.assistant.follow_up_qa import FollowUpBot
from backend.database.schemas import cases_db, meetings_db
from .sync import Sync


class CaseManager:
    def __init__(self, case_id: str):
        # init case
        db = cases_db()
        try:
            case = db.retrieve([case_id])[0]
            print(f"Case {case_id} found")
        except:
            print(f"Case {case_id} not found, using demo")
            # create a demo
            case_id = "JUSTICIUS-MARCO"
            case = [c for c in db if c.case_id == case_id][0]
        self.case = case.model_dump()

        # init meetings
        self.meetings_db = meetings_db(case_id)
        meetings = sorted([meeting for meeting in self.meetings_db], key=lambda x: x.timestamp)
        self.meetings = [m.model_dump() for m in meetings] # convert to dict for frontend        
        self.assistant = FollowUpBot(case, meetings) # latest meeting: follow-up bot
        self.selected_meeting = meetings[-1].timestamp

        self.sync = Sync("MEETINGS", self,
            case='caseData',
            meetings=...,
            selected_meeting='selectedMeeting',
        )

