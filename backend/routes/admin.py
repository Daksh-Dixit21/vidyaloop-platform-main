from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from datetime import datetime, timezone
import uuid
from database import (
    users_collection, schools_collection, students_collection,
    assessments_collection, reports_collection, credentials_collection
)
from services.auth_service import require_admin
from services.csv_parser import parse_csv, validate_csv_rows, create_student_accounts

router = APIRouter(prefix="/api/admin", tags=["admin"])


@router.post("/upload-students")
async def upload_students(file: UploadFile = File(...), user=Depends(require_admin)):
    if not file.filename.endswith(('.csv', '.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="Only CSV and Excel files are accepted")

    content = await file.read()
    rows = parse_csv(content)

    if not rows:
        raise HTTPException(status_code=400, detail="CSV file is empty or has invalid format")

    valid_rows, errors = validate_csv_rows(rows)

    if not valid_rows:
        raise HTTPException(status_code=400, detail={"message": "No valid rows found", "errors": errors})

    school_id = user.get('school_id', f"sch_{uuid.uuid4().hex[:8]}")

    existing_school = await schools_collection.find_one({"_id": school_id})
    if not existing_school:
        await schools_collection.insert_one({
            "_id": school_id,
            "name": user.get('name', 'Unknown School'),
            "contact_email": user['email'],
            "status": "active",
            "created_at": datetime.now(timezone.utc).isoformat()
        })

    credentials = await create_student_accounts(valid_rows, school_id, user['_id'])

    return {
        "message": f"Successfully created {len(credentials)} student accounts",
        "total_processed": len(rows),
        "successful": len(credentials),
        "errors": errors,
        "school_id": school_id
    }


@router.post("/preview-csv")
async def preview_csv(file: UploadFile = File(...), user=Depends(require_admin)):
    content = await file.read()
    rows = parse_csv(content)

    if not rows:
        raise HTTPException(status_code=400, detail="CSV file is empty")

    valid_rows, errors = validate_csv_rows(rows)

    return {
        "total_rows": len(rows),
        "valid_rows": len(valid_rows),
        "errors": errors,
        "preview": valid_rows[:10]
    }


@router.get("/students")
async def list_students(
    page: int = 1,
    limit: int = 20,
    search: str = "",
    class_filter: int = None,
    user=Depends(require_admin)
):
    school_id = user.get('school_id')
    query = {"school_id": school_id} if school_id else {}

    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"email": {"$regex": search, "$options": "i"}}
        ]

    if class_filter:
        query["class_level"] = class_filter

    total = await students_collection.count_documents(query)
    skip = (page - 1) * limit
    students = await students_collection.find(query).skip(skip).limit(limit).to_list(limit)

    for s in students:
        s['_id'] = str(s['_id'])
        user_doc = await users_collection.find_one({"_id": s.get('user_id')})
        s['is_active'] = user_doc.get('is_active', True) if user_doc else False
        assessment_count = await assessments_collection.count_documents({"student_id": s['_id']})
        s['assessment_count'] = assessment_count

    return {
        "students": students,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": (total + limit - 1) // limit
    }


@router.get("/students/{student_id}")
async def get_student(student_id: str, user=Depends(require_admin)):
    student = await students_collection.find_one({"_id": student_id})
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    assessments = await assessments_collection.find({"student_id": student_id}).to_list(100)
    reports = await reports_collection.find({"student_id": student_id}).to_list(100)

    return {
        "student": student,
        "assessments": assessments,
        "reports": reports
    }


@router.get("/credentials")
async def list_credentials(user=Depends(require_admin)):
    school_id = user.get('school_id')
    query = {"school_id": school_id} if school_id else {}

    batches = await credentials_collection.find(query).sort("created_at", -1).to_list(50)

    return {"batches": batches}


@router.get("/dashboard")
async def school_dashboard(user=Depends(require_admin)):
    school_id = user.get('school_id')
    query = {"school_id": school_id} if school_id else {}

    total_students = await students_collection.count_documents(query)
    total_assessments = await assessments_collection.count_documents(
        {"school_id": school_id} if school_id else {}
    )
    completed_assessments = await assessments_collection.count_documents({
        **({"school_id": school_id} if school_id else {}),
        "status": "completed"
    })

    pipeline = [
        {"$match": {"status": "completed", **({"school_id": school_id} if school_id else {})}},
        {"$group": {"_id": None, "avg_score": {"$avg": "$overall_score"}}}
    ]
    avg_result = await assessments_collection.aggregate(pipeline).to_list(1)
    avg_score = avg_result[0]['avg_score'] if avg_result else 0

    class_pipeline = [
        {"$match": {"status": "completed", **({"school_id": school_id} if school_id else {})}},
        {"$group": {"_id": "$assessment_type", "count": {"$sum": 1}, "avg_score": {"$avg": "$overall_score"}}}
    ]
    by_type = await assessments_collection.aggregate(class_pipeline).to_list(10)

    return {
        "total_students": total_students,
        "total_assessments": total_assessments,
        "completed_assessments": completed_assessments,
        "pending_assessments": total_assessments - completed_assessments,
        "average_score": round(avg_score, 1) if avg_score else 0,
        "by_assessment_type": by_type
    }
