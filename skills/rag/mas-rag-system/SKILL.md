# MAS-RAG System

## Overview
Multi-Agent Self-Learning RAG with:
- **Deep Document Understanding** (RAGFlow pattern)
- **Dual-Level Retrieval** (LightRAG pattern)
- **Knowledge Graph Integration**
- **Zero-Cost Architecture**

## Architecture
```
DOCUMENT → Layout Detection → Element Extraction → Semantic Chunking
                                                          ↓
                                      Knowledge Graph Building
                                                          ↓
                                      Dual-Level Retrieval
                                      (Vector + Graph)
```

## Deep Document Understanding (RAGFlow)
- Layout detection (tables, headers, sections)
- Multi-modal extraction (text, images, charts)
- Semantic chunking with context preservation

## Dual-Level Retrieval (LightRAG)
- **Low-level**: Vector similarity (specific facts)
- **High-level**: Knowledge graph (abstract concepts)
- Merged and reranked results

## Usage
```python
from mas_rag import MASRAG

rag = MASRAG(cache_path="./cache/rag.db")
doc = rag.ingest("report.pdf")
result = rag.query("What are key findings?")
print(f"Cost: ${result.cost}")  # $0.00
```

## Performance Targets
| Metric | Target |
|--------|--------|
| Retrieval Accuracy | >95% |
| Query Latency | <500ms |
| Cost per 1K Queries | $0.00 |
