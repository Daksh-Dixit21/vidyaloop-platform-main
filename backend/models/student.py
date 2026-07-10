from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime


class StudentBase(BaseModel):
    model_config = ConfigDict(extra="ignore")
    name: str
    class_level: int = Field(ge=1, le=12)
    section: Optional[str] = None
    roll_number: Optional[str] = None
    gender: Optional[str] = None


class StudentCreate(StudentBase):
    email: str


class StudentResponse(StudentBase):
    id: str = Field(alias="_id")
    user_id: str
    school_id: str
    email: str
    assigned_by: Optional[str] = None
    created_at: str
    assessment_count: int = 0
