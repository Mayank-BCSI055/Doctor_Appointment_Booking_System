from app.database import db

# Import all models so SQLAlchemy and Alembic can see them
from app.models.user_model import User
from app.models.doctor_model import Doctor
from app.models.availability_model import AvailabilitySlot
from app.models.appointment_model import Appointment

__all__ = [
    "db",
    "User",
    "Doctor",
    "AvailabilitySlot",
    "Appointment",
]
