from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import Optional
from datetime import datetime
from enum import Enum


class UserRole(str, Enum):
    SCHOOL_ADMIN = "school_admin"
    STUDENT = "student"


class UserBase(BaseModel):
    model_config = ConfigDict(extra="ignore")
    email: str
    name: str
    role: UserRole


class UserCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    email: str
    password: str
    name: str
    role: UserRole = UserRole.STUDENT


class UserLogin(BaseModel):
    model_config = ConfigDict(extra="ignore")
    email: str
    password: str


class UserResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(alias="_id")
    email: str
    name: str
    role: UserRole
    school_id: Optional[str] = None
    first_login: bool = True
    created_at: str


class ChangePassword(BaseModel):
    model_config = ConfigDict(extra="ignore")
    current_password: str
    new_password: str
