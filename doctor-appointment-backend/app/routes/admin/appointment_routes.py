from app.routes.admin import admin_bp
from app.auth.decorators import admin_required
from app.models.appointment_model import Appointment
from app.database import db
from app.utils.response_utils import success


@admin_bp.route("/appointments", methods=["GET"])
@admin_required
def get_all_appointments():
    appointments = Appointment.query.all()

    data = []
    for a in appointments:
        data.append({
            "id": a.id,
            "user_id": a.user_id,
            "doctor_id": a.doctor_id,
            "slot_id": a.slot_id,
            "status": a.status,
            "booked_at": a.booked_at.isoformat()
        })

    return success(data=data)


@admin_bp.route("/appointments/<int:appointment_id>/cancel", methods=["PUT"])
@admin_required
def cancel_appointment(appointment_id):
    appointment = Appointment.query.get_or_404(appointment_id)

    appointment.status = "cancelled"
    db.session.commit()

    return success(message="Appointment cancelled")


@admin_bp.route("/appointments/<int:appointment_id>/complete", methods=["PUT"])
@admin_required
def complete_appointment(appointment_id):
    appointment = Appointment.query.get_or_404(appointment_id)

    appointment.status = "completed"
    db.session.commit()

    return success(message="Appointment completed")
