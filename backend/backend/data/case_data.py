from pydantic import BaseModel

class FirstContactSummary(BaseModel):
    name: str
    email: str
    case: str