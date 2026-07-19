import os

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse, HTMLResponse

from database import reports_collection, students_collection
from services.auth_service import get_current_user

router = APIRouter(prefix="/api/reports", tags=["reports"])


async def ensure_report_access(report: dict, user: dict):
    if user.get('role') == 'student':
        student = await students_collection.find_one({"user_id": user['_id']})
        if not student or report.get('student_id') != student.get('_id'):
            raise HTTPException(status_code=403, detail="Access denied")
    elif user.get('role') == 'school_admin' and user.get('school_id'):
        if report.get('school_id') != user.get('school_id'):
            raise HTTPException(status_code=403, detail="Access denied")


@router.get("/{report_id}")
async def get_report(report_id: str, user=Depends(get_current_user)):
    report = await reports_collection.find_one({"_id": report_id})
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    await ensure_report_access(report, user)

    return {
        "id": report['_id'],
        "assessment_id": report.get('assessment_id'),
        "student_id": report.get('student_id'),
        "report_type": report.get('report_type'),
        "page_count": report.get('page_count', 0),
        "file_size": report.get('file_size', 0),
        "generated_at": report.get('generated_at'),
        "status": report.get('status', 'ready'),
    }


@router.get("/{report_id}/download")
async def download_report(report_id: str, user=Depends(get_current_user)):
    report = await reports_collection.find_one({"_id": report_id})
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    await ensure_report_access(report, user)

    pdf_path = report.get('pdf_path')
    if not pdf_path or not os.path.exists(pdf_path):
        raise HTTPException(status_code=404, detail="Report file not found")

    filename = os.path.basename(pdf_path)
    media_type = "application/pdf" if filename.endswith('.pdf') else "text/html"
    return FileResponse(path=pdf_path, filename=filename, media_type=media_type)


@router.get("/{report_id}/view")
async def view_report(report_id: str, user=Depends(get_current_user)):
    report = await reports_collection.find_one({"_id": report_id})
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    await ensure_report_access(report, user)

    pdf_path = report.get('pdf_path')
    if not pdf_path or not os.path.exists(pdf_path):
        raise HTTPException(status_code=404, detail="Report file not found")

    if pdf_path.endswith('.html'):
        with open(pdf_path, 'r', encoding='utf-8') as f:
            return HTMLResponse(content=f.read())
    return FileResponse(path=pdf_path, media_type="application/pdf")
