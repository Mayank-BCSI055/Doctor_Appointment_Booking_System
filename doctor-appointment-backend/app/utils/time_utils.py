from datetime import datetime

def is_future(date_str):
    return datetime.strptime(date_str, "%Y-%m-%d") > datetime.utcnow()
