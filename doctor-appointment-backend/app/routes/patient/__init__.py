from flask import Blueprint

patient_bp = Blueprint("patient", __name__)

from app.routes.patient.booking_routes import *
from app.routes.patient.browse_routes import *
from app.routes.patient.profile_routes import *
