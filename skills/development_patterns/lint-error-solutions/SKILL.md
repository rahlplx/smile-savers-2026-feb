# Lint Error Solutions

## Overview
Complete ESLint error debugging journey with all attempts and solutions.

## Critical Errors

### 1. react-hooks/set-state-in-effect (95%)
**Failed Attempts:**
1. Direct setState in useEffect ❌
2. Separate effects ❌
3. queueMicrotask ❌
4. External module ❌

**Working Solution:** ✅
```typescript
const [value, setValue] = useState(() => {
  const saved = getStoredPreference('key', defaultValue);
  return saved;
});
```

### 2. react-hooks/exhaustive-deps (90%)
```typescript
// WRONG
useEffect(() => doSomething(props.value), []);

// RIGHT
useEffect(() => doSomething(props.value), [props.value]);
```

### 3. @next/next/no-img-element (95%)
```typescript
// WRONG
<img src="/image.png" alt="description" />

// RIGHT
import Image from 'next/image';
<Image src="/image.png" alt="description" width={500} height={300} />
```

### 4. Hydration Mismatch (88%)
```typescript
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <Skeleton />;
```

## Confidence Scores
| Error | Solution | Confidence |
|-------|----------|------------|
| set-state-in-effect | Lazy init | 95% |
| exhaustive-deps | Add deps | 90% |
| no-img-element | Next Image | 95% |
| hydration-mismatch | Mounted state | 88% |
