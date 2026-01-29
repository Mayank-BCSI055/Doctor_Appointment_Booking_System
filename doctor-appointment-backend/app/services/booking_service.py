from app.database import db

from app.models.availability_model import AvailabilitySlot
from app.models.appointment_model import Appointment
from app.database.transactions import atomic

@atomic
def book_slot(user_id, slot_id):
    slot = AvailabilitySlot.query.with_for_update().get(slot_id)

    if not slot or slot.is_booked:
        raise ValueError("Slot unavailable")

    slot.is_booked = True
    appointment = Appointment(
        user_id=user_id,
        doctor_id=slot.doctor_id,
        slot_id=slot.id
    )

    db.session.add(appointment)
    return appointment
