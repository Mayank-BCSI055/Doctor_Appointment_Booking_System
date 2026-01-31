from flask import Flask, request
from flask_migrate import Migrate
from flask_cors import CORS
import logging
import os

from app.extensions import db, jwt
from app.config import Config
from app.routes import register_routes
from app.utils.response_utils import error
from werkzeug.exceptions import HTTPException


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # --------------------
    # Logging
    # --------------------
    logging.basicConfig(
        level=logging.INFO,
        format="🩺 [%(asctime)s] %(levelname)s → %(message)s",
        datefmt="%H:%M:%S"
    )

    # --------------------
    # CORS
    # --------------------
    CORS(
        app,
        resources={
            r"/*": {
                "origins": os.getenv("CORS_ORIGINS", "*").split(",")
            }
        },
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
    )

    # --------------------
    # Extensions
    # --------------------
    db.init_app(app)
    jwt.init_app(app)
    Migrate(app, db)

    # --------------------
    # Routes
    # --------------------
    register_routes(app)

    # --------------------
    # Health Check
    # --------------------
    @app.route("/health", methods=["GET"])
    def health():
        return {"status": "ok"}, 200

    # --------------------
    # Request logging
    # --------------------
    @app.before_request
    def log_request():
        logging.info(f"{request.method} {request.path}")

    # --------------------
    # Error handling
    # --------------------
    @app.errorhandler(HTTPException)
    def handle_http_exception(e):
        return error(e.description, e.code)

    @app.errorhandler(Exception)
    def handle_unexpected_exception(e):
        logging.exception(e)
        return error("Internal server error", 500)

    return app
