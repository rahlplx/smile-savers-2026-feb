"""
Enterprise RAG API - Simple Integration Layer

Usage:
    from skills.api import EnterpriseRAG
    
    rag = EnterpriseRAG()
    result = rag.query("Fix the lint error")
    print(result.answer)
"""

import sys
import asyncio
from pathlib import Path
from typing import Dict, Any, Optional, List
from dataclasses import dataclass
import json

# Add skills to path
sys.path.insert(0, str(Path(__file__).parent))

from core.cache import get_cache, CacheType
from core.config import get_config
from core.registry import get_registry
from core.context import get_context_manager, ContextType
from core.hallucination import get_hallucination_preventer
from core.thinking import get_thinking_engine
from core.tools import get_tool_validator
from orchestrator.orchestrator import UnifiedOrchestrator


@dataclass
class QueryResult:
    """Result of a query."""
    query: str
    answer: Any
    confidence: float
    skill_used: str
    model_used: str
    cost: float
    duration_ms: int
    cache_hit: bool
    hallucination_level: str
    
    def to_dict(self) -> Dict:
        return {
            'query': self.query,
            'answer': self.answer,
            'confidence': self.confidence,
            'skill_used': self.skill_used,
            'model_used': self.model_used,
            'cost': self.cost,
            'duration_ms': self.duration_ms,
            'cache_hit': self.cache_hit,
            'hallucination_level': self.hallucination_level
        }
    
    def to_json(self) -> str:
        return json.dumps(self.to_dict(), indent=2)


class EnterpriseRAG:
    """
    Simple API for Enterprise RAG System.
    
    Example:
        rag = EnterpriseRAG()
        
        # Single query
        result = rag.query("Fix the lint error")
        print(f"Answer: {result.answer}")
        print(f"Cost: ${result.cost}")
        
        # Batch queries
        results = rag.batch_query(["Query 1", "Query 2"])
        
        # Get patterns
        pattern = rag.get_pattern("lazy_init")
    """
    
    def __init__(self, skills_path: str = None):
        """Initialize the RAG system."""
        
        self.cache = get_cache()
        self.config = get_config()
        self.registry = get_registry()
        self.context_manager = get_context_manager(self.cache)
        self.hallucination_preventer = get_hallucination_preventer(self.cache)
        self.thinking_engine = get_thinking_engine(self.cache, self.hallucination_preventer)
        self.tool_validator = get_tool_validator(self.cache)
        self._orchestrator = None
    
    @property
    def orchestrator(self):
        """Lazy load orchestrator."""
        if self._orchestrator is None:
            self._orchestrator = UnifiedOrchestrator()
        return self._orchestrator
    
    def query(
        self,
        query: str,
        context: Optional[Dict] = None,
        min_confidence: float = 0.60
    ) -> QueryResult:
        """
        Execute a single query.
        
        Args:
            query: The query string
            context: Optional context dictionary
            min_confidence: Minimum confidence threshold
            
        Returns:
            QueryResult with answer and metadata
        """
        
        return asyncio.run(self._async_query(query, context, min_confidence))
    
    async def _async_query(
        self,
        query: str,
        context: Optional[Dict],
        min_confidence: float
    ) -> QueryResult:
        
        import time
        start = time.time()
        
        # Check cache
        cache_key = self.cache.generate_key(query, context or {})
        cached = self.cache.get(cache_key)
        if cached:
            return QueryResult(
                query=query,
                answer=cached.get('output'),
                confidence=cached.get('confidence', 1.0),
                skill_used=cached.get('skill_used', 'cache'),
                model_used='cache',
                cost=0.0,
                duration_ms=int((time.time() - start) * 1000),
                cache_hit=True,
                hallucination_level='high'
            )
        
        # Execute
        result = await self.orchestrator.execute(
            query, 
            context or {}, 
            min_confidence
        )
        
        # Build response
        response = QueryResult(
            query=query,
            answer=result.output,
            confidence=result.confidence,
            skill_used=result.skill_id,
            model_used=result.model_used,
            cost=result.cost,
            duration_ms=result.duration_ms,
            cache_hit=result.cache_hit,
            hallucination_level='high' if result.confidence > 0.85 else 'medium'
        )
        
        # Cache result
        self.cache.set(cache_key, response.to_dict(), ttl=3600)
        
        return response
    
    def batch_query(
        self,
        queries: List[str],
        context: Optional[Dict] = None
    ) -> List[QueryResult]:
        """
        Execute multiple queries.
        
        Args:
            queries: List of query strings
            context: Optional shared context
            
        Returns:
            List of QueryResults
        """
        
        return asyncio.run(self._async_batch(queries, context))
    
    async def _async_batch(
        self,
        queries: List[str],
        context: Optional[Dict]
    ) -> List[QueryResult]:
        
        tasks = [self._async_query(q, context, 0.60) for q in queries]
        return await asyncio.gather(*tasks)
    
    def get_pattern(self, pattern_id: str) -> Optional[Dict]:
        """
        Get a code pattern by ID.
        
        Args:
            pattern_id: Pattern identifier (e.g., 'lazy_init')
            
        Returns:
            Pattern dictionary or None
        """
        
        return self.cache.get(f'pattern:{pattern_id}')
    
    def add_pattern(
        self,
        pattern_id: str,
        code: str,
        description: str,
        confidence: float = 0.85,
        tags: List[str] = None
    ) -> bool:
        """
        Add a new pattern to the knowledge base.
        
        Args:
            pattern_id: Unique identifier
            code: The code pattern
            description: What this pattern does
            confidence: Confidence score (0-1)
            tags: Optional tags for categorization
            
        Returns:
            True if successful
        """
        
        pattern = {
            'id': pattern_id,
            'code': code,
            'description': description,
            'confidence': confidence,
            'tags': tags or []
        }
        
        self.cache.set(f'pattern:{pattern_id}', pattern, cache_type='pattern')
        
        # Also add to hallucination preventer
        self.hallucination_preventer.add_known_pattern(
            pattern_id, code, confidence
        )
        
        return True
    
    def list_skills(self) -> List[Dict]:
        """
        List all available skills.
        
        Returns:
            List of skill info dictionaries
        """
        
        return [
            {
                'id': skill.id,
                'name': skill.name,
                'category': skill.category,
                'description': skill.description,
                'has_scripts': skill.has_scripts
            }
            for skill in self.registry.skills.values()
        ]
    
    def get_skill(self, skill_id: str) -> Optional[Dict]:
        """
        Get information about a specific skill.
        
        Args:
            skill_id: Skill identifier
            
        Returns:
            Skill info or None
        """
        
        skill = self.registry.get_skill(skill_id)
        if skill:
            return {
                'id': skill.id,
                'name': skill.name,
                'category': skill.category,
                'description': skill.description,
                'peer_skills': skill.peer_skills,
                'dependencies': skill.dependencies
            }
        return None
    
    def clear_cache(self) -> int:
        """
        Clear all cached data.
        
        Returns:
            Number of entries cleared
        """
        
        return self.cache.clear()
    
    def get_stats(self) -> Dict:
        """
        Get system statistics.
        
        Returns:
            Statistics dictionary
        """
        
        return {
            'cache': self.cache.get_stats(),
            'skills': len(self.registry.skills),
            'thinking': self.thinking_engine.get_stats(),
            'tools': self.tool_validator.get_stats()
        }


