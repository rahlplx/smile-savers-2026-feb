# Auto-Learning Tracker

## Overview
Tracks errors, successes, and patterns for continuous improvement.

## Features
- Error pattern tracking with failed attempts
- Success pattern learning
- Confidence calibration
- Zero-cost SQLite storage

## Pattern Storage
```sql
CREATE TABLE patterns (
    id TEXT PRIMARY KEY,
    pattern_type TEXT,
    success_count INTEGER,
    confidence REAL
);
```

## Usage
```python
from auto_learning_tracker import AutoLearningTracker

tracker = AutoLearningTracker()
tracker.track_execution(result)

# Get recommendation
rec = tracker.get_recommendation({"error": "set-state-in-effect"})
# Returns: {"pattern": "lazy_init", "confidence": 0.95}
```

## Key Learnings
| Error | Solution | Confidence |
|-------|----------|------------|
| set-state-in-effect | Lazy initialization | 95% |
| hydration-mismatch | Mounted state | 88% |
