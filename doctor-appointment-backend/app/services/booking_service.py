from app.extensions import db
from app.models.availability_model import AvailabilitySlot
from app.models.appointment_model import Appointment
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import select


def book_slot(user_id, slot_id):
    try:
        # 🔒 Lock the slot row (PostgreSQL-safe)
        slot = (
            db.session.execute(
                select(AvailabilitySlot)
                .where(AvailabilitySlot.id == slot_id)
                .with_for_update()
            )
            .scalars()
            .first()
        )

        if not slot or slot.is_booked:
            raise ValueError("Slot unavailable")

        # Mark slot as booked
        slot.is_booked = True

        appointment = Appointment(
            user_id=user_id,                                                            # type: ignore
            doctor_id=slot.doctor_id,                                                   # type: ignore
            slot_id=slot.id,                                                            # type: ignore
        )

        db.session.add(appointment)
        db.session.commit()

        return appointment

    except SQLAlchemyError as e:
        db.session.rollback()
        raise e
