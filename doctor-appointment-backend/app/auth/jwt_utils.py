from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    get_jwt,
)
from app.models.user_model import Role

jwt = JWTManager()


def generate_token(user) -> str:
    """
    Generate a JWT access token for a user.
    """
    return create_access_token(
        identity=str(user.id),
        additional_claims={
            "role": user.role.value if isinstance(user.role, Role) else str(user.role),
            "token_version": user.token_version,
        },
    )


@jwt.token_in_blocklist_loader
def check_token_revoked(jwt_header, jwt_payload) -> bool:
    """
    Reject tokens that are outdated via token_version.
    """
    from app.extensions import db
    from app.models.user_model import User

    user_id = jwt_payload.get("sub")
    token_version = jwt_payload.get("token_version")

    if not user_id or token_version is None:
        return True

    user = db.session.get(User, int(user_id))
    if not user:
        return True

    return user.token_version != token_version


