from app import create_app
from app.database.seed_admin import seed_admin
import os

app = create_app()

if os.environ.get("SEED_ADMIN") == "true":
    with app.app_context():
        seed_admin()