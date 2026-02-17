# Unified Skill Orchestrator

## Overview
Main brain of the RAG system with:
- **Dual-Level Retrieval** (LightRAG)
- **Deep Document Understanding** (RAGFlow)
- **Free Tier Model Routing** (Zero Cost)
- **Peer-to-Peer Communication**

## Trigger Matrix
| Trigger | Primary Skill | Confidence |
|---------|--------------|------------|
| lint | lint-fixer | 0.95 |
| document | docx | 0.90 |
| generate | LLM | 0.85 |
| rag | mas-rag-system | 0.90 |

## Free Tier Router
| Model | Daily Quota | Cost |
|-------|-------------|------|
| Cache | Unlimited | $0 |
| Gemini | 1,500 | $0 |
| DeepSeek | Unlimited | $0 |
| Local | Unlimited | $0 |

## Confidence Formula
```
confidence = 0.35*context + 0.35*history + 0.15*pattern + 0.10*peer - 0.05*log(complexity)
```

## Usage
```python
from orchestrator import UnifiedOrchestrator

orchestrator = UnifiedOrchestrator()
result = await orchestrator.execute("Fix lint error", {"file": "test.tsx"})
print(f"Cost: ${result.cost}")  # $0.00
```
