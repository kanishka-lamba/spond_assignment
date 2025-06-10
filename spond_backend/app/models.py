from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date

class Submission(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    phone: str
    birth_date: date
    member_type_id: str
    group: str
