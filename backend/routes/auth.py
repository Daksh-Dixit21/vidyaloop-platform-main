from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime, timezone
import uuid
from database import users_collection
from models.user import UserLogin, UserCreate, ChangePassword
from services.auth_service import (
    hash_password, verify_password, create_token,
    get_current_user, require_admin
)

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login")
async def login(credentials: UserLogin):
    user = await users_collection.find_one({"email": credentials.email})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(credentials.password, user['password']):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not user.get('is_active', True):
        raise HTTPException(status_code=403, detail="Account is disabled")

    token = create_token(user['_id'], user['role'])

    return {
        "token": token,
        "user": {
            "id": user['_id'],
            "email": user['email'],
            "name": user['name'],
            "role": user['role'],
            "school_id": user.get('school_id'),
            "first_login": user.get('first_login', True)
        }
    }


@router.post("/admin/login")
async def admin_login(credentials: UserLogin):
    user = await users_collection.find_one({
        "email": credentials.email,
        "role": "school_admin"
    })
    if not user:
        raise HTTPException(status_code=401, detail="Invalid admin credentials")

    if not verify_password(credentials.password, user['password']):
        raise HTTPException(status_code=401, detail="Invalid admin credentials")

    token = create_token(user['_id'], user['role'])

    return {
        "token": token,
        "user": {
            "id": user['_id'],
            "email": user['email'],
            "name": user['name'],
            "role": user['role'],
            "school_id": user.get('school_id'),
            "first_login": False
        }
    }


@router.get("/me")
async def get_me(user=Depends(get_current_user)):
    return {
        "id": user['_id'],
        "email": user['email'],
        "name": user['name'],
        "role": user['role'],
        "school_id": user.get('school_id'),
        "first_login": user.get('first_login', True)
    }


@router.post("/change-password")
async def change_password(data: ChangePassword, user=Depends(get_current_user)):
    if not verify_password(data.current_password, user['password']):
        raise HTTPException(status_code=400, detail="Current password is incorrect")

    new_hashed = hash_password(data.new_password)
    await users_collection.update_one(
        {"_id": user['_id']},
        {"$set": {"password": new_hashed, "first_login": False}}
    )

    return {"message": "Password changed successfully"}
