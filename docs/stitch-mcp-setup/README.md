# Google Stitch MCP Integration - Complete Setup

## ✅ Setup Complete!

Your Google Stitch MCP integration is now ready. Here's what was created:

### Files Created

| File | Purpose |
|------|---------|
| `src/lib/stitch-mcp.ts` | Stitch MCP client library with TypeScript types |
| `src/app/api/stitch/generate/route.ts` | Server-side API endpoint (keeps API key secure) |
| `src/components/stitch/UIGenerator.tsx` | React component for UI generation |
| `.env.local` | Your API key (SECURE, gitignored) |
| `.gitignore` | Updated to exclude .env.local |
| `.env.stitch.example` | Template for environment variables |
| `docs/stitch-mcp-setup/SETUP.md` | Setup documentation |

## 🔐 Security Status

```
✅ API key stored in .env.local
✅ .env.local added to .gitignore
✅ API key NEVER sent to client
✅ API key NEVER committed to Git
✅ Server-side API endpoint only
```

## 🚀 How to Use

### Option 1: Use the UI Component

Add the UIGenerator to any page:

```tsx
import { StitchUIGenerator } from '@/components/stitch/UIGenerator';

export default function DesignPage() {
  return (
    <div className="container py-8">
      <StitchUIGenerator />
    </div>
  );
}
```

### Option 2: Use the API Directly

```typescript
// From any client component
const response = await fetch('/api/stitch/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Create a dental appointment form',
    outputFormat: 'react',
    style: {
      primaryColor: '#0d9488',
      framework: 'next.js',
    },
  }),
});

const { data } = await response.json();
console.log(data.code); // Generated React code
```

### Option 3: Use with Local AI (Ollama)

```typescript
// Your local AI creates prompts, Stitch generates UI
import { createStitchClient } from '@/lib/stitch-mcp';

async function generateWithLocalAI(userRequest: string) {
  // 1. Use Ollama to create detailed prompt
  const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    body: JSON.stringify({
      model: 'qwen2.5-coder:1.5b',
      prompt: `Convert this request to a UI prompt: ${userRequest}`,
    }),
  });
  
  const { response: detailedPrompt } = await ollamaResponse.json();
  
  // 2. Generate with Stitch
  const client = createStitchClient();
  const design = await client.generateUI({
    prompt: detailedPrompt,
    outputFormat: 'react',
  });
  
  return design;
}
```

## 📋 API Reference

### POST /api/stitch/generate

**Request Body:**
```typescript
{
  prompt: string;           // Required: UI description
  outputFormat?: 'react' | 'html' | 'figma';
  style?: {
    primaryColor?: string;
    secondaryColor?: string;
    framework?: 'next.js' | 'react' | 'vue';
    deviceTarget?: 'mobile' | 'web' | 'responsive';
  };
  accessibility?: boolean;
  responsive?: boolean;
}
```

**Response:**
```typescript
{
  id: string;
  status: 'success' | 'error';
  data?: {
    code?: string;
    preview?: string;
    components?: string[];
  };
  error?: { message: string };
}
```

## 🎯 Example Prompts

### For Dental Website

```
Create a dental appointment booking form with:
- Patient name and phone fields
- Date picker for appointment
- Time slot dropdown (9am-5pm)
- Service type selection (cleaning, whitening, etc.)
- Insurance selection dropdown
- Submit button with teal (#0d9488) color
- Mobile responsive design
- Form validation states
```

```
Create a hero section for a dental practice:
- Large headline "Your Smile, Our Priority"
- Subtext about family dentistry
- Two CTA buttons: "Book Now" and "Call Us"
- Circular image placeholder for dentist photo
- Teal primary color with coral accent
- Animated entrance effects
```

```
Create a testimonials carousel:
- Card-based design with patient photos
- Star ratings display
- Quote text with patient name
- Navigation arrows
- Auto-scroll with pause on hover
- Mobile swipe support
```

## 🔄 Integration with Your Workflow

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    AI-POWERED UI WORKFLOW                                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  User Request                                                                   │
│      │                                                                          │
│      ▼                                                                          │
│  ┌──────────────────┐                                                          │
│  │ Local AI (Ollama)│ ── Generate detailed prompt                              │
│  │ Qwen2.5-Coder    │                                                          │
│  └──────────────────┘                                                          │
│      │                                                                          │
│      ▼                                                                          │
│  ┌──────────────────┐                                                          │
│  │ Google Stitch    │ ── Generate UI code                                       │
│  │ MCP API          │                                                          │
│  └──────────────────┘                                                          │
│      │                                                                          │
│      ▼                                                                          │
│  ┌──────────────────┐                                                          │
│  │ Your Next.js     │ ── Apply to project                                       │
│  │ Project          │                                                          │
│  └──────────────────┘                                                          │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 📊 Rate Limits (Free Tier)

| Limit | Value |
|-------|-------|
| Generations/day | 100 |
| Concurrent requests | 5 |
| Max prompt length | 2000 chars |
| Image upload size | 10MB |

## 🛠 Troubleshooting

### "API key is required" Error

1. Check `.env.local` exists: `cat .env.local`
2. Verify key format (no quotes, no spaces)
3. Restart dev server after changes

### Generation Fails

1. Check API key is valid
2. Verify network connectivity
3. Try shorter prompt
4. Check console for detailed errors

### Need Help?

- Google Stitch Docs: https://stitch.withgoogle.com/docs
- MCP Protocol: https://modelcontextprotocol.io
- GitHub Issues: Report any bugs found
