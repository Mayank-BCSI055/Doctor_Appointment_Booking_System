from flask import request
from app.routes.patient import patient_bp
from app.models.doctor_model import Doctor
from app.models.availability_model import AvailabilitySlot
from app.models.appointment_model import Appointment
from app.utils.response_utils import success, error


@patient_bp.route("/doctors", methods=["GET"])
def list_doctors():
    doctors = Doctor.query.filter_by(is_active=True).all()

    data = []
    for d in doctors:
        data.append({
            "id": d.id,
            "name": d.name,
            "specialization": d.specialization,
            "experience": d.experience,
            "consultation_duration": d.consultation_duration
        })

    return success(data=data)


@patient_bp.route("/slots", methods=["GET"])
def list_slots():
    doctor_id = request.args.get("doctor_id")

    if not doctor_id:
        return error("doctor_id is required", 400)

    slots = AvailabilitySlot.query.filter_by(
        doctor_id=doctor_id,
        is_active=True
    ).all()

    booked_slot_ids = {
        a.slot_id for a in Appointment.query.filter_by(status="booked").all()
    }

    available_slots = [s for s in slots if s.id not in booked_slot_ids]

    data = []
    for s in available_slots:
        data.append({
            "id": s.id,
            "date": s.date,
            "start_time": s.start_time,
            "end_time": s.end_time
        })

    return success(data=data)
