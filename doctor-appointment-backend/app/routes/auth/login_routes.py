from flask import request

from app.extensions import db
from app.models.user_model import User
from app.auth.jwt_utils import generate_token
from app.auth.password_utils import verify_password
from app.routes.auth import auth_bp
from app.utils.response_utils import success, error
from app.utils.validation_utils import require_fields, validate_email


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}

    try:
        require_fields(data, ["email", "password"])
        validate_email(data["email"])
    except Exception as e:
        return error(str(e), 400)

    email = data["email"].lower()

    user = db.session.query(User).filter(User.email == email).first()

    if not user:
        return error("Invalid email or password", 401)

    if not user.is_active:
        return error("Account is disabled", 403)

    if not verify_password(user.password_hash, data["password"]):
        return error("Invalid email or password", 401)

    token = generate_token(user)

    return success(
        data={
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role.value,
            },
            "access_token": token,
        },
        message="Login successful",
        status=200,
    )
