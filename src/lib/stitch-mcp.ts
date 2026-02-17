/**
 * Google Stitch MCP Integration
 * ===============================
 * 
 * What is MCP?
 * MCP (Model Context Protocol) is a protocol for connecting AI models to external tools.
 * Google Stitch uses MCP for text-to-UI generation.
 * 
 * What can Stitch do?
 * - Generate UI designs from text prompts
 * - Convert wireframes/sketches to polished designs
 * - Export to Figma or code
 * 
 * Documentation: https://stitch.withgoogle.com/docs/mcp/setup/
 */

import { z } from 'zod';

// Configuration schema
const StitchConfigSchema = z.object({
  apiKey: z.string().min(1, 'API key is required'),
  apiUrl: z.string().url().default('https://stitch.withgoogle.com/api/mcp/v1'),
  timeout: z.number().default(30000),
});

export type StitchConfig = z.infer<typeof StitchConfigSchema>;

// Generation options schema
export const GenerateOptionsSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  outputFormat: z.enum(['react', 'html', 'figma', 'flutter']).default('react'),
  style: z.object({
    primaryColor: z.string().optional(),
    secondaryColor: z.string().optional(),
    framework: z.enum(['next.js', 'react', 'vue', 'angular']).optional(),
    deviceTarget: z.enum(['mobile', 'web', 'tablet', 'responsive']).optional(),
  }).optional(),
  components: z.array(z.string()).optional(),
  accessibility: z.boolean().default(true),
  responsive: z.boolean().default(true),
});

export type GenerateOptions = z.infer<typeof GenerateOptionsSchema>;

// Response schema
export interface StitchResponse {
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

/**
 * Google Stitch MCP Client
 */
export class StitchMCPClient {
  private config: StitchConfig;

  constructor(config: Partial<StitchConfig>) {
    // Get API key from environment if not provided
    const apiKey = config.apiKey || process.env.GOOGLE_STITCH_API_KEY;
    
    this.config = StitchConfigSchema.parse({
      ...config,
      apiKey,
    });

    if (!this.config.apiKey || this.config.apiKey === 'your_api_key_here') {
      throw new Error(
        'Google Stitch API key is required. Set GOOGLE_STITCH_API_KEY environment variable.'
      );
    }
  }

  /**
   * Generate UI from text prompt
   */
  async generateUI(options: GenerateOptions): Promise<StitchResponse> {
    const validatedOptions = GenerateOptionsSchema.parse(options);

    const response = await fetch(`${this.config.apiUrl}/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedOptions),
      signal: AbortSignal.timeout(this.config.timeout),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        `Stitch API error: ${response.status} - ${error.message || response.statusText}`
      );
    }

    return response.json();
  }

  /**
   * Generate UI from sketch/image
   */
  async generateFromImage(imageBase64: string, options: Omit<GenerateOptions, 'prompt'>): Promise<StitchResponse> {
    const response = await fetch(`${this.config.apiUrl}/generate-from-image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageBase64,
        ...options,
      }),
      signal: AbortSignal.timeout(this.config.timeout),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        `Stitch API error: ${response.status} - ${error.message || response.statusText}`
      );
    }

    return response.json();
  }

  /**
   * List available templates
   */
  async listTemplates(): Promise<{ id: string; name: string; description: string }[]> {
    const response = await fetch(`${this.config.apiUrl}/templates`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch templates: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get generation status
   */
  async getStatus(generationId: string): Promise<StitchResponse> {
    const response = await fetch(`${this.config.apiUrl}/status/${generationId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get status: ${response.statusText}`);
    }

    return response.json();
  }
}

// Export singleton instance creator
export function createStitchClient(config?: Partial<StitchConfig>): StitchMCPClient {
  return new StitchMCPClient(config || {});
}

// Default export
export default StitchMCPClient;
