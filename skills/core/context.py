"""
Context Management System
=========================

Solves:
1. Context loss between skill calls
2. Context overflow/truncation
3. Context relevance filtering
4. Cross-skill context sharing

Architecture:
- ContextStore: SQLite-backed context storage
- ContextChain: Chain of context transformations
- ContextValidator: Validates context integrity
"""

import json
import hashlib
import time
from typing import Dict, List, Any, Optional
from dataclasses import dataclass, field, asdict
from datetime import datetime, timedelta
from enum import Enum
import logging

logger = logging.getLogger('context')


class ContextType(Enum):
    """Types of context."""
    USER_INPUT = "user_input"
    SKILL_INPUT = "skill_input"
    SKILL_OUTPUT = "skill_output"
    PEER_MESSAGE = "peer_message"
    LEARNED_PATTERN = "learned_pattern"
    VALIDATION = "validation"


@dataclass
class ContextEntry:
    """A single context entry."""
    id: str
    context_type: ContextType
    content: Any
    source_skill: str
    target_skill: Optional[str]
    created_at: datetime
    expires_at: Optional[datetime]
    relevance_score: float = 1.0
    metadata: Dict = field(default_factory=dict)
    
    def is_expired(self) -> bool:
        if self.expires_at is None:
            return False
        return datetime.now() > self.expires_at
    
    def is_relevant(self, min_score: float = 0.5) -> bool:
        return self.relevance_score >= min_score


@dataclass
class ContextChain:
    """Chain of context entries."""
    chain_id: str
    entries: List[ContextEntry] = field(default_factory=list)
    current_index: int = 0
    max_entries: int = 100
    
    def add(self, entry: ContextEntry):
        """Add entry to chain."""
        if len(self.entries) >= self.max_entries:
            # Remove oldest expired entry or least relevant
            self._evict_one()
        self.entries.append(entry)
    
    def _evict_one(self):
        """Evict one entry from chain."""
        # First try to remove expired
        for i, entry in enumerate(self.entries):
            if entry.is_expired():
                self.entries.pop(i)
                return
        
        # Otherwise remove least relevant
        if self.entries:
            min_idx = min(range(len(self.entries)), 
                         key=lambda i: self.entries[i].relevance_score)
            self.entries.pop(min_idx)
    
    def get_relevant(self, query: str, top_k: int = 10) -> List[ContextEntry]:
        """Get relevant entries for a query."""
        # Simple relevance: text matching
        relevant = []
        query_lower = query.lower()
        
        for entry in self.entries:
            if entry.is_expired():
                continue
            
            content_str = json.dumps(entry.content).lower()
            
            # Calculate simple relevance score
            matches = sum(1 for word in query_lower.split() if word in content_str)
            entry.relevance_score = matches / max(1, len(query_lower.split()))
            
            if entry.relevance_score > 0:
                relevant.append(entry)
        
        # Sort by relevance
        relevant.sort(key=lambda e: e.relevance_score, reverse=True)
        return relevant[:top_k]
    
    def to_dict(self) -> Dict:
        """Serialize chain."""
        return {
            'chain_id': self.chain_id,
            'entries': [
                {
                    'id': e.id,
                    'context_type': e.context_type.value,
                    'content': e.content,
                    'source_skill': e.source_skill,
                    'relevance_score': e.relevance_score
                }
                for e in self.entries
            ],
            'current_index': self.current_index
        }


