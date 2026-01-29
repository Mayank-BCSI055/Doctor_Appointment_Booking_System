from flask import request
from sqlalchemy.exc import IntegrityError
from app.database import db

from app.models.user_model import User, Role
from app.routes.patient.__init__ import patient_bp

@patient_bp.route("/register", methods=["POST"])
def patient_register():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email").lower()
    password = data.get("password")

    # 1️⃣ Basic validation
    if not name or not email or not password:
        return {"message": "Name, email, and password are required"}, 400

    # 2️⃣ CHECK IF USER ALREADY EXISTS
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return {"message": "Email already registered"}, 409
    
    # 3️⃣ Create new user
    try:
        user = User(
            name=name,
            email=email,
            role=Role.PATIENT.value
        )
        user.set_password(password)

        db.session.add(user)
        db.session.commit()

        return {"message": "Patient registered successfully"}, 201

    # 4️⃣ Safety net (race condition)
    except IntegrityError:
        db.session.rollback()
        return {"message": "Email already registered"}, 409
