from functools import wraps
from app.extensions import db


def atomic(fn):
    """
    Use ONLY for very small, isolated operations.
    DO NOT use for booking, availability, or multi-step logic.
    """
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            result = fn(*args, **kwargs)
            db.session.commit()
            return result
        except Exception:
            db.session.rollback()
            raise

    return wrapper
