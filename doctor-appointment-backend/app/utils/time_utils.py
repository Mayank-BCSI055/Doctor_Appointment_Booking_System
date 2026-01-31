from datetime import datetime, date, time, timezone


def is_future_datetime(slot_date: date, start_time: time) -> bool:
    """
    Return True if the given slot date + start time is in the future (UTC).
    """
    slot_dt = datetime.combine(slot_date, start_time, tzinfo=timezone.utc)
    return slot_dt > datetime.now(timezone.utc)


def is_future_date(slot_date: date) -> bool:
    """
    Return True if the given date is today or in the future (UTC).
    """
    today = datetime.now(timezone.utc).date()
    return slot_date >= today

