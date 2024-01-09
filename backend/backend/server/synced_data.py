from backend.data.case_data import FirstContactSummary
from .sync import Sync

class ExposeData:
    def __init__(self):
        self.firstContactSummarySchema = FirstContactSummary.model_json_schema()

        self.sync = Sync("DATA", self)