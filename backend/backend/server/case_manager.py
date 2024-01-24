# import asyncio
# from backend.assistant.follow_up_qa import FollowUpBot
# from backend.database.schemas import Case, cases_db, meetings_db
# from .sync import Sync, _global_connection

# class NoCaseException(Exception):
#     pass

# class CaseManager:
#     def __init__(self, case: Case):
#         self.case = case.model_dump()

#         # init meetings
#         self.meetings_db = meetings_db(case.case_id)
#         meetings = sorted([meeting for meeting in self.meetings_db], key=lambda x: x.timestamp)
#         self.meetings = [m.model_dump() for m in meetings] # convert to dict for frontend        
#         self.assistant = FollowUpBot(case, meetings) # latest meeting: follow-up bot
#         self.selected_meeting = meetings[-1].timestamp

#         self.sync = Sync("MEETINGS", self,
#             case='caseData',
#             meetings=...,
#             selected_meeting='selectedMeeting',
#         )

