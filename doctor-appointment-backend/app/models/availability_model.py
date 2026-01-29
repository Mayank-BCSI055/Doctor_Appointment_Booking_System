from app.database import db

class AvailabilitySlot(db.Model):
    __tablename__ = "availability_slots"

    id = db.Column(db.Integer, primary_key=True)
    doctor_id = db.Column(db.Integer, db.ForeignKey("doctors.id"), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    start_time = db.Column(db.String(10), nullable=False)
    end_time = db.Column(db.String(10), nullable=False)

    is_booked = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)

    __table_args__ = (
        db.UniqueConstraint("doctor_id", "date", "start_time", "end_time", name="unique_doctor_slot"),
    )
