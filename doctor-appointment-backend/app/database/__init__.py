"""
Database package.

This package contains:
- application configuration (Config)
- admin seeding utilities
- Supabase privileged client (server-side only)
- optional transaction helpers

No side effects should occur on import.
"""

from app.database.config import Config
from app.database.seed_admin import seed_admin
from app.database.supabase_client import get_supabase_client
from app.database.transactions import atomic

__all__ = [
    "Config",
    "seed_admin",
    "get_supabase_client",
    "atomic",
]

