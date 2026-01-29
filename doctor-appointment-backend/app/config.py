import os

class Config:
    SQLALCHEMY_DATABASE_URI = "sqlite:///doctor_appointment.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET", "super-secret-key")

    ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@system.com")
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")
