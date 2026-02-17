"""
Configuration Management - Free Tier Strategy
"""

import os
import json
from pathlib import Path
from dataclasses import dataclass, asdict
from typing import Dict, Any, Optional


@dataclass
class SkillsConfig:
    """Global configuration for zero-cost architecture."""
    
    # Cache settings (CRITICAL FOR $0 COST)
    cache_enabled: bool = True
    cache_path: str = "./skills/cache/skills.db"
    cache_ttl_default: int = 86400  # 24 hours
    cache_ttl_patterns: int = 604800  # 7 days
    
    # Free tier quotas
    gemini_daily_limit: int = 1500
    deepseek_daily_limit: int = 999999  # Unlimited
    local_daily_limit: int = 999999  # Unlimited
    
    # Performance targets
    target_cache_hit_rate: float = 0.90
    target_cost_per_1k: float = 0.00
    
    # Execution settings
    max_concurrent: int = 4
    timeout: int = 300
    confidence_threshold: float = 0.85
    
    # Paths
    skills_path: str = "./skills"
    manifest_path: str = "./skills/skill-manifest.json"
    
    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


_config: Optional[SkillsConfig] = None


def get_config() -> SkillsConfig:
    """Get global config instance."""
    global _config
    if _config is None:
        _config = SkillsConfig()
        # Override from environment
        if os.environ.get('SKILLS_CACHE_PATH'):
            _config.cache_path = os.environ['SKILLS_CACHE_PATH']
    return _config
