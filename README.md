# 🏕️ Spond Club Signup Form – Full Stack App

A full-stack web application to handle club member signups for events like sports camps. Built using:

- **Frontend**: React + TypeScript + TailwindCSS + Vite
- **Backend**: FastAPI + PostgreSQL and translated into Java Spring Boot + PostgreSQL
- **Database**: PostgreSQL 14 (Dockerized)
- **Development Tools**: Docker Compose, Pytest

---

## 📦 Features

- Multi-step form with:
  - Member type & group selection
  - Personal details input
  - Preview & submit
- Data persistence using PostgreSQL
- Unit tests for backend
- CORS enabled for local frontend-backend communication

---

## 🚀 Quick Start

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/spond_assignment.git
cd spond_assignment
```

---

### 2. Backend Setup

```bash
cd spond_backend
python -m venv venv
source venv/bin/activate  # or .\venv\Scripts\activate on Windows
pip install -r requirements.txt
```

> You can also use Docker for backend (see below 👇).

---

### 3. Frontend Setup

```bash
cd ../spond_frontend
npm install
npm run dev
```

- Open: [http://localhost:5173](http://localhost:5173)

---

## 🐳 Run Backend + DB with Docker

Inside `spond_backend/` or `spond_backend_java/`:

```bash
docker-compose up --build
```

- FastAPI: [http://localhost:8000/docs](http://localhost:8000/docs)
- Java backend: [http://localhost:8000/docs](http://localhost:8080)
- PostgreSQL: available at `localhost:5432` for fastapi and `localhost:5433` for Java

---

## 🧪 Run Backend Tests

```bash
cd spond_backend
pytest
```

---

## 📁 Folder Structure

```
spond_assignment/
├── spond_backend/      # FastAPI backend with DB & API logic
├── spond_backend_java/   # Java Spring Boot backend
├── spond_frontend/     # React + Vite frontend
├── README.md
```

## 👤 Author

Made by Kanishka Lamba.
