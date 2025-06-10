from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.models import Submission
from app.db import get_session
from app.schemas import SubmissionCreate

router = APIRouter()

@router.get("/form")
def get_form():
    return [{
        "clubId": "britsport",
        "formId": "B171388180BC457D9887AD92B6CCFC86",
        "title": "Coding camp summer 2025",
        "registrationOpens": "2024-12-16T00:00:00Z",
        "memberTypes": [
            {"id": "8FE4113D4E4020E0DCF887803A886981", "name": "Active Member"},
            {"id": "4237C55C5CC3B4B082CBF2540612778E", "name": "Social Member"}
        ],
        "group": "Group A"
    },
    {

        "clubId": "testport",
        "formId": "B171388180BC457D9887AD92B6CCFC87",
        "title": "Tennis camp summer 2025",
        "registrationOpens": "2025-12-16T00:00:00Z",
        "memberTypes": [
            {"id": "8FE4113D4E4020E0DCF887803A886981", "name": "Active Member"},
            {"id": "4237C55C5CC3B4B082CBF2540612778E", "name": "Social Member"}
        ],
        "group": "Group B"

    }]

@router.post("/form/submit")
def submit_form(
    submission_data: SubmissionCreate,
    session: Session = Depends(get_session)
):
    submission = Submission(**submission_data.dict())
    session.add(submission)
    session.commit()
    session.refresh(submission)
    return {"message": "Submission successful", "id": submission.id}