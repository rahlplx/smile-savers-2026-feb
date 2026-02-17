"""
Core Infrastructure for Enterprise RAG System v4.0

Modules:
- cache: SQLite-based caching (ZERO COST)
- config: Configuration management
- registry: Skill registry and discovery
- context: Context management system
- hallucination: Hallucination prevention
- thinking: Programmatic thinking engine
- tools: Tool calling validation
"""

from .cache import SkillCache, CacheType, get_cache, CacheEntry
from .config import SkillsConfig, get_config
from .registry import SkillRegistry, SkillInfo, get_registry
from .context import ContextManager, ContextType, ContextEntry, get_context_manager
from .hallucination import HallucinationPreventer, HallucinationCheck, get_hallucination_preventer
from .thinking import ProgrammaticThinking, ThinkingResult, ThinkingPhase, get_thinking_engine
from .tools import ToolValidator, ToolCall, ValidationResult, get_tool_validator

__all__ = [
    # Cache
    'SkillCache',
    'CacheType',
    'CacheEntry',
    'get_cache',
    
    # Config
    'SkillsConfig',
    'get_config',
    
    # Registry
    'SkillRegistry',
    'SkillInfo',
    'get_registry',
    
    # Context
    'ContextManager',
    'ContextType',
    'ContextEntry',
    'get_context_manager',
    
    # Hallucination
    'HallucinationPreventer',
    'HallucinationCheck',
    'get_hallucination_preventer',
    
    # Thinking
    'ProgrammaticThinking',
    'ThinkingResult',
    'ThinkingPhase',
    'get_thinking_engine',
    
    # Tools
    'ToolValidator',
    'ToolCall',
    'ValidationResult',
    'get_tool_validator',
]

__version__ = '4.0.0'
