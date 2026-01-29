from app.database import db
from app.models.doctor_model import Doctor

def create_doctor(data):
    doctor = Doctor(**data)
    db.session.add(doctor)
    return doctor
