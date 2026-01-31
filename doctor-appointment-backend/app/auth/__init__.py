"""
Authentication and authorization utilities.

This package provides:
- JWT setup and token generation
- Role-based access decorators
- Password hashing helpers
"""

from app.auth.jwt_utils import jwt, generate_token
from app.auth.decorators import admin_required, patient_required
from app.auth.password_utils import hash_password, verify_password

__all__ = [
    "jwt",
    "generate_token",
    "admin_required",
    "patient_required",
    "hash_password",
    "verify_password",
]

