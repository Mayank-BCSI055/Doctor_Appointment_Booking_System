from flask import jsonify

def success(data=None, message=None, status=200):
    return jsonify({
        "success": True,
        "data": data,
        "message": message
    }), status


def error(message, status=400):
    return jsonify({
        "success": False,
        "data": None,
        "message": message
    }), status
