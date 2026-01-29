from app.database import db
from flask import current_app
from werkzeug.security import generate_password_hash

from app.models.user_model import User

def seed_admin():
    admin = User.query.filter_by(role="ADMIN").first()
    if admin:
        return

    admin = User(
        name="System Admin",
        email=current_app.config["ADMIN_EMAIL"],
        password_hash=generate_password_hash(
            current_app.config["ADMIN_PASSWORD"]
        ),
        role="ADMIN"
    )

    db.session.add(admin)
    db.session.commit()
