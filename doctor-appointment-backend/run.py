
from app.__init__ import create_app
from app.database.seed_admin import seed_admin
import os

app = create_app()

with app.app_context():
    seed_admin()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
