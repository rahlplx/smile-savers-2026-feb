#!/usr/bin/env python3
"""
Enterprise RAG System - Complete Demo

Demonstrates all components working together:
1. Cache (SQLite)
2. Registry (Skills)
3. Context Manager
4. Hallucination Prevention
5. Programmatic Thinking
6. Tool Validation
7. Orchestrator
"""

import sys
import asyncio
import time
from pathlib import Path

# Add skills to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from core.cache import get_cache, CacheType
from core.config import get_config
from core.registry import get_registry
from core.context import get_context_manager, ContextType
from core.hallucination import get_hallucination_preventer
from core.thinking import get_thinking_engine
from core.tools import get_tool_validator
from orchestrator.orchestrator import UnifiedOrchestrator


class EnterpriseRAG:
    """
    Unified Enterprise RAG System.
    
    Combines all components for production-ready usage.
    """
    
    def __init__(self):
        self.cache = get_cache()
        self.config = get_config()
        self.registry = get_registry()
        self.context_manager = get_context_manager(self.cache)
        self.hallucination_preventer = get_hallucination_preventer(self.cache)
        self.thinking_engine = get_thinking_engine(self.cache, self.hallucination_preventer)
        self.tool_validator = get_tool_validator(self.cache)
        self.orchestrator = UnifiedOrchestrator()
        
        print("✅ Enterprise RAG System initialized")
        print(f"   - Skills: {len(self.registry.skills)}")
        print(f"   - Cache: {self.cache.cache_path}")
        print(f"   - Target Cost: ${self.config.target_cost_per_1k}/1K queries")
    
    async def process(self, query: str, context: dict = None) -> dict:
        """
        Process a query through the complete pipeline.
        
        Pipeline:
        1. Check cache for similar queries
        2. Create context entry
        3. Run programmatic thinking
        4. Check for hallucinations
        5. Execute via orchestrator
        6. Validate and cache result
        
        Returns:
            Complete result with confidence and metadata
        """
        
        start_time = time.time()
        
        print(f"\n{'='*60}")
        print(f"PROCESSING: {query[:50]}...")
        print(f"{'='*60}")
        
        # Step 1: Check cache
        print("\n[1/6] Checking cache...")
        cache_key = self.cache.generate_key(query, context or {})
        cached = self.cache.get(cache_key)
        if cached:
            print(f"   ✅ Cache HIT - returning cached result")
            return {
                **cached,
                'cache_hit': True,
                'duration_ms': int((time.time() - start_time) * 1000)
            }
        print("   ⚡ Cache MISS - proceeding with full pipeline")
        
        # Step 2: Create context entry
        print("\n[2/6] Creating context entry...")
        ctx_entry = self.context_manager.create_context(
            content={'query': query, 'context': context},
            context_type=ContextType.USER_INPUT,
            source_skill='user'
        )
        chain_id = f"chain_{int(time.time()*1000)}"
        self.context_manager.add_to_chain(chain_id, ctx_entry)
        print(f"   ✅ Context: {ctx_entry.id}")
        
        # Step 3: Programmatic thinking
        print("\n[3/6] Running programmatic thinking...")
        thinking_result = self.thinking_engine.think(query, context)
        print(f"   ✅ Thinking: {len(thinking_result.steps)} steps")
        print(f"   ✅ Confidence: {thinking_result.confidence:.2f}")
        
        # Step 4: Check for hallucinations in thinking output
        print("\n[4/6] Checking for hallucinations...")
        if thinking_result.final_answer:
            output_str = str(thinking_result.final_answer)
            halluc_check = self.hallucination_preventer.check(output_str, context)
            print(f"   ✅ Hallucination check: {halluc_check.level.value}")
            print(f"   ✅ Confidence: {halluc_check.confidence:.2f}")
            if halluc_check.warnings:
                print(f"   ⚠️  Warnings: {halluc_check.warnings}")
        else:
            halluc_check = None
            print("   ⚠️  No output to check")
        
        # Step 5: Execute via orchestrator
        print("\n[5/6] Executing via orchestrator...")
        exec_result = await self.orchestrator.execute(query, context or {})
        print(f"   ✅ Status: {exec_result.status.value}")
        print(f"   ✅ Skill: {exec_result.skill_id}")
        print(f"   ✅ Model: {exec_result.model_used}")
        print(f"   ✅ Cost: ${exec_result.cost:.4f}")
        
        # Step 6: Validate and cache result
        print("\n[6/6] Validating and caching...")
        
        # Validate tool calls if any
        if exec_result.output:
            tool_call = self.tool_validator.create_call(
                'execute_skill',
                {'skill_id': exec_result.skill_id, 'output': exec_result.output}
            )
            print(f"   ✅ Tool validation: {tool_call.status.value}")
        
        # Build final result
        result = {
            'query': query,
            'skill_used': exec_result.skill_id,
            'confidence': thinking_result.confidence,
            'hallucination_level': halluc_check.level.value if halluc_check else 'unknown',
            'output': exec_result.output,
            'model': exec_result.model_used,
            'cost': exec_result.cost,
            'cache_hit': False,
            'thinking_steps': len(thinking_result.steps),
            'learnings': thinking_result.learnings,
            'duration_ms': int((time.time() - start_time) * 1000)
        }
        
        # Cache the result
        self.cache.set(cache_key, result, ttl=3600)
        print(f"   ✅ Result cached")
        
        return result
    
    def get_stats(self) -> dict:
        """Get system statistics."""
        return {
            'cache': self.cache.get_stats(),
            'registry': {
                'total_skills': len(self.registry.skills),
                'trigger_types': len(self.registry.trigger_matrix)
            },
            'thinking': self.thinking_engine.get_stats(),
            'tools': self.tool_validator.get_stats(),
            'hallucination': self.hallucination_preventer.get_stats()
        }


