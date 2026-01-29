from flask import request
from app.database import db
from app.routes.patient import patient_bp
from app.auth.decorators import patient_required, get_active_user
from app.utils.response_utils import success


@patient_bp.route("/profile", methods=["GET"])
@patient_required
def get_profile():
    user = get_active_user()

    return success(data={
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "created_at": user.created_at.isoformat()
    })


@patient_bp.route("/profile", methods=["PUT"])
@patient_required
def update_profile():
    user = get_active_user()
    data = request.json

    if "name" in data:
        user.name = data["name"]

    db.session.commit()

    return success(message="Profile updated")
