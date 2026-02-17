"""
SQLite-based Local Caching - THE KEY TO ZERO COST

90%+ cache hit rate = $0 cloud costs
"""

import sqlite3
import json
import hashlib
import time
from pathlib import Path
from typing import Dict, Any, Optional, List
from dataclasses import dataclass
from datetime import datetime, timedelta
from enum import Enum
from contextlib import contextmanager
import threading
import logging

logger = logging.getLogger('skills.cache')


class CacheType(Enum):
    PATTERN = "pattern"      # 7 days TTL
    EXECUTION = "execution"  # 24 hours TTL
    METRICS = "metrics"      # 1 hour TTL
    KNOWLEDGE = "knowledge"  # 30 days TTL


@dataclass
class CacheEntry:
    key: str
    value: Any
    cache_type: CacheType
    created_at: datetime
    expires_at: Optional[datetime]
    hit_count: int = 0
    
    def is_expired(self) -> bool:
        if self.expires_at is None:
            return False
        return datetime.now() > self.expires_at


class SkillCache:
    """
    SQLite-based cache for zero-cost persistence.
    
    Target: 90%+ hit rate = $0 cloud costs
    """
    
    TTL_DEFAULTS = {
        CacheType.PATTERN: 7 * 24 * 3600,
        CacheType.EXECUTION: 24 * 3600,
        CacheType.METRICS: 3600,
        CacheType.KNOWLEDGE: 30 * 24 * 3600
    }
    
    MAX_ENTRIES = {
        CacheType.PATTERN: 1000,
        CacheType.EXECUTION: 500,
        CacheType.METRICS: 100,
        CacheType.KNOWLEDGE: 5000
    }
    
    def __init__(self, cache_path: str = "./skills/cache/skills.db"):
        self.cache_path = Path(cache_path)
        self.cache_path.parent.mkdir(parents=True, exist_ok=True)
        self._local = threading.local()
        self._lock = threading.RLock()
        self._init_db()
        logger.info(f"Cache initialized: {self.cache_path}")
    
    def _get_conn(self) -> sqlite3.Connection:
        if not hasattr(self._local, 'conn') or self._local.conn is None:
            self._local.conn = sqlite3.connect(str(self.cache_path), check_same_thread=False)
            self._local.conn.row_factory = sqlite3.Row
        return self._local.conn
    
    def _init_db(self):
        with self._transaction() as conn:
            conn.execute('''
                CREATE TABLE IF NOT EXISTS cache (
                    key TEXT PRIMARY KEY,
                    value TEXT NOT NULL,
                    cache_type TEXT NOT NULL,
                    created_at TEXT NOT NULL,
                    expires_at TEXT,
                    hit_count INTEGER DEFAULT 0,
                    last_accessed TEXT
                )
            ''')
            conn.execute('CREATE INDEX IF NOT EXISTS idx_type ON cache(cache_type)')
            conn.execute('CREATE INDEX IF NOT EXISTS idx_expires ON cache(expires_at)')
    
    @contextmanager
    def _transaction(self):
        conn = self._get_conn()
        try:
            yield conn
            conn.commit()
        except Exception:
            conn.rollback()
            raise
    
    def get(self, key: str, default: Any = None) -> Optional[Any]:
        """Get from cache, return default if not found or expired."""
        with self._lock:
            with self._transaction() as conn:
                cursor = conn.execute('SELECT * FROM cache WHERE key = ?', (key,))
                row = cursor.fetchone()
                
                if row is None:
                    return default
                
                # Check expiration
                if row['expires_at']:
                    expires = datetime.fromisoformat(row['expires_at'])
                    if datetime.now() > expires:
                        conn.execute('DELETE FROM cache WHERE key = ?', (key,))
                        return default
                
                # Update hit count
                conn.execute(
                    'UPDATE cache SET hit_count = hit_count + 1, last_accessed = ? WHERE key = ?',
                    (datetime.now().isoformat(), key)
                )
                
                # Parse value
                value = row['value']
                try:
                    return json.loads(value)
                except:
                    return value
    
    def set(
        self,
        key: str,
        value: Any,
        cache_type = None,
        ttl: Optional[int] = None
    ) -> bool:
        """Set cache entry with TTL."""
        # Handle cache_type - accept string or enum
        if cache_type is None:
            cache_type = CacheType.EXECUTION
        elif isinstance(cache_type, str):
            cache_type = CacheType(cache_type)
        
        if ttl is None:
            ttl = self.TTL_DEFAULTS.get(cache_type, 86400)
        
        now = datetime.now()
        expires = now + timedelta(seconds=ttl) if ttl else None
        
        value_str = json.dumps(value) if not isinstance(value, str) else value
        
        with self._lock:
            with self._transaction() as conn:
                conn.execute('''
                    INSERT OR REPLACE INTO cache 
                    (key, value, cache_type, created_at, expires_at, hit_count, last_accessed)
                    VALUES (?, ?, ?, ?, ?, 0, ?)
                ''', (key, value_str, cache_type.value, now.isoformat(), 
                      expires.isoformat() if expires else None, now.isoformat()))
        
        return True
    
    def delete(self, key: str) -> bool:
        """Delete cache entry."""
        with self._lock:
            with self._transaction() as conn:
                cursor = conn.execute('DELETE FROM cache WHERE key = ?', (key,))
                return cursor.rowcount > 0
    
    def clear(self, cache_type: Optional[CacheType] = None) -> int:
        """Clear cache entries."""
        with self._lock:
            with self._transaction() as conn:
                if cache_type:
                    cursor = conn.execute('DELETE FROM cache WHERE cache_type = ?', (cache_type.value,))
                else:
                    cursor = conn.execute('DELETE FROM cache')
                return cursor.rowcount
    
    def cleanup_expired(self) -> int:
        """Remove all expired entries."""
        with self._lock:
            with self._transaction() as conn:
                cursor = conn.execute(
                    'DELETE FROM cache WHERE expires_at IS NOT NULL AND expires_at < ?',
                    (datetime.now().isoformat(),)
                )
                return cursor.rowcount
    
    def get_stats(self) -> Dict[str, Any]:
        """Get cache statistics."""
        with self._transaction() as conn:
            cursor = conn.execute('SELECT COUNT(*) as total FROM cache')
            total = cursor.fetchone()['total']
            
            cursor = conn.execute('SELECT SUM(hit_count) as hits FROM cache')
            hits = cursor.fetchone()['hits'] or 0
            
            return {
                'total_entries': total,
                'total_hits': hits,
                'cache_path': str(self.cache_path)
            }
    
    @staticmethod
    def generate_key(*args, **kwargs) -> str:
        """Generate cache key from arguments."""
        key_data = json.dumps({'args': args, 'kwargs': kwargs}, sort_keys=True)
        return hashlib.sha256(key_data.encode()).hexdigest()[:16]


# Singleton
_cache: Optional[SkillCache] = None


def get_cache(cache_path: Optional[str] = None) -> SkillCache:
    """Get global cache instance."""
    global _cache
    if _cache is None:
        from .config import get_config
        config = get_config()
        _cache = SkillCache(cache_path or config.cache_path)
    return _cache
