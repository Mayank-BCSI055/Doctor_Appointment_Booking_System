"""
Application route registration.

This module registers all API blueprints:
- Auth routes
- Admin routes
- Patient routes
"""

from app.routes.auth import auth_bp
from app.routes.admin import admin_bp
from app.routes.patient import patient_bp


def register_routes(app):
    """
    Register all application blueprints.
    """
    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")
    app.register_blueprint(patient_bp, url_prefix="/api/patient")


__all__ = [
    "register_routes",
]
