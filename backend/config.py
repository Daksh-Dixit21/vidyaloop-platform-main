import os
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

JWT_SECRET = os.environ.get('JWT_SECRET', 'vidyaloop-secret-key-change-in-production-2026')
JWT_EXPIRY_HOURS = int(os.environ.get('JWT_EXPIRY_HOURS', '24'))
REPORT_OUTPUT_DIR = os.environ.get('REPORT_OUTPUT_DIR', './reports')
cors_env = os.environ.get('CORS_ORIGINS', 'http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173,http://127.0.0.1:5173')
CORS_ORIGINS = [origin.strip() for origin in cors_env.split(',') if origin.strip()]
RATE_LIMIT_REQUESTS = int(os.environ.get('RATE_LIMIT_REQUESTS', '120'))
RATE_LIMIT_WINDOW_SECONDS = int(os.environ.get('RATE_LIMIT_WINDOW_SECONDS', '60'))
UPLOAD_MAX_BYTES = int(os.environ.get('UPLOAD_MAX_BYTES', str(5 * 1024 * 1024)))

