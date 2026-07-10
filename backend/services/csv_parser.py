import csv
import io
import uuid
from typing import List, Dict, Tuple
from database import users_collection, students_collection, credentials_collection
from services.auth_service import hash_password


def parse_csv(file_content: bytes) -> List[Dict]:
    text = file_content.decode('utf-8-sig')
    reader = csv.DictReader(io.StringIO(text))
    rows = list(reader)
    return rows


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
        normalized = {k.strip().lower().replace(' ', '_'): v.strip() for k, v in row.items()}
        name = normalized.get('name', '').strip()
        class_level = normalized.get('class', '').strip()

        if not name:
            errors.append(f"Row {i+2}: Name is empty")
            continue

        try:
            class_num = int(class_level)
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
    clean_name = name.split()[0] if name else "Student"
    return f"VL@2026#{clean_name}{class_level}"


def generate_email(name: str, school_id: str, index: int) -> str:
    clean_name = name.lower().replace(' ', '.').replace('.', '')
    clean_name = ''.join(c for c in clean_name if c.isalnum())
    return f"{clean_name}_{index}@vidyaloop.local"


async def create_student_accounts(
    valid_rows: List[Dict],
    school_id: str,
    admin_id: str
) -> List[Dict]:
    credentials = []
    school_prefix = school_id[:8]

    for i, row in enumerate(valid_rows):
        email = row.get('email') or generate_email(row['name'], school_prefix, i + 1)
        password = generate_password(row['name'], row['class_level'])
        user_id = f"usr_{uuid.uuid4().hex[:12]}"
        student_id = f"stu_{uuid.uuid4().hex[:12]}"

        existing = await users_collection.find_one({"email": email})
        if existing:
            email = f"{email.split('@')[0]}_{i}@vidyaloop.local"

        user_doc = {
            "_id": user_id,
            "email": email,
            "password": hash_password(password),
            "name": row['name'],
            "role": "student",
            "school_id": school_id,
            "first_login": True,
            "is_active": True,
            "created_at": __import__('datetime').datetime.now(__import__('datetime').timezone.utc).isoformat()
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
            "created_at": __import__('datetime').datetime.now(__import__('datetime').timezone.utc).isoformat()
        }
        await students_collection.insert_one(student_doc)

        credentials.append({
            "name": row['name'],
            "email": email,
            "password": password,
            "class_level": row['class_level'],
            "section": row.get('section', ''),
            "student_id": student_id,
            "user_id": user_id
        })

    batch_id = f"batch_{uuid.uuid4().hex[:8]}"
    await credentials_collection.insert_one({
        "_id": batch_id,
        "school_id": school_id,
        "created_by": admin_id,
        "credentials": credentials,
        "created_at": __import__('datetime').datetime.now(__import__('datetime').timezone.utc).isoformat()
    })

    return credentials
