from app.extensions import db
from app.models.availability_model import AvailabilitySlot
from sqlalchemy.exc import SQLAlchemyError


def create_slot(data):
    try:
        slot = AvailabilitySlot(**data)
        db.session.add(slot)
        db.session.commit()
        return slot

    except SQLAlchemyError as e:
        db.session.rollback()
        raise e
