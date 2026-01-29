from flask import request
from app.auth.decorators import patient_required, get_active_user
from app.database import db
from app.routes.patient import patient_bp
from app.services.booking_service import book_slot
from app.models.appointment_model import Appointment
from app.utils.response_utils import success, error


@patient_bp.route("/appointments", methods=["POST"])
@patient_required
def book_appointment():
    user = get_active_user()
    slot_id = request.json.get("slot_id")

    if not slot_id:
        return error("slot_id is required", 400)

    try:
        appointment = book_slot(user.id, slot_id)
        return success(
            data={"appointment_id": appointment.id},
            message="Appointment booked",
            status=201
        )
    except ValueError as e:
        return error(str(e), 400)


@patient_bp.route("/appointments", methods=["GET"])
@patient_required
def my_appointments():
    user = get_active_user()
    appointments = Appointment.query.filter_by(user_id=user.id).all()

    data = []
    for a in appointments:
        data.append({
            "id": a.id,
            "doctor_id": a.doctor_id,
            "slot_id": a.slot_id,
            "status": a.status,
            "booked_at": a.booked_at.isoformat()
        })

    return success(data=data)


@patient_bp.route("/appointments/<int:appointment_id>", methods=["DELETE"])
@patient_required
def cancel_appointment(appointment_id):
    user = get_active_user()

    appointment = Appointment.query.filter_by(
        id=appointment_id,
        user_id=user.id
    ).first()

    if not appointment:
        return error("Appointment not found", 404)

    if appointment.status != "booked":
        return error("Cannot cancel this appointment", 400)

    appointment.status = "cancelled"
    db.session.commit()

    return success(message="Appointment cancelled")
