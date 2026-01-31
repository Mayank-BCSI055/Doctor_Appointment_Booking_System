from flask import request

from app.routes.patient import patient_bp
from app.auth.decorators import patient_required, get_active_user
from app.services.booking_service import book_slot
from app.services.appointment_service import (
    get_user_appointments,
    cancel_appointment,
)
from app.utils.response_utils import success, error
from app.utils.validation_utils import validate_positive_int


@patient_bp.route("/appointments", methods=["POST"])
@patient_required
def book_appointment():
    user = get_active_user()
    data = request.get_json() or {}

    slot_raw = data.get("slot_id")

    if slot_raw is None:
        return error("slot_id is required", 400)

    try:
        slot_id = int(slot_raw)
        validate_positive_int(slot_id, "slot_id")
    except (ValueError, TypeError):
        return error("slot_id must be a positive integer", 400)

    try:
        appointment = book_slot(user.id, slot_id)                                       # type: ignore
        return success(
            data={"appointment_id": appointment.id},
            message="Appointment booked",
            status=201,
        )
    except ValueError as e:
        return error(str(e), 400)


@patient_bp.route("/appointments", methods=["GET"])
@patient_required
def my_appointments():
    user = get_active_user()

    appointments = get_user_appointments(user.id)                                       # type: ignore

    data = [
        {
            "id": a.id,
            "doctor_id": a.doctor_id,
            "slot_id": a.slot_id,
            "status": a.status.value,
            "booked_at": a.booked_at.isoformat(),
        }
        for a in appointments
    ]

    return success(data=data)


@patient_bp.route("/appointments/<int:appointment_id>", methods=["DELETE"])
@patient_required
def cancel_my_appointment(appointment_id):
    user = get_active_user()

    try:
        appointment = cancel_appointment(appointment_id)
        return success(message="Appointment cancelled")
    except ValueError as e:
        return error(str(e), 400)

