from fastapi import APIRouter, HTTPException, Depends
from database import students_collection, assessments_collection, reports_collection
from services.auth_service import require_student

router = APIRouter(prefix="/api/student", tags=["student"])


@router.get("/dashboard")
async def student_dashboard(user=Depends(require_student)):
    student = await students_collection.find_one({"user_id": user['_id']})
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")

    assessments = await assessments_collection.find({"student_id": student['_id']}).to_list(10)
    reports = await reports_collection.find({"student_id": student['_id']}).to_list(10)

    current = None
    completed_reports = []
    for a in assessments:
        if a['status'] in ['pending', 'in_progress']:
            current = {
                "id": a['_id'],
                "status": a['status'],
                "progress": a.get('progress', {}),
                "started_at": a.get('started_at'),
            }
        if a['status'] == 'completed':
            completed_reports.append({
                "id": a['_id'],
                "overall_score": a.get('overall_score'),
                "overall_level": a.get('overall_level'),
                "completed_at": a.get('completed_at'),
            })

    return {
        "student": {
            "id": student['_id'],
            "name": student['name'],
            "class_level": student['class_level'],
            "section": student.get('section', ''),
            "school_id": student.get('school_id', ''),
        },
        "current_assessment": current,
        "completed_count": len(completed_reports),
        "reports_count": len(reports),
        "reports": completed_reports,
    }


@router.get("/assessments")
async def list_assessments(user=Depends(require_student)):
    student = await students_collection.find_one({"user_id": user['_id']})
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")

    assessments = await assessments_collection.find({"student_id": student['_id']}).to_list(100)

    current = None
    completed = []
    for a in assessments:
        if a['status'] in ['pending', 'in_progress']:
            current = {
                "assessment_id": a['_id'],
                "status": a['status'],
                "progress": a.get('progress', {}),
                "started_at": a.get('started_at'),
            }
        if a['status'] == 'completed':
            completed.append({
                "assessment_id": a['_id'],
                "status": a['status'],
                "overall_score": a.get('overall_score'),
                "overall_level": a.get('overall_level'),
                "completed_at": a.get('completed_at'),
            })

    return {
        "current": current,
        "completed": completed,
    }


@router.get("/reports")
async def list_reports(user=Depends(require_student)):
    student = await students_collection.find_one({"user_id": user['_id']})
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")

    reports = await reports_collection.find({"student_id": student['_id']}).sort("generated_at", -1).to_list(100)
    return {"reports": reports}
