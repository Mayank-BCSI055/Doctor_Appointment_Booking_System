from flask import Blueprint

admin_bp = Blueprint("admin", __name__)

from app.routes.admin.doctor_routes import *
from app.routes.admin.availability_routes import *
from app.routes.admin.appointment_routes import *
