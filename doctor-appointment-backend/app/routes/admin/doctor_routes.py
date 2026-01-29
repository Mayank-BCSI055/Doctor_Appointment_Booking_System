from flask import request
from app.utils.response_utils import success
from app.routes.admin import admin_bp
from app.auth.decorators import admin_required
from app.services.doctor_service import create_doctor
from app.database import db

@admin_bp.route("/doctors", methods=["POST"])
@admin_required
def add_doctor():
    doctor = create_doctor(request.json)
    db.session.commit()
    return success(
        data={"doctor_id": doctor.id},
        message="Doctor created",
        status=201
    )
