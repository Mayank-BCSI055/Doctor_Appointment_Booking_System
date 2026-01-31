from flask import jsonify


def success(data=None, message: str | None = None, status: int = 200):
    """
    Standard success response.
    """
    return (
        jsonify(
            {
                "success": True,
                "data": data,
                "message": message,
            }
        ),
        status,
    )


def error(message: str, status: int = 400, data=None):
    """
    Standard error response.
    """
    return (
        jsonify(
            {
                "success": False,
                "data": data,
                "message": message,
            }
        ),
        status,
    )

