from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity

from app.extensions import db
from app.models.user_model import User, Role


def get_active_user():
    """
    Return the currently authenticated and active user, or None.
    JWT validity and token revocation are already handled by JWT callbacks.
    """
    user_id = get_jwt_identity()
    if not user_id:
        return None

    user = db.session.get(User, int(user_id))
    if not user or not user.is_active:
        return None

    return user


def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()

        user = get_active_user()
        if not user:
            return jsonify({"error": "Account disabled or invalid"}), 403

        if user.role != Role.ADMIN:
            return jsonify({"error": "Admin access required"}), 403

        return fn(*args, **kwargs)

    return wrapper


def patient_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()

        user = get_active_user()
        if not user:
            return jsonify({"error": "Account disabled or invalid"}), 403

        if user.role != Role.PATIENT:
            return jsonify({"error": "Patient access required"}), 403

        return fn(*args, **kwargs)

    return wrapper

