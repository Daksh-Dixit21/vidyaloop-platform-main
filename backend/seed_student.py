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

    username = "student"
    email = "student@demo.com"
    existing_user = await users_collection.find_one({"$or": [{"username": username}, {"email": email}]})
    if existing_user:
        await users_collection.update_one(
            {"_id": existing_user["_id"]},
            {"$set": {"username": username, "password": hash_password("demo1234"), "name": "Ananya Iyer", "is_active": True}}
        )
        print("=" * 50)
        print("Demo student updated/reset!")
        print("=" * 50)
        print("Username: student")
        print("Password: demo1234")
        print("Role:     student")
        print("Name:     Ananya Iyer")
        print("=" * 50)
        print("Login at: http://localhost:3000/student/login")
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
        "username": username,
        "password": hash_password("demo1234"),
        "name": "Ananya Iyer",
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
        "name": "Ananya Iyer",
        "username": username,
        "class_level": 10,
        "section": "B",
        "roll_number": "DEMO002",
        "school_id": school_id,
        "gender": "Female",
        "is_active": True,
        "created_at": datetime.now(timezone.utc).isoformat()
    })

    print("=" * 50)
    print("Dummy student created!")
    print("=" * 50)
    print(f"Username: student")
    print(f"Password: demo1234")
    print(f"Role:     student")
    print(f"Name:     Ananya Iyer")
    print(f"Class:    10-B")
    print("=" * 50)
    print("Login at: http://localhost:3000/student/login")


if __name__ == "__main__":
    asyncio.run(create_dummy_student())
