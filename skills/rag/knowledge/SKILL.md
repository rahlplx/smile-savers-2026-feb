# Knowledge Base

## Overview
Central knowledge repository for patterns and decisions.

## Structure
```
knowledge/
├── SKILL.md          # This file
├── patterns.json     # Learned patterns
├── decisions.json    # Architecture decisions
└── errors.json       # Error solutions
```

## Code Patterns (Confidence > 0.85)
| Pattern | Solution | Confidence |
|---------|----------|------------|
| lazy_init | useState(() => value) | 95% |
| mounted_state | const [m, s] = useState(false) | 88% |
| glass_effect | backdrop-filter: blur(20px) | 92% |

## Error Solutions
| Error | Failed Attempts | Working Solution |
|-------|-----------------|------------------|
| set-state-in-effect | Direct setState, queueMicrotask | Lazy initialization |
| hydration-mismatch | Direct localStorage | Mounted state pattern |

## Architecture Decisions
| Decision | Rationale |
|----------|-----------|
| SQLite over Redis | Zero cost |
| CSS animations | Performance |
| Free tier first | $0 cost target |
