from app.extensions import db
from app.models.doctor_model import Doctor
from sqlalchemy.exc import SQLAlchemyError


def create_doctor(data):
    try:
        doctor = Doctor(**data)
        db.session.add(doctor)
        db.session.commit()
        return doctor

    except SQLAlchemyError as e:
        db.session.rollback()
        raise e
