from flask import request
from sqlalchemy.exc import IntegrityError

from app.extensions import db
from app.models.user_model import User, Role
from app.routes.auth import auth_bp
from app.utils.response_utils import success, error
from app.utils.validation_utils import (
    require_fields,
    validate_email,
    validate_password,
)


@auth_bp.route("/register", methods=["POST"])
def register_patient():
    data = request.get_json() or {}

    try:
        # Validate input
        require_fields(data, ["name", "email", "password"])
        validate_email(data["email"])
        validate_password(data["password"])
    except Exception as e:
        return error(str(e), 400)

    email = data["email"].lower()

    # Check if user already exists
    if db.session.query(User).filter(User.email == email).first():
        return error("Email already registered", 409)

    try:
        user = User(
            name=data["name"],                                                              # type: ignore
            email=email,                                                                    # type: ignore
            role=Role.PATIENT,                                                              # type: ignore
            is_active=True,                                                                 # type: ignore
        )
        user.set_password(data["password"])

        db.session.add(user)
        db.session.commit()

        return success(
            message="Patient registered successfully",
            status=201,
        )

    except IntegrityError:
        db.session.rollback()
        return error("Email already registered", 409)

