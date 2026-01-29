from functools import wraps
from flask_jwt_extended import (
    get_jwt_identity,
    get_jwt,
    verify_jwt_in_request
)
from flask import jsonify
from app.models.user_model import User


def get_active_user():
    user_id = get_jwt_identity()
    claims = get_jwt()
    token_version = claims.get("token_version")

    user = User.query.get(int(user_id))
    if not user or not user.is_active:
        return None

    if user.token_version != token_version:
        return None

    return user


def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()

        user = get_active_user()
        if not user:
            return jsonify({"error": "Account disabled"}), 403

        if user.role != "ADMIN":
            return jsonify({"error": "Admin only"}), 403

        return fn(*args, **kwargs)
    return wrapper


def patient_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()

        user = get_active_user()
        if not user:
            return jsonify({"error": "Account disabled"}), 403

        if user.role != "PATIENT":
            return jsonify({"error": "Patient only"}), 403

        return fn(*args, **kwargs)
    return wrapper
