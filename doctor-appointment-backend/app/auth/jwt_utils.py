from flask_jwt_extended import JWTManager, create_access_token

jwt = JWTManager()

def generate_token(user):
    return create_access_token(
    identity=str(user.id),
    additional_claims={
        "role": user.role,
        "token_version": user.token_version
    }
)