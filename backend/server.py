from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from database import init_db, close_db
from services.question_seed import seed_question_bank
from config import CORS_ORIGINS, RATE_LIMIT_REQUESTS, RATE_LIMIT_WINDOW_SECONDS
import logging
import time

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
rate_limit_buckets = {}


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

@app.middleware("http")
async def security_and_rate_limit(request: Request, call_next):
    client = request.client.host if request.client else "unknown"
    now = time.time()
    window_start = now - RATE_LIMIT_WINDOW_SECONDS
    hits = [ts for ts in rate_limit_buckets.get(client, []) if ts > window_start]
    if len(hits) >= RATE_LIMIT_REQUESTS:
        return JSONResponse(
            {"detail": "Too many requests. Please wait and try again."},
            status_code=429,
            headers={"Retry-After": str(RATE_LIMIT_WINDOW_SECONDS)},
        )
    hits.append(now)
    rate_limit_buckets[client] = hits

    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    if request.url.scheme == "https":
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response

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