class ContextManager:
    """
    Manages context across skill executions.
    
    Key Features:
    1. Persistent context storage
    2. Context chain management
    3. Relevance filtering
    4. Cross-skill context sharing
    5. Context validation
    """
    
    def __init__(self, cache=None, max_chain_size: int = 100):
        self.cache = cache
        self.max_chain_size = max_chain_size
        self.chains: Dict[str, ContextChain] = {}
        self._context_id_counter = 0
    
    def create_context(
        self,
        content: Any,
        context_type: ContextType,
        source_skill: str,
        target_skill: Optional[str] = None,
        ttl_seconds: Optional[int] = 3600,
        metadata: Optional[Dict] = None
    ) -> ContextEntry:
        """Create a new context entry."""
        
        self._context_id_counter += 1
        context_id = f"ctx_{int(time.time()*1000)}_{self._context_id_counter}"
        
        now = datetime.now()
        expires = now + timedelta(seconds=ttl_seconds) if ttl_seconds else None
        
        entry = ContextEntry(
            id=context_id,
            context_type=context_type,
            content=content,
            source_skill=source_skill,
            target_skill=target_skill,
            created_at=now,
            expires_at=expires,
            metadata=metadata or {}
        )
        
        return entry
    
    def add_to_chain(
        self,
        chain_id: str,
        entry: ContextEntry
    ) -> None:
        """Add context entry to a chain."""
        
        if chain_id not in self.chains:
            self.chains[chain_id] = ContextChain(
                chain_id=chain_id,
                max_entries=self.max_chain_size
            )
        
        self.chains[chain_id].add(entry)
        
        # Also cache the chain
        if self.cache:
            self.cache.set(
                f"chain:{chain_id}",
                self.chains[chain_id].to_dict(),
                ttl=86400  # 24 hours
            )
    
    def get_chain(self, chain_id: str) -> Optional[ContextChain]:
        """Get a context chain."""
        
        if chain_id in self.chains:
            return self.chains[chain_id]
        
        # Try to load from cache
        if self.cache:
            data = self.cache.get(f"chain:{chain_id}")
            if data:
                chain = ContextChain(chain_id=chain_id)
                for entry_data in data.get('entries', []):
                    entry = ContextEntry(
                        id=entry_data['id'],
                        context_type=ContextType(entry_data['context_type']),
                        content=entry_data['content'],
                        source_skill=entry_data['source_skill'],
                        target_skill=entry_data.get('target_skill'),
                        created_at=datetime.now(),
                        expires_at=None,
                        relevance_score=entry_data.get('relevance_score', 1.0)
                    )
                    chain.entries.append(entry)
                
                self.chains[chain_id] = chain
                return chain
        
        return None
    
    def get_relevant_context(
        self,
        chain_id: str,
        query: str,
        top_k: int = 10
    ) -> List[Dict]:
        """Get relevant context for a query."""
        
        chain = self.get_chain(chain_id)
        if not chain:
            return []
        
        entries = chain.get_relevant(query, top_k)
        
        return [
            {
                'id': e.id,
                'type': e.context_type.value,
                'content': e.content,
                'source': e.source_skill,
                'relevance': e.relevance_score
            }
            for e in entries
        ]
    
    def share_context(
        self,
        from_chain: str,
        to_chain: str,
        context_id: str
    ) -> bool:
        """Share context between chains."""
        
        source_chain = self.get_chain(from_chain)
        if not source_chain:
            return False
        
        # Find the entry
        for entry in source_chain.entries:
            if entry.id == context_id:
                # Create a copy for target chain
                shared_entry = ContextEntry(
                    id=f"shared_{entry.id}",
                    context_type=ContextType.PEER_MESSAGE,
                    content=entry.content,
                    source_skill=entry.source_skill,
                    target_skill=source_chain.chain_id,
                    created_at=datetime.now(),
                    expires_at=entry.expires_at,
                    metadata={'shared_from': from_chain}
                )
                
                self.add_to_chain(to_chain, shared_entry)
                return True
        
        return False
    
    def validate_context(self, entry: ContextEntry) -> Dict:
        """Validate a context entry."""
        
        issues = []
        
        # Check content
        if entry.content is None:
            issues.append("Content is None")
        
        # Check for hallucination indicators
        content_str = json.dumps(entry.content) if entry.content else ""
        
        hallucination_patterns = [
            "I think",
            "probably",
            "maybe",
            "I believe",
            "could be",
            "might be",
            "not sure",
            "I guess"
        ]
        
        for pattern in hallucination_patterns:
            if pattern.lower() in content_str.lower():
                issues.append(f"Potential hallucination: '{pattern}'")
        
        # Calculate confidence
        confidence = 1.0 - (len(issues) * 0.2)
        
        return {
            'valid': len(issues) == 0,
            'confidence': max(0, confidence),
            'issues': issues
        }
    
    def get_stats(self) -> Dict:
        """Get context statistics."""
        
        total_entries = sum(len(chain.entries) for chain in self.chains.values())
        
        return {
            'total_chains': len(self.chains),
            'total_entries': total_entries,
            'avg_chain_size': total_entries / max(1, len(self.chains))
        }


# Singleton
_context_manager: Optional[ContextManager] = None


def get_context_manager(cache=None) -> ContextManager:
    """Get global context manager."""
    global _context_manager
    if _context_manager is None:
        if cache is None:
            from core.cache import get_cache
            cache = get_cache()
        _context_manager = ContextManager(cache=cache)
    return _context_manager


if __name__ == "__main__":
    # Demo
    cm = ContextManager()
    
    # Create context
    entry = cm.create_context(
        content={"query": "Fix lint error", "file": "test.tsx"},
        context_type=ContextType.USER_INPUT,
        source_skill="user"
    )
    
    # Add to chain
    cm.add_to_chain("session_1", entry)
    
    # Get relevant context
    relevant = cm.get_relevant_context("session_1", "lint error")
    print(f"Relevant: {relevant}")
    
    # Validate
    validation = cm.validate_context(entry)
    print(f"Validation: {validation}")
    
    print(f"Stats: {cm.get_stats()}")
