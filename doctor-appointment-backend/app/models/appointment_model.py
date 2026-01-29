from datetime import datetime
from app.database import db

class Appointment(db.Model):
    __tablename__ = "appointments"

    __table_args__ = (
        db.UniqueConstraint("slot_id", name="unique_slot_booking"),
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey("doctors.id"), nullable=False)
    slot_id = db.Column(db.Integer, db.ForeignKey("availability_slots.id"), nullable=False)
    status = db.Column(db.String(20), nullable=False, default="booked")
    booked_at = db.Column(db.DateTime, server_default=db.func.now())
