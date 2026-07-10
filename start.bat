@echo off
echo ========================================
echo    VidyaLoop Platform - Starting Up
echo ========================================
echo.

echo [1/4] Setting up backend...
cd backend

if not exist "venv" (
    echo   Creating Python virtual environment...
    python -m venv venv
)

call venv\Scripts\activate.bat

echo   Installing Python dependencies...
pip install -r requirements.txt -q 2>nul

echo   Seeding admin account...
python seed_admin.py

echo.
echo [2/4] Starting backend server on port 8000...
start "VidyaLoop Backend" cmd /k "uvicorn server:app --host 0.0.0.0 --port 8000 --reload"

cd ..

echo.
echo [3/4] Setting up frontend...
cd frontend

if not exist "node_modules" (
    echo   Installing npm dependencies...
    call npm install --legacy-peer-deps 2>nul
)

echo.
echo [4/4] Starting frontend server on port 3000...
start "VidyaLoop Frontend" cmd /k "npm start"

cd ..

echo.
echo ========================================
echo    VidyaLoop is Starting!
echo ========================================
echo.
echo   Frontend:  http://localhost:3000
echo   Backend:   http://localhost:8000
echo   API Docs:  http://localhost:8000/docs
echo.
echo   Admin Login:
echo     Email:    admin@vidyaloop.com
echo     Password: admin123
echo.
echo ========================================
echo.
pause
