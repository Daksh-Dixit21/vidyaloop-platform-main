# VidyaLoop

AI-powered holistic student assessment, reporting, and school administration platform for Indian K-12 students.

A unified platform merging three previously separate repos into one cohesive system. Built for schools to assess students across 22 psychometric dimensions, generate comprehensive PDF reports, manage student accounts via CSV upload, and monitor progress through an admin dashboard.

---

## Features

### For Students

- **Comprehensive Assessment** — 132 questions across 4 sections (Personality, Learning Style, Skills & Abilities, Career Interests) covering 22 dimensions with Likert-scale and multiple-choice questions
- **Personalized Report** — Auto-generated 25+ page PDF report with dimension scores, career theme rankings, Future Readiness Score (FRS), Future Success Index (FSI), top strengths, growth areas, and personalized recommendations
- **Student Dashboard** — View assessment progress, start/continue assessments, and access past reports
- **Secure Login** — JWT-based authentication with first-login password change

### For Schools / Admins

- **Admin Dashboard** — Overview stats (schools, students, completed/pending assessments, average scores), grade-wise distribution
- **Student Management** — Filter by school, grade, search by name/email, view assessment counts and latest status
- **Assessment Monitoring** — Filter attempts by school, grade, status; view scores and linked PDF reports
- **Bulk Student Upload** — Upload CSV/Excel files with student data → auto-creates user accounts + generates credential CSV with login details
- **Credential Batches** — Downloadable CSV batches with student ID, name, class, email, and auto-generated password
- **Question Bank** — Upload/edit assessment questions via CSV, Excel, or JSON; organized by section with inline editing

### Platform Features

- **22 Psychometric Dimensions** — Social Energy, Discipline, Curiosity, Empathy, Resilience, Visual Learning, Practical Learning, Independent Learning, Collaborative Learning, Structured vs Exploratory, Verbal Ability, Numerical Ability, Logical Reasoning, Creative Thinking, Spatial Reasoning, Leadership, and 6 Career Interests (Investigative, Artistic, Social, Enterprising, Conventional, Realistic)
- **12 Career Themes** — Weighted scoring across themes with personalized rankings
- **PDF Report Generation** — Uses WeasyPrint (primary) with ReportLab fallback, supporting rich HTML-to-PDF conversion
- **JWT Authentication** — Role-based access (student / school_admin), scoped school data access
- **Rate Limiting** — IP-based request throttling
- **Upload Size Limits** — Configurable max file size for CSV/Excel uploads
- **Mobile Responsive** — All admin and student dashboards work on mobile devices with responsive card layouts

---

## Architecture

```
vidyaloop-platform-main/
├── frontend/               React + Vite + Tailwind CSS
│   ├── src/pages/          Homepage, Student/School dashboard, Assessment quiz & results
│   ├── src/context/        Auth context with JWT management
│   └── src/services/api.js All API endpoint definitions
├── backend/                FastAPI + Motor (async MongoDB)
│   ├── routes/             auth, admin, students, assessments, reports
│   ├── services/           scoring engine, CSV parser, PDF report generator, auth service
│   ├── models/             Pydantic models for users, students, schools, assessments, reports
│   ├── seed_admin.py       Creates default admin account
│   ├── seed_student.py     Creates dummy student for testing
│   └── server.py           Main entry point with CORS, rate limiting, security headers
├── docs/                   Sample files and implementation plan
├── render.yaml             Render free-tier deployment blueprint
└── start.sh / start.bat    Startup scripts
```

### API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | None | Student login |
| POST | /api/auth/admin/login | None | Admin login |
| GET | /api/auth/me | JWT | Current user info |
| POST | /api/auth/change-password | JWT | Change password |
| GET | /api/admin/dashboard | Admin | Dashboard stats |
| GET | /api/admin/schools | Admin | List schools |
| GET | /api/admin/students | Admin | List students with filters |
| GET | /api/admin/students/{id} | Admin | Single student details |
| GET | /api/admin/assessments | Admin | List assessment attempts |
| GET | /api/admin/assessments/{id}/takers | Admin | Assessment taker details |
| GET | /api/admin/credentials | Admin | Credential batches |
| GET | /api/admin/credentials/{id}/download | Admin | Download credential CSV |
| GET | /api/admin/question-bank | Admin | List question bank |
| POST | /api/admin/question-bank/upload | Admin | Upload questions (CSV/XLSX/JSON) |
| PUT | /api/admin/question-bank/{id} | Admin | Update question |
| POST | /api/admin/upload-students | Admin | Upload student CSV |
| POST | /api/admin/preview-csv | Admin | Preview CSV before upload |
| GET | /api/student/dashboard | Student | Student dashboard data |
| GET | /api/student/assessments | Student | Student's assessments |
| GET | /api/student/reports | Student | Student's reports |
| GET | /api/assessments/types | None | Assessment types |
| GET | /api/assessments/sections | None | Assessment sections |
| GET | /api/assessments/questions | Student | All questions |
| GET | /api/assessments/questions/{section} | Student | Section questions |
| POST | /api/assessments/start | Student | Start assessment |
| POST | /api/assessments/{id}/save-section | Student | Save section progress |
| POST | /api/assessments/{id}/submit | Student | Submit and generate report |
| GET | /api/assessments/{id}/result | Student | Get assessment result |
| GET | /api/reports/{id} | JWT | Get report metadata |
| GET | /api/reports/{id}/download | JWT | Download report PDF |
| GET | /api/reports/{id}/view | JWT | View report in browser |

