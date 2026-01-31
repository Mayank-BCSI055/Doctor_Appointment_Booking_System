from datetime import datetime
from app.extensions import db


class Doctor(db.Model):
    __tablename__ = "doctors"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(
        db.String(120),
        nullable=False,
        index=True,
    )

    specialization = db.Column(
        db.String(120),
        nullable=False,
        index=True,
    )

    experience = db.Column(
        db.Integer,
        nullable=False,
    )

    consultation_duration = db.Column(
        db.Integer,
        nullable=False,
        doc="Duration in minutes",
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
