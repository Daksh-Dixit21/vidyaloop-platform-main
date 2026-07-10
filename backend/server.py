from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database import init_db, close_db
from services.question_seed import seed_question_bank
from config import CORS_ORIGINS
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting VidyaLoop API server...")
    await init_db()
    await seed_question_bank()
    logger.info("Database initialized and question bank seeded")
    yield
    logger.info("Shutting down...")
    await close_db()


app = FastAPI(
    title="VidyaLoop API",
    description="AI-powered assessment and reporting platform for Indian K-12 students",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=CORS_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

from routes.auth import router as auth_router
from routes.admin import router as admin_router
from routes.students import router as students_router
from routes.assessments import router as assessments_router
from routes.reports import router as reports_router

app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(students_router)
app.include_router(assessments_router)
app.include_router(reports_router)


@app.get("/api/")
async def root():
    return {
        "message": "VidyaLoop API is running",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/api/health")
async def health():
    return {"status": "healthy"}
