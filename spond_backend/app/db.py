import os
from sqlmodel import create_engine, SQLModel, Session

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/clubdb")
engine = create_engine(DATABASE_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session
