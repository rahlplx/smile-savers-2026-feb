# Enterprise RAG System - Usage Examples

## Quick Start

```python
import sys
sys.path.insert(0, 'skills')

from core.cache import get_cache
from core.config import get_config
from core.registry import get_registry
from orchestrator.orchestrator import UnifiedOrchestrator
import asyncio
```

## 1. Cache Operations

```python
from core.cache import get_cache, CacheType

# Initialize cache
cache = get_cache()

# Store data
cache.set('my_key', {'data': 'value'})

# Retrieve data
result = cache.get('my_key')
print(result)  # {'data': 'value'}

# Store with TTL
cache.set('temp_key', 'expires_soon', ttl=60)  # 60 seconds

# Store different types
cache.set('pattern_1', {...}, cache_type='pattern')    # 7 days TTL
cache.set('exec_1', {...}, cache_type='execution')     # 24 hours TTL
cache.set('metric_1', {...}, cache_type='metrics')     # 1 hour TTL

# Get statistics
stats = cache.get_stats()
print(f"Total entries: {stats['total_entries']}")
```

## 2. Registry Operations

```python
from core.registry import get_registry

# Initialize registry
registry = get_registry()

# Get skill info
skill = registry.get_skill('LLM')
print(f"Skill: {skill.name}, Category: {skill.category}")

# Match triggers
matches = registry.match_trigger('Fix lint error', 'react component')
for match in matches:
    print(f"Matched: {match['skill_id']} (confidence: {match['confidence']})")

# Get peer skills
peers = registry.get_peer_skills('lint-fixer')
print(f"Peers: {peers}")

# Resolve dependencies
deps = registry.resolve_dependencies('lint-fixer')
print(f"Load order: {deps}")
```

## 3. Orchestrator Execution

```python
from orchestrator.orchestrator import UnifiedOrchestrator
import asyncio

async def main():
    orchestrator = UnifiedOrchestrator()
    
    # Execute a task
    result = await orchestrator.execute(
        intent='Fix the lint error',
        context={'file': 'Component.tsx', 'error': 'set-state-in-effect'}
    )
    
    print(f"Status: {result.status.value}")
    print(f"Skill: {result.skill_id}")
    print(f"Confidence: {result.confidence:.2f}")
    print(f"Cost: ${result.cost:.4f}")  # Should be $0.00
    print(f"Model: {result.model_used}")

asyncio.run(main())
```

## 4. Peer Communication

```python
async def peer_example():
    orchestrator = UnifiedOrchestrator()
    
    # Request pattern from peer skill
    result = await orchestrator.peer_request(
        from_skill='lint-fixer',
        to_skill='react-patterns',
        request_type='get_pattern',
        payload={'pattern': 'lazy_init'}
    )
    
    print(f"Pattern: {result['code']}")
    print(f"Confidence: {result['confidence']}")

asyncio.run(peer_example())
```

## 5. Batch Execution

```python
async def batch_example():
    orchestrator = UnifiedOrchestrator()
    
    tasks = [
        {'intent': 'Analyze code', 'context': {'file': 'app.tsx'}},
        {'intent': 'Fix lint error', 'context': {'file': 'utils.ts'}},
        {'intent': 'Generate docs', 'context': {'file': 'lib.ts'}}
    ]
    
    results = await orchestrator.batch_execute(tasks)
    
    for task_id, result in results.items():
        print(f"{task_id}: {result.status.value}, Cost: ${result.cost}")

asyncio.run(batch_example())
```

## 6. Pattern Retrieval from Cache

```python
from core.cache import get_cache

cache = get_cache()

# Get a pattern
pattern = cache.get('pattern:react_lazy_init')
if pattern:
    print(f"Pattern: {pattern['name']}")
    print(f"Code:\n{pattern['code']}")
    print(f"Confidence: {pattern['confidence']}")
```

## 7. Configuration

```python
from core.config import get_config, SkillsConfig

# Get default config
config = get_config()
print(f"Cache enabled: {config.cache_enabled}")
print(f"Target cost: ${config.target_cost_per_1k}")

# Create custom config
custom = SkillsConfig(
    cache_path='/custom/path/cache.db',
    gemini_daily_limit=3000,
    target_cache_hit_rate=0.95
)
```

## 8. Metrics Collection

```python
async def metrics_example():
    orchestrator = UnifiedOrchestrator()
    
    # Run some executions
    for i in range(5):
        await orchestrator.execute(f'Task {i}', {'index': i})
    
    # Get metrics
    metrics = orchestrator.get_metrics()
    print(f"Total: {metrics['total_executions']}")
    print(f"Success rate: {metrics['success_rate']:.2%}")
    print(f"Cache hit rate: {metrics['cache_hit_rate']:.2%}")
    print(f"Total cost: ${metrics['total_cost']:.4f}")

asyncio.run(metrics_example())
```

## Performance Targets

| Metric | Target | How to Achieve |
|--------|--------|----------------|
| Cache Hit Rate | >90% | Cache all patterns, executions |
| Cost per 1K queries | $0.00 | Use free models + caching |
| Response Time | <500ms | Check cache first, use local models |
| Accuracy | >95% | Dual-level retrieval + peer validation |
