# Enterprise RAG System - Complete Usage Guide

## Quick Start

```python
from skills.api import EnterpriseRAG

# Initialize
rag = EnterpriseRAG()

# Query
result = rag.query("Fix the lint error")
print(f"Answer: {result.answer}")
print(f"Cost: ${result.cost}")  # Always $0.00
```

---

## Installation

No external installation required. All modules are self-contained.

Required files:
```
skills/
├── api.py              # Main API entry point
├── core/               # Core infrastructure
│   ├── cache.py        # SQLite caching
│   ├── config.py       # Configuration
│   ├── registry.py     # Skill registry
│   ├── context.py      # Context management
│   ├── hallucination.py # Hallucination prevention
│   ├── thinking.py     # Programmatic thinking
│   └── tools.py        # Tool validation
└── orchestrator/       # Main orchestrator
    └── orchestrator.py
```

---

## Core API

### 1. Single Query

```python
result = rag.query(
    query="Fix the lint error in Component.tsx",
    context={"file": "Component.tsx"}  # Optional context
)

# Result properties
result.query           # Original query
result.answer          # The answer/output
result.confidence      # Confidence score (0-1)
result.skill_used      # Which skill was used
result.model_used      # Which model (cache, gemini, deepseek, local)
result.cost            # Always $0.00
result.duration_ms     # Execution time
result.cache_hit       # Whether result was cached
result.hallucination_level  # Confidence level
```

### 2. Batch Queries

```python
results = rag.batch_query([
    "Fix lint error",
    "Generate a React component",
    "Analyze code quality"
])

for r in results:
    print(f"{r.query}: confidence={r.confidence:.2f}")
```

### 3. Pattern Management

```python
# Get a pattern
pattern = rag.get_pattern("lazy_init")
print(pattern['code'])
print(pattern['confidence'])

# Add a pattern
rag.add_pattern(
    pattern_id="my_pattern",
    code="const [val, setVal] = useState(() => init)",
    description="My custom pattern",
    confidence=0.85,
    tags=["react", "hooks"]
)
```

### 4. Skill Information

```python
# List all skills
skills = rag.list_skills()
for skill in skills:
    print(f"{skill['id']}: {skill['name']}")

# Get specific skill
skill = rag.get_skill("lint-fixer")
print(skill['peer_skills'])      # Related skills
print(skill['dependencies'])     # Required dependencies
```

### 5. System Stats

```python
stats = rag.get_stats()
print(f"Cache entries: {stats['cache']['total_entries']}")
print(f"Skills: {stats['skills']}")
print(f"Thinking processes: {stats['thinking']['total_processes']}")
```

---

## Advanced Usage

### Low-Level Module Access

```python
from core.cache import get_cache, CacheType
from core.hallucination import get_hallucination_preventer
from core.thinking import get_thinking_engine
from core.tools import get_tool_validator

# Direct cache access
cache = get_cache()
cache.set('key', {'data': 'value'}, ttl=3600)
result = cache.get('key')

# Hallucination check
hp = get_hallucination_preventer()
check = hp.check("I think this might be correct...")
print(f"Confidence: {check.confidence}")
print(f"Issues: {check.issues}")

# Programmatic thinking
engine = get_thinking_engine()
result = engine.think("Complex problem to solve")
print(f"Steps: {len(result.steps)}")
print(f"Learnings: {result.learnings}")

# Tool validation
tv = get_tool_validator()
call = tv.create_call('get_pattern', {'pattern_id': 'lazy_init'})
print(f"Valid: {call.status}")
```

---

## Performance

| Metric | Value |
|--------|-------|
| Write throughput | 14,500+ ops/sec |
| Read throughput | 15,600+ ops/sec |
| Cache hit latency | <1ms |
| Full query latency | 5-20ms |
| Cost per 1K queries | $0.00 |

---

## Architecture

```
Query Flow:
===========

User Query
    │
    ▼
┌─────────────────┐
│ Cache Check     │ ← Hit: Return cached result
└────────┬────────┘
         │ Miss
         ▼
┌─────────────────┐
│ Context Manager │ ← Create context chain
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Programmatic    │
│ Thinking Engine │ ← ANALYZE → PLAN → EXECUTE → VERIFY → LEARN
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Hallucination   │
│ Prevention      │ ← Check confidence, detect uncertainty
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Orchestrator    │ ← Select skill, route to free model
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Tool Validator  │ ← Validate tool calls
└────────┬────────┘
         │
         ▼
    Cache Result → Return
```

---

## Available Skills

| Category | Skills |
|----------|--------|
| AI & Media | LLM, VLM, ASR, TTS, image-generation, video-generation |
| Documents | docx, xlsx, pdf, pptx |
| Web | web-search, web-reader, finance |
| Frontend | frontend-design, glassmorphism, accessibility |
| Development | react-patterns, lint-error-solutions, lint-fixer |
| RAG | mas-rag-system, auto-learning-tracker, knowledge |
| Workflow | python-workflow-tools, orchestrator |

---

## Code Patterns

High-confidence patterns in knowledge base:

| Pattern | Confidence | Use Case |
|---------|------------|----------|
| lazy_init | 95% | SSR-safe useState |
| mounted_state | 88% | Client-only rendering |
| error_boundary | 92% | Error handling |
| debounce_hook | 90% | Performance optimization |
| intersection_observer | 88% | Lazy loading |

---

## Error Handling

```python
result = rag.query("Fix error")

if result.confidence < 0.60:
    print("Low confidence - manual review recommended")

if result.hallucination_level == "low":
    print("Output may contain hallucinations")

if result.skill_used == "none":
    print("No skill matched - try different phrasing")
```

---

## Best Practices

1. **Reuse the instance**
   ```python
   rag = EnterpriseRAG()  # Create once
   rag.query("query 1")
   rag.query("query 2")  # Reuse
   ```

2. **Check confidence**
   ```python
   if result.confidence >= 0.85:
       # High confidence - can use directly
   elif result.confidence >= 0.60:
       # Medium - verify output
   else:
       # Low - manual review
   ```

3. **Use batch for multiple queries**
   ```python
   # Faster than individual queries
   results = rag.batch_query([q1, q2, q3])
   ```

4. **Add patterns for your domain**
   ```python
   rag.add_pattern(
       "my_domain_pattern",
       "const pattern = ...",
       "Description",
       0.85
   )
   ```

---

## Troubleshooting

**Q: Cache not persisting?**
A: Check `skills/cache/skills.db` exists and is writable.

**Q: Low confidence scores?**
A: Add more patterns to knowledge base or rephrase query.

**Q: Wrong skill selected?**
A: Use more specific query keywords.

---

## File Locations

```
skills/
├── cache/
│   └── skills.db        # SQLite database (auto-created)
├── rag/
│   └── knowledge/
│       └── patterns.json # Pattern definitions
├── core/
│   └── *.py             # Core modules
├── orchestrator/
│   └── orchestrator.py  # Main orchestrator
├── api.py               # Simple API
└── demo.py              # Full demo
```
