from flask import request

from app.routes.patient import patient_bp
from app.auth.decorators import patient_required, get_active_user
from app.services.user_service import update_user_profile
from app.utils.response_utils import success, error
from app.utils.validation_utils import require_fields


@patient_bp.route("/profile", methods=["GET"])
@patient_required
def get_profile():
    user = get_active_user()

    return success(
        data={
            "id": user.id,                                                              # type: ignore
            "name": user.name,                                                          # type: ignore
            "email": user.email,                                                        # type: ignore
            "role": user.role.value,                                                    # type: ignore
            "created_at": user.created_at.isoformat(),                                  # type: ignore
        }
    )


@patient_bp.route("/profile", methods=["PUT"])
@patient_required
def update_profile():
    user = get_active_user()
    data = request.get_json() or {}

    try:
        require_fields(data, ["name"])
    except Exception as e:
        return error(str(e), 400)

    update_user_profile(user_id=user.id, name=data["name"])                             # type: ignore

    return success(message="Profile updated")
