import io
import os
import uuid
import tempfile

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import HTMLResponse, StreamingResponse

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


def _generate_pdf_bytes(html: str) -> bytes:
    try:
        from weasyprint import HTML
        return HTML(string=html).write_pdf()
    except Exception:
        pass
    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
        from reportlab.lib.styles import getSampleStyleSheet
        buf = io.BytesIO()
        doc = SimpleDocTemplate(buf, pagesize=A4)
        styles = getSampleStyleSheet()
        story = [Paragraph("VidyaLoop Report", styles["Title"]), Spacer(1, 12)]
        for line in html.split('\n'):
            line = line.strip()
            if line and not line.startswith('<'):
                story.append(Paragraph(line, styles["Normal"]))
        doc.build(story)
        return buf.getvalue()
    except Exception:
        pass
    return html.encode('utf-8')


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

    html = report.get('html_content')
    if not html:
        raise HTTPException(status_code=404, detail="Report content not found")

    pdf_bytes = _generate_pdf_bytes(html)
    student_name = report.get('scores', {}).get('student_name', 'student')
    return StreamingResponse(
        iter([pdf_bytes]),
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="VidyaLoop_Report_{student_name.replace(" ", "_")}.pdf"'},
    )


@router.get("/{report_id}/view")
async def view_report(report_id: str, user=Depends(get_current_user)):
    report = await reports_collection.find_one({"_id": report_id})
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    await ensure_report_access(report, user)

    html = report.get('html_content')
    if not html:
        raise HTTPException(status_code=404, detail="Report content not found")

    return HTMLResponse(content=html)
