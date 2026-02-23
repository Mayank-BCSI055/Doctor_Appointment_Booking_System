import os
from app import create_app
from app.database.seed_admin import seed_admin

app = create_app()
print("✅ App created successfully")

print(app.url_map)

# Optional admin seeding
if os.environ.get("SEED_ADMIN", "").lower() == "true":
    with app.app_context():
        seed_admin()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=True              # Local development only; disable in production
    )
