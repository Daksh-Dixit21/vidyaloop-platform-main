"""
Seed script to create a dummy student for testing.
Run: python seed_student.py
"""
import asyncio
import uuid
from database import init_db, students_collection, users_collection, schools_collection, credentials_collection
from services.auth_service import hash_password
from datetime import datetime, timezone


async def create_dummy_student():
    await init_db()

    email = "student@demo.com"
    existing_user = await users_collection.find_one({"email": email})
    if existing_user:
        print(f"Student already exists: {email}")
        print("Password: demo1234")
        return

    school_id = "sch_demo"
    existing_school = await schools_collection.find_one({"_id": school_id})
    if not existing_school:
        await schools_collection.insert_one({
            "_id": school_id,
            "name": "Demo School",
            "contact_email": "school@demo.com",
            "status": "active",
            "created_at": datetime.now(timezone.utc).isoformat()
        })

    user_id = f"usr_stu_{uuid.uuid4().hex[:8]}"
    student_id = f"stu_{uuid.uuid4().hex[:8]}"

    await users_collection.insert_one({
        "_id": user_id,
        "email": email,
        "password": hash_password("demo1234"),
        "name": "Aarav Sharma",
        "role": "student",
        "student_id": student_id,
        "school_id": school_id,
        "first_login": True,
        "is_active": True,
        "created_at": datetime.now(timezone.utc).isoformat()
    })

    await students_collection.insert_one({
        "_id": student_id,
        "user_id": user_id,
        "name": "Aarav Sharma",
        "email": email,
        "class_level": 10,
        "section": "A",
        "roll_number": "DEMO001",
        "school_id": school_id,
        "gender": "Male",
        "is_active": True,
        "created_at": datetime.now(timezone.utc).isoformat()
    })

    print("=" * 50)
    print("Dummy student created!")
    print("=" * 50)
    print(f"Email:    student@demo.com")
    print(f"Password: demo1234")
    print(f"Role:     student")
    print(f"Name:     Aarav Sharma")
    print(f"Class:    10-A")
    print("=" * 50)
    print("Login at: http://localhost:3000/student/login")


if __name__ == "__main__":
    asyncio.run(create_dummy_student())
