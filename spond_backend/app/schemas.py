from typing import Annotated
from pydantic import BaseModel, EmailStr, Field
from datetime import date

class SubmissionCreate(BaseModel):
    name: Annotated[str, Field(min_length=1)]
    email: EmailStr
    phone: Annotated[str, Field(min_length=7)]
    birth_date: date
    member_type_id: str
    group: str
