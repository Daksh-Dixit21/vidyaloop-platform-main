from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime, timezone
import uuid
from database import (
    assessments_collection, question_banks_collection,
    students_collection, schools_collection
)
from services.auth_service import require_student
from services.scoring_engine import calculate_all_scores, get_level, get_interpretation
from services.question_seed import SECTIONS
from services.report_generator import generate_report

router = APIRouter(prefix="/api/assessments", tags=["assessments"])


@router.get("/types")
async def get_assessment_types():
    return {
        "types": {
            "comprehensive": {
                "name": "VidyaLoop Comprehensive Assessment",
                "description": "Complete Student Success Blueprint covering 22 dimensions across 4 sections.",
                "sections": SECTIONS,
                "total_dimensions": 22,
                "total_questions": 132,
            }
        }
    }


@router.get("/sections")
async def get_sections():
    return {"sections": SECTIONS}


@router.get("/questions/{section_key}")
async def get_section_questions(section_key: str, user=Depends(require_student)):
    if section_key not in SECTIONS:
        raise HTTPException(status_code=400, detail="Invalid section key")

    questions = await question_banks_collection.find(
        {"section": section_key}
    ).to_list(200)

    if not questions:
        raise HTTPException(status_code=404, detail="No questions found for this section")

    clean_questions = []
    for q in questions:
        clean_questions.append({
            "id": q['_id'],
            "dimension": q['dimension'],
            "text": q['text'],
            "question_type": q.get('question_type', 'likert_5'),
            "options": q.get('options', []),
            "reverse_scored": q.get('reverse_scored', False),
            "correct_answer": q.get('correct_answer'),
        })

    return {
        "section": section_key,
        "info": SECTIONS[section_key],
        "questions": clean_questions,
        "total_questions": len(clean_questions),
    }


@router.get("/questions")
async def get_all_questions(user=Depends(require_student)):
    all_qs = []
    for sec_key in SECTIONS:
        qs = await question_banks_collection.find({"section": sec_key}).to_list(200)
        for q in qs:
            all_qs.append({
                "id": q['_id'],
                "section": q.get('section', sec_key),
                "dimension": q['dimension'],
                "text": q['text'],
                "question_type": q.get('question_type', 'likert_5'),
                "options": q.get('options', []),
                "reverse_scored": q.get('reverse_scored', False),
                "correct_answer": q.get('correct_answer'),
            })
    return {
        "sections": SECTIONS,
        "questions": all_qs,
        "total_questions": len(all_qs),
    }


@router.post("/start")
async def start_assessment(user=Depends(require_student)):
    student = await students_collection.find_one({"user_id": user['_id']})
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")

    existing = await assessments_collection.find_one({
        "student_id": student['_id'],
        "status": {"$in": ["pending", "in_progress"]}
    })
    if existing:
        return {
            "assessment_id": existing['_id'],
            "status": existing['status'],
            "started_at": existing.get('started_at'),
            "progress": existing.get('progress', {}),
        }

    assessment_id = f"assess_{uuid.uuid4().hex[:12]}"
    now = datetime.now(timezone.utc).isoformat()

    assessment_doc = {
        "_id": assessment_id,
        "student_id": student['_id'],
        "school_id": student.get('school_id', ''),
        "assessment_type": "comprehensive",
        "status": "in_progress",
        "answers": {},
        "progress": {sec: False for sec in SECTIONS},
        "section_scores": {},
        "started_at": now,
        "completed_at": None,
        "time_spent_seconds": None,
        "scores": None,
        "overall_score": None,
        "overall_level": None,
    }
    await assessments_collection.insert_one(assessment_doc)

    return {
        "assessment_id": assessment_id,
        "status": "in_progress",
        "started_at": now,
        "progress": assessment_doc["progress"],
    }


