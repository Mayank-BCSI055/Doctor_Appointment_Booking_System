import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    # =========================
    # Core App Settings
    # =========================
    ENV = os.getenv("FLASK_ENV", "production")
    DEBUG = os.getenv("DEBUG", "false").lower() == "true"
    SECRET_KEY = os.getenv("SECRET_KEY")

    # =========================
    # Database (Supabase)
    # =========================
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Enforce SSL for Supabase PostgreSQL
    SQLALCHEMY_ENGINE_OPTIONS = {
        "connect_args": {
            "sslmode": os.getenv("DB_SSL_MODE", "require")
        }
    }

    # =========================
    # Auth / JWT
    # =========================
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = 60 * 60 * 24  # 1 day

    # =========================
    # Admin Seeder (optional)
    # =========================
    ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
    SEED_ADMIN = os.getenv("SEED_ADMIN", "false").lower() == "true"