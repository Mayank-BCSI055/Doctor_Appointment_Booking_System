from flask import request

from app.routes.admin import admin_bp
from app.auth.decorators import admin_required
from app.services.doctor_service import create_doctor
from app.utils.response_utils import success, error
from app.utils.validation_utils import require_fields, validate_positive_int


@admin_bp.route("/doctors", methods=["POST"])
@admin_required
def add_doctor():
    data = request.get_json() or {}

    try:
        require_fields(
            data,
            ["name", "specialization", "experience", "consultation_duration"],
        )
        validate_positive_int(data["experience"], "experience")
        validate_positive_int(
            data["consultation_duration"],
            "consultation_duration",
        )
    except Exception as e:
        return error(str(e), 400)

    doctor = create_doctor(data)

    return success(
        data={"doctor_id": doctor.id},
        message="Doctor created",
        status=201,
    )
