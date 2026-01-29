from app.database import db

class Doctor(db.Model):
    __tablename__ = "doctors"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    specialization = db.Column(db.String(120), nullable=False)
    experience = db.Column(db.Integer, nullable=False)
    consultation_duration = db.Column(db.Integer, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
