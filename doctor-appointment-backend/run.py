from app.__init__ import create_app
from app.database.seed_admin import seed_admin

app = create_app()

with app.app_context():
    seed_admin()

if __name__ == "__main__":
    app.run(debug=True)
