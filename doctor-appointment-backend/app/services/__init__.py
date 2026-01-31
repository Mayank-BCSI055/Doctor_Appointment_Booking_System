"""
Service layer package.

Each service encapsulates business logic and database interactions.
Importing services here makes them easy to access and keeps
the application structure clean and explicit.
"""

from app.services.doctor_service import create_doctor
from app.services.availability_service import create_slot
from app.services.booking_service import book_slot
from app.services.appointment_service import (
    get_appointment_by_id,
    get_user_appointments,
    get_doctor_appointments,
    cancel_appointment,
    complete_appointment,
)
from app.services.user_service import update_user_profile
from app.services.browse_service import (
    list_active_doctors,
    list_available_slots,
)

__all__ = [
    "create_doctor",
    "create_slot",
    "book_slot",
    "get_appointment_by_id",
    "get_user_appointments",
    "get_doctor_appointments",
    "cancel_appointment",
    "complete_appointment",
    "update_user_profile",
    "list_active_doctors",
    "list_available_slots",
]
