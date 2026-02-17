/**
 * Google Stitch MCP Client
 * TypeScript implementation for connecting to Google Stitch via MCP
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

// Types
export interface StitchDesign {
  id: string;
  prompt: string;
  style: string;
  platform: string;
  created_at: string;
  thumbnail_url?: string;
  code?: string;
}

export interface GenerateDesignOptions {
  prompt: string;
  style?: 'modern' | 'minimal' | 'corporate' | 'playful' | 'professional';
  platform?: 'web' | 'mobile' | 'tablet';
  framework?: 'react' | 'html' | 'vue' | 'figma';
}

export interface GenerateFromSketchOptions {
  imagePath: string;
  prompt?: string;
  framework?: 'react' | 'html' | 'figma';
}

export interface ExportDesignOptions {
  designId: string;
  format: 'react' | 'html' | 'css' | 'figma';
  includeStyles?: boolean;
}

/**
 * Stitch MCP Client
 */
export class StitchMCPClient {
  private client: Client | null = null;
  private accessToken: string | null = null;
  
  constructor(private config: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  }) {}
  
  /**
   * Set the access token (obtained from OAuth flow)
   */
  setAccessToken(token: string) {
    this.accessToken = token;
  }
  
  /**
   * Connect to the MCP server
   */
  async connect(): Promise<void> {
    const transport = new StdioClientTransport({
      command: 'node',
      args: ['stitch-mcp-server.js'],
      env: {
        GOOGLE_CLIENT_ID: this.config.clientId,
        GOOGLE_CLIENT_SECRET: this.config.clientSecret,
        GOOGLE_REDIRECT_URI: this.config.redirectUri,
        GOOGLE_ACCESS_TOKEN: this.accessToken || '',
      },
    });
    
    this.client = new Client(
      { name: 'stitch-mcp-client', version: '1.0.0' },
      { capabilities: {} }
    );
    
    await this.client.connect(transport);
  }
  
  /**
   * Disconnect from the MCP server
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
    }
  }
  
  /**
   * Generate a UI design from text prompt
   */
  async generateDesign(options: GenerateDesignOptions): Promise<StitchDesign> {
    if (!this.client) {
      throw new Error('Not connected to MCP server');
    }
    
    const result = await this.client.callTool({
      name: 'generate_design',
      arguments: {
        prompt: options.prompt,
        style: options.style || 'modern',
        platform: options.platform || 'web',
        framework: options.framework || 'react',
      },
    });
    
    return this.parseDesignResult(result);
  }
  
  /**
   * Generate a UI design from a sketch/wireframe image
   */
  async generateFromSketch(options: GenerateFromSketchOptions): Promise<StitchDesign> {
    if (!this.client) {
      throw new Error('Not connected to MCP server');
    }
    
    const result = await this.client.callTool({
      name: 'generate_from_sketch',
      arguments: {
        image_path: options.imagePath,
        prompt: options.prompt,
        framework: options.framework || 'react',
      },
    });
    
    return this.parseDesignResult(result);
  }
  
  /**
   * Export a design to code
   */
  async exportDesign(options: ExportDesignOptions): Promise<string> {
    if (!this.client) {
      throw new Error('Not connected to MCP server');
    }
    
    const result = await this.client.callTool({
      name: 'export_design',
      arguments: {
        design_id: options.designId,
        format: options.format,
        include_styles: options.includeStyles ?? true,
      },
    });
    
    return this.parseCodeResult(result);
  }
  
  /**
   * List all saved designs
   */
  async listDesigns(limit: number = 20, offset: number = 0): Promise<StitchDesign[]> {
    if (!this.client) {
      throw new Error('Not connected to MCP server');
    }
    
    const result = await this.client.callTool({
      name: 'list_designs',
      arguments: { limit, offset },
    });
    
    return this.parseDesignListResult(result);
  }
  
  /**
   * Refine an existing design
   */
  async refineDesign(designId: string, instructions: string): Promise<StitchDesign> {
    if (!this.client) {
      throw new Error('Not connected to MCP server');
    }
    
    const result = await this.client.callTool({
      name: 'refine_design',
      arguments: {
        design_id: designId,
        instructions,
      },
    });
    
    return this.parseDesignResult(result);
  }
  
  // Private helper methods
  private parseDesignResult(result: any): StitchDesign {
    // Parse the MCP tool result into a StitchDesign object
    const content = result.content?.[0]?.text || '';
    try {
      return JSON.parse(content);
    } catch {
      return {
        id: crypto.randomUUID(),
        prompt: '',
        style: 'modern',
        platform: 'web',
        created_at: new Date().toISOString(),
        code: content,
      };
    }
  }
  
  private parseCodeResult(result: any): string {
    return result.content?.[0]?.text || '';
  }
  
  private parseDesignListResult(result: any): StitchDesign[] {
    const content = result.content?.[0]?.text || '[]';
    try {
      return JSON.parse(content);
    } catch {
      return [];
    }
  }
}

// Export singleton factory
export function createStitchClient(config: {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}): StitchMCPClient {
  return new StitchMCPClient(config);
}
