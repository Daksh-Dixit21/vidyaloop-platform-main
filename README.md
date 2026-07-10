# VidyaLoop

AI-powered assessment and reporting platform for Indian K-12 students.

## Quick Start

### Prerequisites
- Python 3.10+
- Node.js 16+
- MongoDB running on port 27017

### Run Locally

**Windows:** Double-click `start.bat`

**Mac/Linux:**
```bash
chmod +x start.sh
./start.sh
```

**Manual Start:**

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python seed_admin.py
uvicorn server:app --reload --port 8000

# Frontend (new terminal)
cd frontend
npm install --legacy-peer-deps
npm start
```

### Default Admin Login
- **URL:** http://localhost:3000/school/login
- **Email:** admin@vidyaloop.com
- **Password:** admin123

## Architecture

```
frontend/          React + Tailwind + shadcn/ui
backend/           FastAPI + Motor (async MongoDB)
  routes/          API endpoints (auth, admin, assessments, reports)
  services/        Business logic (scoring, reports, CSV parsing)
  models/          Pydantic data models
```

## Features

- **5 Assessments:** Personality, Emotional Balance, Future Readiness, Academic Aptitude, Psychometric
- **240+ Questions** across 25 dimensions
- **28-page PDF Reports** with charts, analysis, and recommendations
- **School Admin Dashboard** with CSV student upload
- **JWT Authentication** with role-based access

## API Documentation

Once running, visit http://localhost:8000/docs for Swagger docs.

## Project Structure

```
vidyaloop/
  backend/           FastAPI server
  frontend/          React app
  docs/              Documentation and samples
  start.bat          Windows startup
  start.sh           Mac/Linux startup
```
