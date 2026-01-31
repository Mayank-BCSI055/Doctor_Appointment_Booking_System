from app.extensions import db
from app.models.appointment_model import Appointment, AppointmentStatus
from app.models.availability_model import AvailabilitySlot

from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError


def get_appointment_by_id(appointment_id):
    return db.session.get(Appointment, appointment_id)


def get_user_appointments(user_id):
    return (
        db.session.execute(
            select(Appointment)
            .where(Appointment.user_id == user_id)
            .order_by(Appointment.booked_at.desc())
        )
        .scalars()
        .all()
    )


def get_doctor_appointments(doctor_id):
    return (
        db.session.execute(
            select(Appointment)
            .where(Appointment.doctor_id == doctor_id)
            .order_by(Appointment.booked_at.desc())
        )
        .scalars()
        .all()
    )


def cancel_appointment(appointment_id):
    """
    Cancels an appointment and releases the slot.
    This is transaction-safe and PostgreSQL-correct.
    """
    try:
        appointment = db.session.get(Appointment, appointment_id)

        if not appointment:
            raise ValueError("Appointment not found")

        # Release the slot
        slot = db.session.get(AvailabilitySlot, appointment.slot_id)
        if slot:
            slot.is_booked = False

        appointment.status = AppointmentStatus.CANCELLED

        db.session.commit()
        return appointment

    except SQLAlchemyError as e:
        db.session.rollback()
        raise e


def complete_appointment(appointment_id):
    """
    Marks an appointment as completed.
    """
    try:
        appointment = db.session.get(Appointment, appointment_id)

        if not appointment:
            raise ValueError("Appointment not found")

        appointment.status = AppointmentStatus.COMPLETED

        db.session.commit()
        return appointment

    except SQLAlchemyError as e:
        db.session.rollback()
        raise e

