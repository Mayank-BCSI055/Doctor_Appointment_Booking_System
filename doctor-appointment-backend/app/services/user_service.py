from sqlalchemy.exc import SQLAlchemyError

from app.extensions import db
from app.models.user_model import User


def update_user_profile(user_id: int, name: str) -> User:
    """
    Update basic user profile information.

    This function:
    - owns the database transaction
    - validates existence
    - is safe for Supabase/PostgreSQL
    """

    try:
        user = db.session.get(User, user_id)

        if not user:
            raise ValueError("User not found")

        user.name = name

        db.session.commit()
        return user

    except SQLAlchemyError:
        db.session.rollback()
        raise

