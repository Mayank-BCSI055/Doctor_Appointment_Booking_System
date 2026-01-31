from datetime import datetime, date, time
from app.extensions import db


class AvailabilitySlot(db.Model):
    __tablename__ = "availability_slots"

    id = db.Column(db.Integer, primary_key=True)

    doctor_id = db.Column(
        db.Integer,
        db.ForeignKey("doctors.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    slot_date = db.Column(
        db.Date,
        nullable=False,
        index=True,
    )

    start_time = db.Column(
        db.Time,
        nullable=False,
    )

    end_time = db.Column(
        db.Time,
        nullable=False,
    )

    is_booked = db.Column(
        db.Boolean,
        nullable=False,
        default=False,
    )

    is_active = db.Column(
        db.Boolean,
        nullable=False,
        default=True,
    )

    created_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=datetime.utcnow,
    )

    __table_args__ = (
        db.UniqueConstraint(
            "doctor_id",
            "slot_date",
            "start_time",
            "end_time",
            name="unique_doctor_slot",
        ),
    )