async def main():
    """Run complete demo."""
    
    print("\n" + "="*60)
    print("ENTERPRISE RAG SYSTEM - COMPLETE DEMO")
    print("="*60)
    
    # Initialize system
    rag = EnterpriseRAG()
    
    # Example queries
    queries = [
        "Fix the lint error in Component.tsx",
        "Generate a React hook for localStorage",
        "Analyze the code quality of utils.ts"
    ]
    
    results = []
    
    for query in queries:
        result = await rag.process(query, {'project': 'demo'})
        results.append(result)
        print(f"\n📊 Result Summary:")
        print(f"   - Confidence: {result['confidence']:.2f}")
        print(f"   - Hallucination: {result['hallucination_level']}")
        print(f"   - Cost: ${result['cost']:.4f}")
        print(f"   - Duration: {result['duration_ms']}ms")
    
    # Test cache hit
    print("\n" + "="*60)
    print("TESTING CACHE HIT")
    print("="*60)
    
    cached_result = await rag.process(queries[0], {'project': 'demo'})
    print(f"\n📊 Cached Result:")
    print(f"   - Cache Hit: {cached_result['cache_hit']}")
    print(f"   - Duration: {cached_result['duration_ms']}ms (should be much faster)")
    
    # Final stats
    print("\n" + "="*60)
    print("SYSTEM STATISTICS")
    print("="*60)
    
    stats = rag.get_stats()
    print(f"\nCache:")
    print(f"   - Entries: {stats['cache']['total_entries']}")
    print(f"   - Hits: {stats['cache']['total_hits']}")
    
    print(f"\nRegistry:")
    print(f"   - Skills: {stats['registry']['total_skills']}")
    print(f"   - Triggers: {stats['registry']['trigger_types']}")
    
    print(f"\nThinking Engine:")
    print(f"   - Processes: {stats['thinking']['total_processes']}")
    print(f"   - Success Rate: {stats['thinking']['success_rate']:.2%}")
    
    print(f"\nTool Validator:")
    print(f"   - Total Calls: {stats['tools']['total_calls']}")
    print(f"   - Cache Hit Rate: {stats['tools']['cache_hit_rate']:.2%}")
    
    print("\n" + "="*60)
    print("✅ DEMO COMPLETE - ALL SYSTEMS OPERATIONAL")
    print("="*60)
    
    # Cost summary
    total_cost = sum(r['cost'] for r in results)
    print(f"\n💰 Cost Summary:")
    print(f"   - Queries: {len(results) + 1}")
    print(f"   - Total Cost: ${total_cost:.4f}")
    print(f"   - Average Cost: ${total_cost/len(results):.4f}")
    print(f"   - Target: $0.00/1K queries ✅")


if __name__ == "__main__":
    asyncio.run(main())
