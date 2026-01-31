from datetime import date, time
from typing import Any, Iterable


class ValidationError(ValueError):
    """
    Raised when validation fails.
    """
    pass


def require_fields(data: dict, fields: Iterable[str]) -> None:
    """
    Ensure required fields exist and are not empty.
    """
    missing = [f for f in fields if f not in data or data[f] in (None, "", [])]
    if missing:
        raise ValidationError(f"Missing required fields: {', '.join(missing)}")


def validate_email(email: str) -> None:
    """
    Basic email format validation.
    """
    if not email or "@" not in email or "." not in email:
        raise ValidationError("Invalid email address")


def validate_password(password: str) -> None:
    """
    Enforce minimum password rules.
    """
    if not password or len(password) < 8:
        raise ValidationError("Password must be at least 8 characters long")


def validate_positive_int(value: Any, field_name: str) -> None:
    """
    Ensure value is a positive integer.
    """
    if not isinstance(value, int) or value <= 0:
        raise ValidationError(f"{field_name} must be a positive integer")


def validate_boolean(value: Any, field_name: str) -> None:
    """
    Ensure value is boolean.
    """
    if not isinstance(value, bool):
        raise ValidationError(f"{field_name} must be a boolean")


def validate_date(value: Any, field_name: str = "date") -> None:
    """
    Ensure value is a datetime.date instance.
    """
    if not isinstance(value, date):
        raise ValidationError(f"{field_name} must be a valid date")


def validate_time(value: Any, field_name: str = "time") -> None:
    """
    Ensure value is a datetime.time instance.
    """
    if not isinstance(value, time):
        raise ValidationError(f"{field_name} must be a valid time")


def validate_time_range(start: time, end: time) -> None:
    """
    Ensure end time is after start time.
    """
    if start >= end:
        raise ValidationError("end_time must be after start_time")


def validate_enum(value: Any, enum_cls, field_name: str) -> None:
    """
    Ensure value is a valid enum member.
    """
    try:
        enum_cls(value)
    except Exception:
        valid = [e.value for e in enum_cls]
        raise ValidationError(
            f"{field_name} must be one of: {', '.join(valid)}"
        )
