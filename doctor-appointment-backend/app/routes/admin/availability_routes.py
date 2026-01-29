from flask import request
from app.routes.admin import admin_bp
from app.auth.decorators import admin_required
from app.services.availability_service import create_slot
from app.database import db
from app.utils.response_utils import success

@admin_bp.route("/slots", methods=["POST"])
@admin_required
def add_slot():
    slot = create_slot(request.json)
    db.session.commit()

    return success(
        data={"slot_id": slot.id},
        message="Slot created",
        status=201
    )
