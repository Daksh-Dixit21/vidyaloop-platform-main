import csv
import io
import secrets
import string
import uuid
from datetime import datetime, timezone
from typing import Dict, List, Tuple

from database import credentials_collection, students_collection, users_collection
from services.auth_service import hash_password


def parse_tabular_file(file_content: bytes, filename: str = "") -> List[Dict]:
    if filename.lower().endswith((".xlsx", ".xls")):
        from openpyxl import load_workbook

        workbook = load_workbook(io.BytesIO(file_content), read_only=True, data_only=True)
        sheet = workbook.active
        rows = list(sheet.iter_rows(values_only=True))
        if not rows:
            return []
        headers = [str(cell or "").strip() for cell in rows[0]]
        parsed = []
        for row in rows[1:]:
            parsed.append({
                headers[i]: "" if value is None else str(value).strip()
                for i, value in enumerate(row)
                if i < len(headers) and headers[i]
            })
        return parsed

    text = file_content.decode('utf-8-sig')
    reader = csv.DictReader(io.StringIO(text))
    return list(reader)


def parse_csv(file_content: bytes) -> List[Dict]:
    return parse_tabular_file(file_content, "upload.csv")


def validate_csv_rows(rows: List[Dict]) -> Tuple[List[Dict], List[str]]:
    valid = []
    errors = []

    required_columns = {'name', 'class'}
    if rows:
        actual_cols = set(k.strip().lower().replace(' ', '_') for k in rows[0].keys())
        missing = required_columns - actual_cols
        if missing:
            errors.append(f"Missing required columns: {', '.join(missing)}")
            return valid, errors

    for i, row in enumerate(rows):
        normalized = {k.strip().lower().replace(' ', '_'): str(v or '').strip() for k, v in row.items()}
        name = normalized.get('name', '').strip()
        class_level = normalized.get('class', '').strip()

        if not name:
            errors.append(f"Row {i+2}: Name is empty")
            continue

        try:
            class_num = int(float(class_level))
            if class_num < 1 or class_num > 12:
                errors.append(f"Row {i+2}: Class must be between 1-12 (got {class_num})")
                continue
        except (ValueError, TypeError):
            errors.append(f"Row {i+2}: Invalid class value '{class_level}'")
            continue

        valid.append({
            'name': name,
            'class_level': class_num,
            'section': normalized.get('section', ''),
            'roll_number': normalized.get('roll_number', normalized.get('roll_no', '')),
            'email': normalized.get('email', ''),
            'gender': normalized.get('gender', ''),
        })

    return valid, errors


def generate_password(name: str, class_level: int) -> str:
    alphabet = string.ascii_letters + string.digits
    token = ''.join(secrets.choice(alphabet) for _ in range(8))
    return f"VL-{class_level}-{token}"


def generate_email(name: str, school_id: str, index: int) -> str:
    clean_name = name.lower().replace(' ', '.').replace('.', '')
    clean_name = ''.join(c for c in clean_name if c.isalnum()) or 'student'
    return f"{clean_name}_{index}@vidyaloop.local"


async def create_student_accounts(valid_rows: List[Dict], school_id: str, admin_id: str) -> Dict:
    credentials = []
    school_prefix = school_id[:8]
    now = datetime.now(timezone.utc).isoformat()

    for i, row in enumerate(valid_rows):
        email = row.get('email') or generate_email(row['name'], school_prefix, i + 1)
        password = generate_password(row['name'], row['class_level'])
        user_id = f"usr_{uuid.uuid4().hex[:12]}"
        student_id = f"stu_{uuid.uuid4().hex[:12]}"

        existing = await users_collection.find_one({"email": email})
        if existing:
            local = email.split('@')[0]
            email = f"{local}_{uuid.uuid4().hex[:5]}@vidyaloop.local"

        user_doc = {
            "_id": user_id,
            "email": email,
            "password": hash_password(password),
            "name": row['name'],
            "role": "student",
            "school_id": school_id,
            "student_id": student_id,
            "first_login": True,
            "is_active": True,
            "created_at": now,
        }
        await users_collection.insert_one(user_doc)

        student_doc = {
            "_id": student_id,
            "user_id": user_id,
            "school_id": school_id,
            "name": row['name'],
            "class_level": row['class_level'],
            "section": row.get('section', ''),
            "roll_number": row.get('roll_number', ''),
            "gender": row.get('gender', ''),
            "email": email,
            "assigned_by": admin_id,
            "created_at": now,
        }
        await students_collection.insert_one(student_doc)

        credentials.append({
            "name": row['name'],
            "email": email,
            "password": password,
            "class_level": row['class_level'],
            "section": row.get('section', ''),
            "student_id": student_id,
            "user_id": user_id,
        })

    batch_id = f"batch_{uuid.uuid4().hex[:8]}"
    await credentials_collection.insert_one({
        "_id": batch_id,
        "school_id": school_id,
        "created_by": admin_id,
        "credentials": credentials,
        "created_at": now,
    })

    return {"batch_id": batch_id, "credentials": credentials}
