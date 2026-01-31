from flask import request

from app.routes.admin import admin_bp
from app.auth.decorators import admin_required
from app.services.availability_service import create_slot
from app.utils.response_utils import success, error
from app.utils.validation_utils import (
    require_fields,
    validate_positive_int,
    validate_date,
    validate_time,
    validate_time_range,
)


@admin_bp.route("/slots", methods=["POST"])
@admin_required
def add_slot():
    data = request.get_json() or {}

    try:
        require_fields(
            data,
            ["doctor_id", "slot_date", "start_time", "end_time"],
        )

        validate_positive_int(data["doctor_id"], "doctor_id")
        validate_date(data["slot_date"], "slot_date")
        validate_time(data["start_time"], "start_time")
        validate_time(data["end_time"], "end_time")
        validate_time_range(data["start_time"], data["end_time"])

    except Exception as e:
        return error(str(e), 400)

    slot = create_slot(data)

    return success(
        data={"slot_id": slot.id},
        message="Slot created",
        status=201,
    )