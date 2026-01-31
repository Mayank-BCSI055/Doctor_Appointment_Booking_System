import os


class Config:
    # -------------------------
    # Core Flask settings
    # -------------------------
    ENV = os.getenv("FLASK_ENV", "production")
    DEBUG = os.getenv("DEBUG", "false").lower() == "true"
    SECRET_KEY = os.getenv("SECRET_KEY")

    # -------------------------
    # Database (Supabase)
    # -------------------------
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SQLALCHEMY_ENGINE_OPTIONS = {
        "connect_args": {
            "sslmode": os.getenv("DB_SSL_MODE", "require")
        }
    }

    # -------------------------
    # JWT
    # -------------------------
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = 60 * 60 * 24  # 24 hours

    # -------------------------
    # Admin seeding (explicit)
    # -------------------------
    ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
