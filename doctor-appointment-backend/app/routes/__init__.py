from app.routes.auth import auth_bp
from app.routes.admin import admin_bp
from app.routes.patient import patient_bp
from app.routes.auth import auth_bp



def register_routes(app):
    app.register_blueprint(admin_bp, url_prefix="/api/admin")
    app.register_blueprint(patient_bp, url_prefix="/api/patient")
    app.register_blueprint(auth_bp, url_prefix="/api")