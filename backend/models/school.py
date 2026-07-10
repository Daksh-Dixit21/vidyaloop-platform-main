from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime


class SchoolBase(BaseModel):
    model_config = ConfigDict(extra="ignore")
    name: str
    contact_email: str
    contact_phone: Optional[str] = None
    address: Optional[str] = None


class SchoolCreate(SchoolBase):
    pass


class SchoolResponse(SchoolBase):
    id: str = Field(alias="_id")
    status: str = "active"
    created_at: str
    total_students: int = 0
