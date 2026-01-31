from werkzeug.security import generate_password_hash, check_password_hash


def hash_password(password: str) -> str:
    """
    Hash a plaintext password using a strong, one-way hash.
    """
    return generate_password_hash(password, method="pbkdf2:sha256")


def verify_password(password_hash: str, password: str) -> bool:
    """
    Verify a plaintext password against a stored hash.
    """
    return check_password_hash(password_hash, password)
