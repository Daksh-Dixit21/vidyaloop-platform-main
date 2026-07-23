from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'vidyaloop')

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

users_collection = db['users']
schools_collection = db['schools']
students_collection = db['students']
assessments_collection = db['assessments']
reports_collection = db['reports']
question_banks_collection = db['question_banks']
credentials_collection = db['credentials']
assessment_configs_collection = db['assessment_configs']

async def init_db():
    await users_collection.create_index('email', unique=True, sparse=True)
    await students_collection.create_index('user_id')
    await students_collection.create_index('school_id')
    await students_collection.create_index([('school_id', 1), ('class_level', 1)])
    await schools_collection.create_index('name')
    await assessments_collection.create_index('student_id')
    await assessments_collection.create_index('school_id')
    await assessments_collection.create_index('status')
    await assessments_collection.create_index([('student_id', 1), ('assessment_type', 1)])
    await reports_collection.create_index('assessment_id', unique=True)
    await reports_collection.create_index('student_id')
    await question_banks_collection.create_index([('section', 1), ('dimension', 1)])
    await question_banks_collection.create_index('assessment_id')
    await assessment_configs_collection.create_index('name', unique=True)

async def close_db():
    client.close()

