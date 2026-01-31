from flask import request

from app.routes.patient import patient_bp
from app.services.browse_service import (
    list_active_doctors,
    list_available_slots,
)
from app.utils.response_utils import success, error
from app.utils.validation_utils import validate_positive_int


@patient_bp.route("/doctors", methods=["GET"])
def list_doctors():
    doctors = list_active_doctors()

    data = [
        {
            "id": d.id,
            "name": d.name,
            "specialization": d.specialization,
            "experience": d.experience,
            "consultation_duration": d.consultation_duration,
        }
        for d in doctors
    ]

    return success(data=data)


@patient_bp.route("/slots", methods=["GET"])
def list_slots():
    doctor_id_param = request.args.get("doctor_id")

    if doctor_id_param is None:
        return error("doctor_id is required", 400)

    try:
        doctor_id = int(doctor_id_param)
        validate_positive_int(doctor_id, "doctor_id")
    except ValueError:
        return error("doctor_id must be a valid integer", 400)
    except Exception as e:
        return error(str(e), 400)

    slots = list_available_slots(doctor_id=doctor_id)

    data = [
        {
            "id": s.id,
            "slot_date": s.slot_date.isoformat(),
            "start_time": s.start_time.strftime("%H:%M"),
            "end_time": s.end_time.strftime("%H:%M"),
        }
        for s in slots
    ]

    return success(data=data)
