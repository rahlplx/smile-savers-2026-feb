# Google Stitch MCP Skill

## Overview

Google Stitch is an AI-powered text-to-UI generation tool that converts natural language prompts into production-ready UI code. This skill integrates Stitch via MCP (Model Context Protocol) for seamless UI generation within the Enterprise RAG System.

## Capabilities

| Feature | Description | Output Format |
|---------|-------------|---------------|
| Text-to-UI | Generate UI from text prompts | React, HTML, Figma, Flutter |
| Image-to-UI | Convert wireframes/sketches to code | React, HTML, Figma |
| Design Refinement | Iterate on existing designs | Updated code |
| Template System | Pre-built UI templates | Customizable components |

## Configuration

### API Key Setup

1. Visit [Google Stitch Settings](https://stitch.withgoogle.com/settings)
2. Navigate to "API key" section
3. Click "Create key" button
4. Store key securely in environment variable

### Environment Variables

```bash
GOOGLE_STITCH_API_KEY=your_api_key_here
```

### Usage Limits

| Resource | Limit | Notes |
|----------|-------|-------|
| Daily Credits | 400 | Main generation quota |
| Daily Redesign Credits | 15 | Iteration/refinement quota |
| API Keys | Multiple | Abuse auto-detection enabled |

## Integration

### Basic Usage

```typescript
import { createStitchClient } from '@/lib/stitch-mcp';

const client = createStitchClient({
  apiKey: process.env.GOOGLE_STITCH_API_KEY,
});

// Generate UI from prompt
const result = await client.generateUI({
  prompt: 'Create a modern dental appointment booking form',
  outputFormat: 'react',
  style: {
    primaryColor: '#2563eb',
    deviceTarget: 'responsive',
  },
});
```

### Generate from Image

```typescript
// Convert wireframe to code
const result = await client.generateFromImage(imageBase64, {
  outputFormat: 'react',
  style: {
    framework: 'next.js',
  },
});
```

### MCP Protocol Integration

```typescript
import { StitchMCPClient } from '@/download/google-stitch-mcp-integration/stitch-mcp-client';

const mcpClient = new StitchMCPClient({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/callback',
});

await mcpClient.connect();
const design = await mcpClient.generateDesign({
  prompt: 'Healthcare dashboard with patient cards',
  style: 'professional',
  platform: 'web',
});
```

## API Reference

### GenerateOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| prompt | string | required | Text description of UI |
| outputFormat | enum | 'react' | Output format (react, html, figma, flutter) |
| style.primaryColor | string | optional | Primary brand color |
| style.framework | enum | optional | Target framework |
| style.deviceTarget | enum | optional | Device target (mobile, web, tablet, responsive) |
| accessibility | boolean | true | Include accessibility features |
| responsive | boolean | true | Generate responsive design |

### StitchResponse

```typescript
interface StitchResponse {
  id: string;
  status: 'success' | 'error' | 'pending';
  data?: {
    code?: string;
    design?: string;
    preview?: string;
    components?: string[];
  };
  error?: {
    code: string;
    message: string;
  };
  metadata?: {
    generatedAt: string;
    model: string;
    tokensUsed: number;
  };
}
```

## Best Practices

### Prompt Engineering

1. **Be Specific**: Include component types, layouts, and functionality
2. **Include Context**: Mention brand colors, target users, use case
3. **Specify Device**: Mobile vs desktop layouts differ significantly
4. **Accessibility**: Always enable for production apps

### Example Prompts

```
Good: "Create a responsive dental clinic landing page with hero section,
service cards, and appointment CTA. Use calming blue colors (#3B82F6)
and include patient testimonials carousel."

Better: "Generate a modern healthcare dashboard for dental clinic staff
showing: today's appointments (card list), patient queue (number badge),
revenue metrics (chart), and quick actions (buttons). Style: professional,
primary color #2563eb, responsive for tablet and desktop."
```

## Error Handling

```typescript
try {
  const result = await client.generateUI(options);
  if (result.status === 'error') {
    console.error('Generation failed:', result.error?.message);
  }
} catch (error) {
  if (error.message.includes('401')) {
    // Invalid API key
  } else if (error.message.includes('429')) {
    // Rate limited - check daily credits
  }
}
```

## Integration with RAG System

This skill integrates with the Enterprise RAG System:

| Integration Point | Usage |
|-------------------|-------|
| Cache | Generated designs cached by prompt hash |
| Registry | Auto-discovered via skill-manifest.json |
| Orchestrator | Triggered by 'design' and 'UI' keywords |
| Knowledge | Design patterns stored in knowledge base |

## Security Notes

1. **API Key Protection**: Never expose API keys in client-side code
2. **Abuse Detection**: Google automatically disables publicly exposed keys
3. **Rate Limiting**: Implement request queuing for high-volume usage
4. **Environment Variables**: Use secure environment variable storage

## Related Skills

- `frontend-design`: General frontend design patterns
- `react-patterns`: SSR-safe React patterns
- `mas-rag-system`: RAG integration for design knowledge