@router.post("/{assessment_id}/save-section")
async def save_section(assessment_id: str, body: dict, user=Depends(require_student)):
    assessment = await assessments_collection.find_one({"_id": assessment_id})
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    if assessment['status'] == 'completed':
        raise HTTPException(status_code=400, detail="Assessment already completed")

    section_key = body.get('section')
    section_answers = body.get('answers', {})

    if not section_key or section_key not in SECTIONS:
        raise HTTPException(status_code=400, detail="Invalid section")

    all_answers = assessment.get('answers', {})
    all_answers.update(section_answers)

    progress = assessment.get('progress', {})
    section_complete = len(section_answers) >= 6
    progress[section_key] = section_complete

    questions = await question_banks_collection.find({"section": section_key}).to_list(200)
    section_scores = calculate_all_scores(section_answers, questions)

    section_scores_map = assessment.get('section_scores', {})
    section_scores_map[section_key] = {
        "dimensions": section_scores.get("dimensions", {}),
        "themes": section_scores.get("themes", {}),
        "theme_rankings": section_scores.get("theme_rankings", []),
        "top_strengths": section_scores.get("top_strengths", []),
        "growth_areas": section_scores.get("growth_areas", []),
    }

    all_done = all(progress.values())

    await assessments_collection.update_one(
        {"_id": assessment_id},
        {"$set": {
            "answers": all_answers,
            "progress": progress,
            "section_scores": section_scores_map,
            "status": "in_progress" if not all_done else "completed",
        }}
    )

    return {
        "message": f"Section '{section_key}' saved",
        "progress": progress,
        "section_scores": section_scores_map.get(section_key, {}),
        "all_complete": all_done,
    }


@router.post("/{assessment_id}/submit")
async def submit_assessment(assessment_id: str, user=Depends(require_student)):
    assessment = await assessments_collection.find_one({"_id": assessment_id})
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    if assessment['status'] == 'completed':
        raise HTTPException(status_code=400, detail="Assessment already completed")

    answers = assessment.get('answers', {})
    all_questions = await question_banks_collection.find({}).to_list(500)

    scores = calculate_all_scores(answers, all_questions)

    now = datetime.now(timezone.utc)
    started = datetime.fromisoformat(assessment['started_at'])
    time_spent = int((now - started).total_seconds())

    all_norms = [v.get("normalized", 0) for v in scores.get("dimensions", {}).values()]
    overall_avg = round(sum(all_norms) / len(all_norms), 1) if all_norms else 0

    await assessments_collection.update_one(
        {"_id": assessment_id},
        {"$set": {
            "status": "completed",
            "completed_at": now.isoformat(),
            "time_spent_seconds": time_spent,
            "scores": scores,
            "overall_score": overall_avg,
            "overall_level": get_level(overall_avg),
        }}
    )

    student = await students_collection.find_one({"_id": assessment['student_id']})
    school = await schools_collection.find_one({"_id": assessment.get('school_id', '')}) if assessment.get('school_id') else None

    report = await generate_report(
        assessment_id=assessment_id,
        student_id=assessment['student_id'],
        school_id=assessment.get('school_id', ''),
        student_name=student['name'] if student else "Student",
        class_level=student.get('class_level', 0) if student else 0,
        school_name=school['name'] if school else "Unknown School",
        scores=scores,
    )

    return {
        "message": "Assessment completed successfully",
        "scores": scores,
        "overall_score": overall_avg,
        "time_spent_seconds": time_spent,
        "report_id": report.get('_id'),
        "report_status": report.get('status'),
    }


@router.get("/{assessment_id}/result")
async def get_result(assessment_id: str, user=Depends(require_student)):
    assessment = await assessments_collection.find_one({"_id": assessment_id})
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    if assessment['status'] != 'completed':
        raise HTTPException(status_code=400, detail="Assessment not yet completed")

    return {
        "assessment_id": assessment['_id'],
        "status": assessment['status'],
        "scores": assessment.get('scores'),
        "overall_score": assessment.get('overall_score'),
        "overall_level": assessment.get('overall_level'),
        "time_spent_seconds": assessment.get('time_spent_seconds'),
        "completed_at": assessment.get('completed_at'),
    }
