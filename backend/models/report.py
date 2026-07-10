from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, Dict, Any
from datetime import datetime


class ReportBase(BaseModel):
    model_config = ConfigDict(extra="ignore")
    assessment_id: str
    student_id: str
    school_id: str
    report_type: str


class ReportResponse(BaseModel):
    id: str = Field(alias="_id")
    assessment_id: str
    student_id: str
    school_id: str
    report_type: str
    pdf_path: Optional[str] = None
    page_count: int = 0
    file_size: int = 0
    generated_at: str
    status: str = "generating"
