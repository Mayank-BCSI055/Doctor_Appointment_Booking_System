import os
from flask import current_app
from werkzeug.security import generate_password_hash

from app.extensions import db
from app.models.user_model import User, Role


def seed_admin():
    """
    Creates a single ADMIN user if one does not already exist.

    This function is:
    - idempotent
    - enum-safe
    - Supabase/PostgreSQL compatible
    - Render restart safe
    """

    # Explicit opt-in (VERY IMPORTANT)
    if os.getenv("SEED_ADMIN", "false").lower() != "true":
        return

    admin_email = current_app.config.get("ADMIN_EMAIL")
    admin_password = current_app.config.get("ADMIN_PASSWORD")

    if not admin_email or not admin_password:
        raise RuntimeError("ADMIN_EMAIL or ADMIN_PASSWORD is not set")

    existing_admin = (
        db.session.query(User)
        .filter(User.role == Role.ADMIN)
        .first()
    )

    if existing_admin:
        return

    admin = User(
        name="System Admin",                                                                # type: ignore
        email=admin_email,                                                                  # type: ignore
        role=Role.ADMIN,                                                                    # type: ignore
        is_active=True,                                                                     # type: ignore
    )
    admin.password_hash = generate_password_hash(admin_password)

    try:
        db.session.add(admin)
        db.session.commit()
    except Exception:
        db.session.rollback()
        raise

