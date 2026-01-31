import os
from supabase import create_client, Client

_supabase_client: Client | None = None


def get_supabase_client() -> Client:
    """
    Lazily create and return Supabase client.
    Only called when Supabase is actually needed.
    """
    global _supabase_client

    if _supabase_client is not None:
        return _supabase_client

    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

    if not supabase_url or not supabase_key:
        raise RuntimeError(
            "SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing"
        )

    _supabase_client = create_client(supabase_url, supabase_key)
    return _supabase_client
