# React Patterns

## Overview
Battle-tested React/Next.js patterns for SSR-safe applications.

## Key Patterns

### 1. Lazy Initialization (95% Confidence)
```typescript
// WRONG: setState in useEffect
useEffect(() => {
  const saved = localStorage.getItem('key');
  setState(saved);  // ❌ Error!
}, []);

// RIGHT: Lazy initialization
const [value, setValue] = useState(() => {
  if (typeof window === 'undefined') return defaultValue;
  return localStorage.getItem('key') || defaultValue;
});
```

### 2. Mounted State Pattern (88% Confidence)
```typescript
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <Skeleton />;
return <ClientContent />;
```

### 3. Safe Window Access
```typescript
const [width, setWidth] = useState(0);
useEffect(() => {
  setWidth(window.innerWidth);
}, []);
```

## Peer Communication
```python
peer_request(
    to_skill="react-patterns",
    request_type="get_pattern",
    payload={"pattern": "lazy_init"}
)
# Returns: {"code": "useState(() => value)", "confidence": 0.95}
```
