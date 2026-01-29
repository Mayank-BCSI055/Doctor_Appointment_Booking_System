from app.database import db
from app.models.availability_model import AvailabilitySlot

def create_slot(data):
    slot = AvailabilitySlot(**data)
    db.session.add(slot)
    return slot
