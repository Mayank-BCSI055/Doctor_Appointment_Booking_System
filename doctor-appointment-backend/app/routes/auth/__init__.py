"""
Authentication routes.

Includes:
- User registration
- User login
"""

from flask import Blueprint

auth_bp = Blueprint("auth", __name__)

# Import routes to register them with the blueprint
from app.routes.auth.login_routes import login
from app.routes.auth.register_routes import register_patient

__all__ = [
    "auth_bp",
]
