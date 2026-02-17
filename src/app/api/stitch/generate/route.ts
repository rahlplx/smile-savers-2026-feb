/**
 * Google Stitch MCP API Route
 * ============================
 * 
 * This route handles UI generation requests using Google Stitch MCP.
 * The API key is read from environment variables (never hardcoded).
 */

import { NextRequest, NextResponse } from 'next/server';
import { createStitchClient, GenerateOptionsSchema } from '@/lib/stitch-mcp';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate input
    const validationResult = GenerateOptionsSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid request', 
          details: validationResult.error.issues 
        },
        { status: 400 }
      );
    }

    // Create Stitch client (reads API key from env)
    const stitchClient = createStitchClient();

    // Generate UI
    const result = await stitchClient.generateUI(validationResult.data);

    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Stitch API error:', error);
    
    if (error instanceof Error) {
      // Check for API key error
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'API configuration error', message: error.message },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: 'Generation failed', message: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Unknown error occurred' },
      { status: 500 }
    );
  }
}

// Handle image-based generation
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, ...options } = body;

    if (!image) {
      return NextResponse.json(
        { error: 'Image is required for this endpoint' },
        { status: 400 }
      );
    }

    const stitchClient = createStitchClient();
    const result = await stitchClient.generateFromImage(image, options);

    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Stitch image generation error:', error);
    return NextResponse.json(
      { error: 'Image generation failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
