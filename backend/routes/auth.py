from fastapi import APIRouter, Depends, HTTPException

from database import users_collection
from models.user import ChangePassword, UserLogin
from services.auth_service import create_token, get_current_user, hash_password, verify_password

router = APIRouter(prefix="/api/auth", tags=["auth"])


def public_user(user: dict, first_login_override=None):
    return {
        "id": user['_id'],
        "email": user['email'],
        "name": user['name'],
        "role": user['role'],
        "school_id": user.get('school_id'),
        "student_id": user.get('student_id'),
        "first_login": user.get('first_login', True) if first_login_override is None else first_login_override,
    }


@router.post("/login")
async def login(credentials: UserLogin):
    user = await users_collection.find_one({"email": credentials.email})
    if not user or not verify_password(credentials.password, user['password']):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if not user.get('is_active', True):
        raise HTTPException(status_code=403, detail="Account is disabled")

    return {"token": create_token(user['_id'], user['role']), "user": public_user(user)}


@router.post("/admin/login")
async def admin_login(credentials: UserLogin):
    user = await users_collection.find_one({"email": credentials.email, "role": "school_admin"})
    if not user or not verify_password(credentials.password, user['password']):
        raise HTTPException(status_code=401, detail="Invalid admin credentials")
    if not user.get('is_active', True):
        raise HTTPException(status_code=403, detail="Account is disabled")

    return {"token": create_token(user['_id'], user['role']), "user": public_user(user, first_login_override=False)}


@router.get("/me")
async def get_me(user=Depends(get_current_user)):
    return public_user(user)


@router.post("/change-password")
async def change_password(data: ChangePassword, user=Depends(get_current_user)):
    if not verify_password(data.current_password, user['password']):
        raise HTTPException(status_code=400, detail="Current password is incorrect")

    await users_collection.update_one(
        {"_id": user['_id']},
        {"$set": {"password": hash_password(data.new_password), "first_login": False}},
    )
    return {"message": "Password changed successfully"}
