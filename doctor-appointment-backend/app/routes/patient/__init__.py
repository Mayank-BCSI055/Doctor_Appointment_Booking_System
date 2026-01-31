"""
Patient routes.

Includes:
- Browsing doctors and availability
- Booking appointments
- Viewing and updating patient profile
"""

from flask import Blueprint

patient_bp = Blueprint("patient", __name__)

# Import routes to register them with the blueprint
from app.routes.patient.booking_routes import (
    book_appointment,
    my_appointments,
    cancel_my_appointment,
)
from app.routes.patient.browse_routes import (
    list_doctors,
    list_slots,
)
from app.routes.patient.profile_routes import (
    get_profile,
    update_profile,
)

__all__ = [
    "patient_bp",
]
