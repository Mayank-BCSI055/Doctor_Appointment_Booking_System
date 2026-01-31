from sqlalchemy import select

from app.extensions import db
from app.models.doctor_model import Doctor
from app.models.availability_model import AvailabilitySlot
from app.models.appointment_model import Appointment, AppointmentStatus


def list_active_doctors():
    """
    Return all active doctors.
    """
    return (
        db.session.execute(
            select(Doctor).where(Doctor.is_active.is_(True))
        )
        .scalars()
        .all()
    )


def list_available_slots(doctor_id: int):
    """
    Return all available (not booked) slots for a doctor.
    """

    # Subquery: booked slot IDs
    booked_slots_subquery = (
        select(Appointment.slot_id)
        .where(Appointment.status == AppointmentStatus.BOOKED)
    )

    # Main query: active, unbooked slots
    return (
        db.session.execute(
            select(AvailabilitySlot)
            .where(
                AvailabilitySlot.doctor_id == doctor_id,
                AvailabilitySlot.is_active.is_(True),
                AvailabilitySlot.id.not_in(booked_slots_subquery),
            )
            .order_by(
                AvailabilitySlot.slot_date,
                AvailabilitySlot.start_time,
            )
        )
        .scalars()
        .all()
    )
