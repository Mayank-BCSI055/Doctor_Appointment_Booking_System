from flask import request, jsonify
from werkzeug.security import check_password_hash
from app.database import db

from app.models.user_model import User
from app.auth.jwt_utils import generate_token

def register_login_routes(app):

    @app.route("/api/login", methods=["POST"])
    def login():
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return {"message": "Email and password are required"}, 400

        email = email.lower()

        user = User.query.filter_by(email=email).first()

        if not user:
            return {"error": "User not found"}, 404

        if not check_password_hash(user.password_hash, password):
            return {"error": "Invalid credentials"}, 401

        # ONLY generate JWT
        token = generate_token(user)

        return jsonify({
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role
            },
            "token": token
        }), 200
