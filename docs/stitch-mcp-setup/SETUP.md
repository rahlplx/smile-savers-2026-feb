# 🔐 SECURITY FIRST - API Key Setup

## ⚠️ IMPORTANT: Your API Key Security

Your Google Stitch API key should NEVER be:
- Hardcoded in source code
- Committed to Git
- Shared in chat logs
- Exposed in client-side code

## Setting Up Your API Key

### Step 1: Add to Environment Variables

Add this to your `.env.local` file:

```bash
# Google Stitch MCP API Key
GOOGLE_STITCH_API_KEY=your_api_key_here
```

### Step 2: Verify .env.local is in .gitignore

Your `.gitignore` should include:

```
.env.local
.env.*.local
```

### Step 3: Restart Development Server

After adding the environment variable:

```bash
# Stop the dev server (Ctrl+C)
# Then restart
bun run dev
```

## How the Integration Works

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    SECURE API KEY FLOW                                           │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  1. Your Browser                                                                │
│     └── Sends prompt to /api/stitch/generate                                   │
│                                                                                 │
│  2. Next.js Server (Server-Side)                                               │
│     └── Reads API key from process.env.GOOGLE_STITCH_API_KEY                  │
│     └── Makes request to Google Stitch API                                     │
│     └── Returns generated code to browser                                      │
│                                                                                 │
│  3. Your API Key                                                                │
│     └── NEVER leaves the server                                                │
│     └── NEVER visible in browser                                               │
│     └── NEVER committed to Git                                                 │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Files Created

| File | Purpose |
|------|---------|
| `src/lib/stitch-mcp.ts` | Stitch MCP client library |
| `src/app/api/stitch/generate/route.ts` | API endpoint (server-side) |
| `src/components/stitch/UIGenerator.tsx` | UI component |
| `.env.stitch.example` | Environment template |

## Testing the Integration

1. Start your dev server: `bun run dev`
2. Navigate to a page with the UIGenerator component
3. Enter a prompt and click "Generate UI"
4. Check the console for any errors

## Troubleshooting

### Error: "API key is required"

- Verify `.env.local` exists and contains `GOOGLE_STITCH_API_KEY=...`
- Restart the development server
- Check the key has no extra spaces or quotes

### Error: "401 Unauthorized"

- Your API key may be expired or invalid
- Generate a new key from Google Stitch settings

### Error: "CORS error"

- The API endpoint should be server-side only
- Ensure you're calling `/api/stitch/generate` (not external API directly)
