"""
Admin routes.

Includes:
- Doctor management
- Availability management
- Appointment management
"""

from flask import Blueprint

admin_bp = Blueprint("admin", __name__)

# Import routes to register them with the blueprint
from app.routes.admin.doctor_routes import add_doctor
from app.routes.admin.availability_routes import add_slot
from app.routes.admin.appointment_routes import (
    get_all_appointments,
    admin_cancel_appointment,
    admin_complete_appointment,
)

__all__ = [
    "admin_bp",
]
