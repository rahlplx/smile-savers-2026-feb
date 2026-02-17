# Google OAuth 2.0 Setup for Stitch MCP

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Create Project"** or select existing
3. Name it: `stitch-mcp-integration`
4. Click **Create**

## Step 2: Enable Required APIs

```bash
# Enable APIs via gcloud CLI (optional)
gcloud services enable \
  generativelanguage.googleapis.com \
  cloudaicompanion.googleapis.com
```

Or via Console:
1. Go to **APIs & Services** → **Library**
2. Search for "Generative Language API"
3. Click **Enable**

## Step 3: Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** user type (for personal use)
3. Fill in required fields:
   - App name: `Stitch MCP Client`
   - User support email: Your email
   - Developer contact: Your email
4. Click **Save and Continue**

### Scopes Required

Add these scopes:

```
https://www.googleapis.com/auth/userinfo.profile
https://www.googleapis.com/auth/userinfo.email
https://www.googleapis.com/auth/generative-language.retriever
https://www.googleapis.com/auth/cloud-platform
```

## Step 4: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Application type: **Web application**
4. Name: `Stitch MCP Web Client`

### Authorized JavaScript Origins

```
http://localhost:3000
http://localhost:5173
http://127.0.0.1:3000
```

### Authorized Redirect URIs

```
http://localhost:3000/api/auth/callback/google
http://localhost:5173/callback
http://127.0.0.1:3000/api/auth/callback/google
```

5. Click **Create**
6. **Save the Client ID and Client Secret**

## Step 5: Environment Variables

Create `.env.local`:

```bash
# Google OAuth
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-your-client-secret"
GOOGLE_REDIRECT_URI="http://localhost:3000/api/auth/callback/google"

# Stitch API (obtained after OAuth)
STITCH_ACCESS_TOKEN=""  # Populated after OAuth flow

# Optional: Gemini API Key (alternative auth)
GOOGLE_GEMINI_API_KEY="your-gemini-api-key"
```

## Step 6: OAuth Flow Implementation

### Backend (Next.js API Route)

```typescript
// src/app/api/auth/google/route.ts
import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!;

const SCOPES = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/generative-language.retriever',
  'https://www.googleapis.com/auth/cloud-platform',
];

export async function GET(request: NextRequest) {
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  
  authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', GOOGLE_REDIRECT_URI);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', SCOPES.join(' '));
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');
  
  // CSRF protection
  const state = crypto.randomUUID();
  const response = NextResponse.redirect(authUrl.toString());
  
  response.cookies.set('oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 600, // 10 minutes
    path: '/',
  });
  
  return response;
}
```

### OAuth Callback Handler

```typescript
// src/app/api/auth/callback/google/route.ts
import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  
  // Verify state
  const storedState = request.cookies.get('oauth_state')?.value;
  if (!state || state !== storedState) {
    return NextResponse.json({ error: 'Invalid state' }, { status: 400 });
  }
  
  // Exchange code for tokens
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code: code!,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
  });
  
  if (!tokenResponse.ok) {
    return NextResponse.json({ error: 'Token exchange failed' }, { status: 400 });
  }
  
  const tokens = await tokenResponse.json();
  
  // Store tokens in secure HTTP-only cookies
  const response = NextResponse.redirect(new URL('/dashboard', request.url));
  
  response.cookies.set('google_access_token', tokens.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: tokens.expires_in,
    path: '/',
  });
  
  if (tokens.refresh_token) {
    response.cookies.set('google_refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
  }
  
  return response;
}
```

## Step 7: Token Refresh Logic

```typescript
// src/lib/google-auth.ts
import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export async function refreshAccessToken(refreshToken: string) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }
  
  return response.json();
}

export async function getValidAccessToken(request: NextRequest) {
  let accessToken = request.cookies.get('google_access_token')?.value;
  const refreshToken = request.cookies.get('google_refresh_token')?.value;
  
  if (!accessToken && refreshToken) {
    const tokens = await refreshAccessToken(refreshToken);
    accessToken = tokens.access_token;
    // Update cookie with new access token
  }
  
  return accessToken;
}
```

## Troubleshooting

### Error: "redirect_uri_mismatch"

- Ensure the redirect URI in your code matches exactly what's configured in Google Cloud Console
- Include trailing slashes if configured
- Use `http://` for localhost (not `https://`)

### Error: "access_denied"

- User cancelled the OAuth flow
- Try again and click "Allow" on the consent screen

### Error: "invalid_client"

- Check your Client ID and Client Secret
- Ensure they're correctly set in environment variables

## Security Best Practices

1. **Never expose Client Secret in client-side code**
2. **Use HTTP-only cookies for tokens**
3. **Implement CSRF protection with state parameter**
4. **Use short-lived access tokens** (Google default: 1 hour)
5. **Store refresh tokens securely**
6. **Implement token revocation on logout**

```typescript
// Logout - revoke tokens
export async function revokeTokens(accessToken: string) {
  await fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
    method: 'POST',
  });
}
```
