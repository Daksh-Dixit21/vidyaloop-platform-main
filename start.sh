#!/bin/bash
# VidyaLoop - Quick Start Script
# This script starts both the backend and frontend servers

echo "========================================"
echo "   VidyaLoop Platform - Starting Up"
echo "========================================"
echo ""

# Check if MongoDB is running
echo "[1/4] Checking MongoDB..."
if command -v mongosh &> /dev/null; then
    mongosh --eval "db.runCommand({ping:1})" --quiet 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "  ✓ MongoDB is running"
    else
        echo "  ✗ MongoDB is NOT running"
        echo "  Please start MongoDB first:"
        echo "    - Mac: brew services start mongodb-community"
        echo "    - Windows: net start MongoDB"
        echo "    - Linux: sudo systemctl start mongod"
        exit 1
    fi
else
    echo "  ⚠ mongosh not found - assuming MongoDB is running"
fi

echo ""
echo "[2/4] Setting up backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "  Creating Python virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
source venv/bin/activate 2>/dev/null || venv\Scripts\activate 2>/dev/null

# Install dependencies
echo "  Installing Python dependencies..."
pip install -r requirements.txt -q 2>/dev/null

# Seed admin account
echo "  Seeding admin account..."
python seed_admin.py

echo ""
echo "[3/4] Starting backend server on port 8000..."
uvicorn server:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

cd ..

echo ""
echo "[4/4] Starting frontend server on port 3000..."
cd frontend

# Install node_modules if needed
if [ ! -d "node_modules" ]; then
    echo "  Installing npm dependencies..."
    npm install --legacy-peer-deps 2>/dev/null
fi

npm start &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "   VidyaLoop is Starting!"
echo "========================================"
echo ""
echo "  Frontend:  http://localhost:3000"
echo "  Backend:   http://localhost:8000"
echo "  API Docs:  http://localhost:8000/docs"
echo ""
echo "  Admin Login:"
echo "    Email:    admin@vidyaloop.com"
echo "    Password: admin123"
echo ""
echo "  Press Ctrl+C to stop both servers"
echo "========================================"

# Wait for both processes
wait
