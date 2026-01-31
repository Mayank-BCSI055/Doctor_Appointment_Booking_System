import enum
from datetime import datetime
from app.extensions import db


class AppointmentStatus(enum.Enum):
    BOOKED = "BOOKED"
    CANCELLED = "CANCELLED"
    COMPLETED = "COMPLETED"


class Appointment(db.Model):
    __tablename__ = "appointments"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    doctor_id = db.Column(
        db.Integer,
        db.ForeignKey("doctors.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    slot_id = db.Column(
        db.Integer,
        db.ForeignKey("availability_slots.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )

    status = db.Column(
        db.Enum(AppointmentStatus, name="appointment_status"),
        nullable=False,
        default=AppointmentStatus.BOOKED,
        index=True,
    )

    booked_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=datetime.utcnow,
    )

    __table_args__ = (
        db.UniqueConstraint("slot_id", name="unique_slot_booking"),
    )
