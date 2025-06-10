from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_form():
    response = client.get("/form")
    assert response.status_code == 200
    data = response.json()
    assert data["clubId"] == "britsport"
    assert "memberTypes" in data
    assert len(data["memberTypes"]) >= 1

def test_valid_submission():
    response = client.post("/form/submit", json={
        "name": "Alice",
        "email": "alice@example.com",
        "phone": "1234567890",
        "birth_date": "2000-01-01",
        "member_type_id": "8FE4113D4E4020E0DCF887803A886981",
        "group": "Group A"
    })
    assert response.status_code == 200
    assert response.json()["message"] == "Submission successful"

def test_invalid_email():
    response = client.post("/form/submit", json={
        "name": "Bob",
        "email": "invalid-email",
        "phone": "1234567890",
        "birth_date": "2000-01-01",
        "member_type_id": "8FE4113D4E4020E0DCF887803A886981",
        "group": "Group A"
    })
    assert response.status_code == 422
