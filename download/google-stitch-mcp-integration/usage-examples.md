# Google Stitch MCP Usage Examples

## Basic Setup

```typescript
import { createStitchClient } from './stitch-mcp-client';

const client = createStitchClient({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: 'http://localhost:3000/api/auth/callback/google',
});

// Set access token from OAuth flow
client.setAccessToken(accessToken);

// Connect to MCP server
await client.connect();
```

## Example 1: Generate a Landing Page

```typescript
const design = await client.generateDesign({
  prompt: `
    Create a dental practice landing page with:
    - Hero section with practice name "Smile Savers"
    - Call-to-action button for booking appointments
    - Services grid showing 6 dental services
    - Testimonials carousel
    - Contact form at bottom
    - Warm, professional color scheme (teal primary)
    - Mobile-responsive design
  `,
  style: 'professional',
  platform: 'web',
  framework: 'react',
});

console.log('Design ID:', design.id);
console.log('Generated Code:', design.code);
```

## Example 2: Generate from Sketch

```typescript
// Upload a wireframe image and generate design
const design = await client.generateFromSketch({
  imagePath: '/path/to/wireframe.png',
  prompt: `
    Convert this wireframe to a modern dental website.
    Use teal (#0d9488) as primary color.
    Add smooth animations and hover effects.
    Make it fully responsive.
  `,
  framework: 'react',
});
```

## Example 3: Export to Code

```typescript
// Export a design to React/TypeScript code
const code = await client.exportDesign({
  designId: 'design-123',
  format: 'react',
  includeStyles: true,
});

// Save to file
fs.writeFileSync('components/GeneratedPage.tsx', code);
```

## Example 4: Refine Existing Design

```typescript
// Make changes to an existing design
const refinedDesign = await client.refineDesign(
  'design-123',
  `
    Changes requested:
    1. Make the hero section taller
    2. Add a floating call button on mobile
    3. Change CTA button color to coral (#ea580c)
    4. Add Spanish language toggle in header
    5. Include insurance acceptance badges
  `
);
```

## Example 5: List All Designs

```typescript
// Get all saved designs
const designs = await client.listDesigns(50, 0);

designs.forEach(design => {
  console.log(`- ${design.id}: ${design.prompt.slice(0, 50)}...`);
});
```

## Integration with Next.js Project

### API Route: Generate Design

```typescript
// src/app/api/stitch/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getValidAccessToken } from '@/lib/google-auth';
import { createStitchClient } from '@/lib/stitch-mcp-client';

export async function POST(request: NextRequest) {
  const accessToken = await getValidAccessToken(request);
  
  if (!accessToken) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }
  
  const { prompt, style, platform, framework } = await request.json();
  
  const client = createStitchClient({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: process.env.GOOGLE_REDIRECT_URI!,
  });
  
  client.setAccessToken(accessToken);
  await client.connect();
  
  try {
    const design = await client.generateDesign({
      prompt,
      style: style || 'modern',
      platform: platform || 'web',
      framework: framework || 'react',
    });
    
    return NextResponse.json({ design });
  } finally {
    await client.disconnect();
  }
}
```

### React Component: Design Generator

```tsx
// src/components/DesignGenerator.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

export function DesignGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/stitch/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          style: 'professional',
          platform: 'web',
          framework: 'react',
        }),
      });
      
      const data = await response.json();
      setGeneratedCode(data.design.code);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Describe the UI you want to generate..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[150px]"
      />
      
      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Design'}
      </Button>
      
      {generatedCode && (
        <Card className="p-4">
          <pre className="overflow-auto text-sm">
            {generatedCode}
          </pre>
        </Card>
      )}
    </div>
  );
}
```

## Integration with Local AI (Ollama)

```typescript
// Use local AI to generate prompts for Stitch
import { StitchMCPClient } from './stitch-mcp-client';

async function generateWithLocalAI(userRequest: string) {
  // Step 1: Use local Ollama to create a detailed prompt
  const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'qwen2.5-coder:1.5b',
      prompt: `
        You are a UI/UX design expert. Convert the following user request
        into a detailed prompt for a UI design tool:
        
        User request: "${userRequest}"
        
        Output a detailed prompt describing:
        1. Layout structure
        2. Color scheme
        3. Typography
        4. Interactive elements
        5. Responsive considerations
      `,
    }),
  });
  
  const ollamaResult = await ollamaResponse.json();
  const detailedPrompt = ollamaResult.response;
  
  // Step 2: Send to Stitch via MCP
  const stitchClient = createStitchClient(config);
  await stitchClient.connect();
  
  const design = await stitchClient.generateDesign({
    prompt: detailedPrompt,
    style: 'modern',
    platform: 'web',
    framework: 'react',
  });
  
  await stitchClient.disconnect();
  
  return design;
}

// Usage
const design = await generateWithLocalAI(
  'Create a dental appointment booking page'
);
```

## Batch Generation

```typescript
// Generate multiple designs at once
async function batchGenerate(prompts: string[]) {
  const client = createStitchClient(config);
  client.setAccessToken(accessToken);
  await client.connect();
  
  const designs = [];
  
  for (const prompt of prompts) {
    try {
      const design = await client.generateDesign({ prompt });
      designs.push(design);
      
      // Rate limiting: wait 2 seconds between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Failed to generate for: ${prompt}`, error);
    }
  }
  
  await client.disconnect();
  return designs;
}

// Usage
const designs = await batchGenerate([
  'Create a hero section for a dental website',
  'Design a services grid with 6 cards',
  'Create a contact form with validation',
  'Design a testimonials carousel',
]);
```

## Webhook Integration

```typescript
// Set up webhook for design completion
import { createHmac } from 'crypto';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('x-stitch-signature');
  
  // Verify webhook signature
  const expectedSignature = createHmac('sha256', process.env.STITCH_WEBHOOK_SECRET!)
    .update(body)
    .digest('hex');
  
  if (signature !== expectedSignature) {
    return new Response('Invalid signature', { status: 401 });
  }
  
  const event = JSON.parse(body);
  
  switch (event.type) {
    case 'design.completed':
      console.log('Design completed:', event.data.design_id);
      // Save to database, notify user, etc.
      break;
      
    case 'design.failed':
      console.error('Design failed:', event.data.error);
      break;
  }
  
  return new Response('OK', { status: 200 });
}
```

## Error Handling

```typescript
import { StitchMCPClient } from './stitch-mcp-client';

async function safeGenerate(client: StitchMCPClient, prompt: string) {
  const maxRetries = 3;
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const design = await client.generateDesign({ prompt });
      return { success: true, design };
    } catch (error: any) {
      lastError = error;
      
      if (error.message.includes('rate limit')) {
        // Wait and retry
        await new Promise(resolve => setTimeout(resolve, 60000 * attempt));
        continue;
      }
      
      if (error.message.includes('authentication')) {
        // Token expired, refresh needed
        throw new Error('Authentication expired. Please re-authenticate.');
      }
      
      // Non-retryable error
      break;
    }
  }
  
  return { 
    success: false, 
    error: lastError?.message || 'Unknown error occurred' 
  };
}
```
