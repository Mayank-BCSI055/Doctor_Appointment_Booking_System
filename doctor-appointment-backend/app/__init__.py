from flask import Flask, request
from flask_migrate import Migrate
from flask_cors import CORS
from app.database import db
import logging

from app.utils.response_utils import error
from app.auth.jwt_utils import jwt
from app.routes.patient import patient_bp
from werkzeug.exceptions import HTTPException
from app.routes.auth.login_routes import register_login_routes

def create_app():
    app = Flask(__name__)

    # Pretty logging
    logging.basicConfig(
        level=logging.INFO,
        format="🩺 [%(asctime)s] %(levelname)s → %(message)s",
        datefmt="%H:%M:%S"
    )

    app.config.from_object("app.database.config.Config")

    # CORS
    CORS(
        app,
        resources={r"/*": {"origins": "http://localhost:3000"}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
    )

    # Extensions
    db.init_app(app)

    jwt.init_app(app)
    Migrate(app, db)

    with app.app_context():
        db.create_all()

    # Routes
    app.register_blueprint(patient_bp, url_prefix="/patient")
    register_login_routes(app)

    # Health check
    @app.route("/api/login", methods=["POST"])
    def home():
        return {"status": "Doctor Appointment Backend is running"}

    @app.before_request
    def log_request():
        logging.info(f"{request.method} {request.path}")

    @app.errorhandler(HTTPException)
    def handle_http_exception(e):
        return error(e.description, e.code)

    @app.errorhandler(Exception)
    def handle_unexpected_exception(e):
        return error("Internal server error", 500)


    return app
