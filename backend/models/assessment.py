from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, Dict, Any, List
from datetime import datetime
from enum import Enum


class AssessmentType(str, Enum):
    COMPREHENSIVE = "comprehensive"


class AssessmentStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"


class AssessmentBase(BaseModel):
    model_config = ConfigDict(extra="ignore")
    student_id: str


class AssessmentCreate(AssessmentBase):
    pass


class AssessmentSubmit(BaseModel):
    model_config = ConfigDict(extra="ignore")
    answers: Dict[str, Any]


class SectionSubmit(BaseModel):
    model_config = ConfigDict(extra="ignore")
    section: str
    answers: Dict[str, Any]


class AssessmentResponse(BaseModel):
    id: str = Field(alias="_id")
    student_id: str
    assessment_type: str
    status: AssessmentStatus
    started_at: Optional[str] = None
    completed_at: Optional[str] = None
    time_spent_seconds: Optional[int] = None
    scores: Optional[Dict[str, Any]] = None
    overall_score: Optional[float] = None
    overall_level: Optional[str] = None


class QuestionOption(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    text: str
    value: int


class Question(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    dimension: str
    text: str
    question_type: str = "likert_5"
    options: List[QuestionOption] = []
    reverse_scored: bool = False
    weight: float = 1.0


class DimensionScore(BaseModel):
    raw_score: float = 0
    max_score: float = 0
    normalized: float = 0
    level: str = ""
    interpretation: str = ""
