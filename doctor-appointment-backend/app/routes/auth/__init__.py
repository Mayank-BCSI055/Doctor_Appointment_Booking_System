from flask import Blueprint

auth_bp = Blueprint("auth", __name__)

from .login_routes import *
from .register_routes import *