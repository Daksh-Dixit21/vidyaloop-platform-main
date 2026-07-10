"""
Seed script to create a default school admin account.
Run: python seed_admin.py
"""
import asyncio
from database import users_collection, init_db
from services.auth_service import hash_password
from datetime import datetime, timezone
import uuid


async def create_admin():
    await init_db()
    
    admin_id = f"usr_admin_{uuid.uuid4().hex[:8]}"
    
    existing = await users_collection.find_one({"email": "admin@vidyaloop.com"})
    if existing:
        print("Admin account already exists: admin@vidyaloop.com")
        print("Password: admin123")
        return
    
    doc = {
        "_id": admin_id,
        "email": "admin@vidyaloop.com",
        "password": hash_password("admin123"),
        "name": "VidyaLoop Admin",
        "role": "school_admin",
        "school_id": None,
        "first_login": False,
        "is_active": True,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await users_collection.insert_one(doc)
    print("=" * 50)
    print("Admin account created successfully!")
    print("=" * 50)
    print(f"Email:    admin@vidyaloop.com")
    print(f"Password: admin123")
    print(f"Role:     school_admin")
    print("=" * 50)
    print("Login at: http://localhost:3000/school/login")


if __name__ == "__main__":
    asyncio.run(create_admin())
