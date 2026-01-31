from app.routes.admin import admin_bp
from app.auth.decorators import admin_required
from app.services.appointment_service import (
    get_doctor_appointments,
    cancel_appointment,
    complete_appointment,
)
from app.utils.response_utils import success, error


@admin_bp.route("/appointments", methods=["GET"])
@admin_required
def get_all_appointments():
    """
    Admin: view all appointments (across doctors).
    """
    # Admin can see all, reuse service logic
    appointments = get_doctor_appointments(doctor_id=None)

    data = [
        {
            "id": a.id,
            "user_id": a.user_id,
            "doctor_id": a.doctor_id,
            "slot_id": a.slot_id,
            "status": a.status.value,
            "booked_at": a.booked_at.isoformat(),
        }
        for a in appointments
    ]

    return success(data=data)


@admin_bp.route("/appointments/<int:appointment_id>/cancel", methods=["PUT"])
@admin_required
def admin_cancel_appointment(appointment_id):
    try:
        appointment = cancel_appointment(appointment_id)
        return success(message="Appointment cancelled")

    except Exception as e:
        return error(str(e), 400)


@admin_bp.route("/appointments/<int:appointment_id>/complete", methods=["PUT"])
@admin_required
def admin_complete_appointment(appointment_id):
    try:
        appointment = complete_appointment(appointment_id)
        return success(message="Appointment completed")

    except Exception as e:
        return error(str(e), 400)