# Singleton instance
_instance: Optional[EnterpriseRAG] = None


def get_rag() -> EnterpriseRAG:
    """Get global RAG instance."""
    global _instance
    if _instance is None:
        _instance = EnterpriseRAG()
    return _instance


# Convenience functions
def query(query_str: str, context: Dict = None) -> QueryResult:
    """Quick query function."""
    return get_rag().query(query_str, context)


def get_pattern(pattern_id: str) -> Optional[Dict]:
    """Quick pattern retrieval."""
    return get_rag().get_pattern(pattern_id)


if __name__ == "__main__":
    print("=== Enterprise RAG API Demo ===\n")
    
    rag = EnterpriseRAG()
    
    # Single query
    print("1. Single Query:")
    result = rag.query("Fix the lint error in Component.tsx")
    print(f"   Answer: {result.answer}")
    print(f"   Confidence: {result.confidence:.2f}")
    print(f"   Cost: ${result.cost:.4f}")
    print(f"   Duration: {result.duration_ms}ms")
    
    # Batch queries
    print("\n2. Batch Queries:")
    results = rag.batch_query([
        "Generate a React component",
        "Analyze code quality"
    ])
    for i, r in enumerate(results):
        print(f"   Query {i+1}: confidence={r.confidence:.2f}, cost=${r.cost:.4f}")
    
    # Get pattern
    print("\n3. Get Pattern:")
    pattern = rag.get_pattern("react_lazy_init")
    if pattern:
        print(f"   Pattern: {pattern['name']}")
        print(f"   Confidence: {pattern['confidence']}")
    
    # Stats
    print("\n4. System Stats:")
    stats = rag.get_stats()
    print(f"   Cache entries: {stats['cache']['total_entries']}")
    print(f"   Skills: {stats['skills']}")
    
    print("\n✅ API Demo Complete")