---

## Local Setup

### Prerequisites

- Python 3.10+
- Node.js 18+
- MongoDB (local or Atlas free tier)

### Backend

```bash
cd backend
python -m venv venv

# Windows PowerShell
.\venv\Scripts\Activate.ps1
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

# Copy env file
copy env.example .env    # Windows
cp env.example .env      # macOS/Linux
```

Edit `backend/.env`:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=vidyaloop
JWT_SECRET=replace-with-a-long-random-secret
CORS_ORIGINS=http://localhost:3000
```

Seed accounts and start:

```bash
python seed_admin.py     # Creates admin@vidyaloop.com / admin123
python seed_student.py   # Creates student@demo.com / demo1234 (optional, for testing)
uvicorn server:app --reload --port 8000
```

Backend available at `http://localhost:8000` with interactive docs at `/docs`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend available at `http://localhost:3000`.

---

## Default Accounts

| Role | Email | Password | Login URL |
|------|-------|----------|-----------|
| Admin | admin@vidyaloop.com | admin123 | /school/login |
| Student (dummy) | student@demo.com | demo1234 | /student/login |

---

## CSV Upload Formats

### Student Upload (for admin credentials tab)

```csv
name,class,section,roll_number,email,gender
Aarav Sharma,10,A,DEMO001,,
Priya Singh,9,B,DEMO002,,
```

Columns: `name` (required), `class` (1-12, required), `section`, `roll_number`, `email`, `gender`

### Question Bank Upload (for admin questions tab)

```csv
id,section,dimension,text,question_type,options,correct_answer,reverse_scored,weight
q_custom_1,personality,curiosity,"I enjoy exploring new ideas",likert_5,,,false,1
q_custom_2,skills_abilities,verbal_ability,"Choose the synonym of candid",multiple_choice,"Frank|Silent|Late|Careful",a,false,1
```

Sections: `personality`, `learning_style`, `skills_abilities`, `career_interests`

Question types: `likert_5` (default), `multiple_choice`

---

## Navigation Flow

```
/                           → Landing page (marketing)
/student/login              → Student login form
/school/login               → Admin login form
/student/dashboard          → Student dashboard (start/continue assessment)
/student/assessment         → Assessment quiz (4 sections, 132 questions)
/student/assessment/result  → Assessment result with report download
/school/dashboard           → Admin dashboard (overview, schools, students, assessments, questions, credentials)
/change-password            → First-login password change
/personality-assessment     → Assessment landing page
/future-readiness-assessment → FRA landing page
```

---

## Deployment

### MongoDB Atlas Free Tier

1. Create Atlas M0 cluster
2. Create database user
3. Allow `0.0.0.0/0` for testing (tighten later)
4. Copy connection string

### Backend (Render)

Use `render.yaml` or create Web Service:
- Root: `backend`
- Build: `pip install -r requirements.txt`
- Start: `uvicorn server:app --host 0.0.0.0 --port $PORT`

Set env vars: `MONGO_URL`, `DB_NAME`, `JWT_SECRET`, `CORS_ORIGINS`

Run seed scripts once (locally or via Render Shell):
```bash
python seed_admin.py
```

### Frontend (Vercel)

Create project with:
- Root: `frontend`
- Build: `npm run build`
- Output: `dist`

Set env var: `VITE_API_URL=https://your-render-service.onrender.com`

---

## Security

- JWT tokens with configurable expiry
- bcrypt password hashing
- Role-based access control (student / school_admin)
- School-scoped data isolation for admins
- IP-based rate limiting
- File upload size limits
- Security headers (X-Content-Type-Options, X-Frame-Options, CSP, HSTS)
- No secrets in client-side code

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 6, Tailwind CSS 3, React Router 7, Axios |
| Backend | FastAPI, Motor (async MongoDB driver) |
| Database | MongoDB (via Atlas free tier or local) |
| Auth | JWT (pyjwt + bcrypt) |
| PDF | WeasyPrint with ReportLab fallback |
| CSV | Built-in csv module + openpyxl for XLSX |
| Deployment | Render (backend) + Vercel (frontend) |
