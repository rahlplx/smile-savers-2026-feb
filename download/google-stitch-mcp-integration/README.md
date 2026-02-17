# Google Stitch MCP Integration Guide

## Overview

Google Stitch supports **MCP (Model Context Protocol)** which allows AI assistants like Claude, Cursor, and local models to interact with Stitch programmatically.

## What is MCP?

Model Context Protocol (MCP) is an open protocol that enables AI models to:
- Connect to external tools and services
- Generate UI designs programmatically
- Export designs to code
- Integrate with design workflows

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    GOOGLE STITCH MCP ARCHITECTURE                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐                    │
│  │ YOUR AI      │────▶│ MCP CLIENT   │────▶│ GOOGLE       │                    │
│  │ (Ollama/LLM) │     │ (Local)      │     │ STITCH       │                    │
│  └──────────────┘     └──────────────┘     └──────────────┘                    │
│         │                    │                    │                             │
│         │                    │                    │                             │
│         ▼                    ▼                    ▼                             │
│  ┌──────────────────────────────────────────────────────────────────────────┐  │
│  │                                                                          │  │
│  │  AUTHENTICATION FLOW:                                                    │  │
│  │  1. User initiates OAuth via Google Account                             │  │
│  │  2. Google returns access token                                         │  │
│  │  3. MCP client uses token for Stitch API calls                          │  │
│  │  4. Generate designs, export code                                       │  │
│  │                                                                          │  │
│  └──────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Quick Start

### Step 1: Install MCP Client

```bash
# Using npm
npm install @anthropic-ai/mcp-client

# Or using bun
bun add @anthropic-ai/mcp-client
```

### Step 2: Configure Google OAuth

See `oauth-setup.md` for detailed OAuth configuration.

### Step 3: Create MCP Configuration

See `mcp-config.json` for the Stitch MCP server configuration.

### Step 4: Use with Your AI

See `usage-examples.md` for code examples.

## Files in This Package

| File | Purpose |
|------|---------|
| `README.md` | This overview file |
| `oauth-setup.md` | Google OAuth 2.0 setup guide |
| `mcp-config.json` | MCP server configuration |
| `stitch-mcp-client.ts` | TypeScript client implementation |
| `usage-examples.md` | Code examples and patterns |
| `api-reference.md` | Stitch API reference |
| `prompts-library.md` | Pre-built prompts for design generation |

## Requirements

- Node.js 18+ or Bun runtime
- Google Cloud account (free tier works)
- Google Stitch access (sign up at stitch.withgoogle.com)

## Limitations

| Limit | Value |
|-------|-------|
| Daily generations | 100/day (free) |
| Concurrent requests | 5 |
| Max image upload | 10MB |
| Output formats | HTML/CSS, React, Figma |

## Support

- Documentation: https://stitch.withgoogle.com/docs
- MCP Docs: https://stitch.withgoogle.com/docs/mcp
- Community: https://discord.gg/google-stitch
