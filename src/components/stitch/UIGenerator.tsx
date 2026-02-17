'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wand2, Copy, Download, CheckCircle } from 'lucide-react';

interface UIGeneratorProps {
  onGenerate?: (result: string) => void;
}

interface GenerationResult {
  id: string;
  status: 'success' | 'error' | 'pending';
  data?: {
    code?: string;
    preview?: string;
    components?: string[];
  };
  error?: {
    message: string;
  };
}

const PRESET_PROMPTS = [
  {
    label: 'Dental Appointment Form',
    prompt: 'Create a dental appointment booking form with patient name, phone, date picker, time slot selection, and service type dropdown. Use warm teal (#0d9488) as primary color.',
  },
  {
    label: 'Hero Section',
    prompt: 'Create a hero section for a dental practice website with headline, subtext, two CTA buttons, and a circular image placeholder. Mobile responsive.',
  },
  {
    label: 'Service Card Grid',
    prompt: 'Create a 3-column grid of service cards with icon, title, description, and learn more link. Use hover effects and shadows.',
  },
  {
    label: 'Contact Form',
    prompt: 'Create a contact form with name, email, phone, message fields and a submit button. Include form validation states.',
  },
];

export function StitchUIGenerator({ onGenerate }: UIGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [outputFormat, setOutputFormat] = useState<'react' | 'html' | 'figma'>('react');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/stitch/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          outputFormat,
          style: {
            primaryColor: '#0d9488',
            framework: 'next.js',
            deviceTarget: 'responsive',
          },
          accessibility: true,
          responsive: true,
        }),
      });
      
      const data = await response.json();
      setResult(data);
      
      if (data.status === 'success' && onGenerate) {
        onGenerate(data.data?.code || '');
      }
    } catch (error) {
      console.error('Generation error:', error);
      setResult({
        id: '',
        status: 'error',
        error: { message: 'Failed to generate UI. Please try again.' },
      });
    } finally {
      setLoading(false);
    }
  }, [prompt, outputFormat, onGenerate]);

  const handleCopy = useCallback(() => {
    if (result?.data?.code) {
      navigator.clipboard.writeText(result.data.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [result]);

  const handleDownload = useCallback(() => {
    if (result?.data?.code) {
      const blob = new Blob([result.data.code], { type: 'text/typescript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated-component.tsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [result]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            AI UI Generator
            <Badge variant="secondary" className="ml-auto">Powered by Stitch</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Preset Prompts */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Quick Templates</label>
            <div className="flex flex-wrap gap-2">
              {PRESET_PROMPTS.map((preset) => (
                <Button
                  key={preset.label}
                  variant="outline"
                  size="sm"
                  onClick={() => setPrompt(preset.prompt)}
                  className="text-xs"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Main Prompt Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Describe your UI</label>
            <textarea
              placeholder="Example: Create a patient registration form with fields for name, date of birth, phone, email, insurance selection, and a submit button..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full min-h-[150px] p-3 rounded-md border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Output Format Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Output Format</label>
            <div className="flex gap-2">
              {(['react', 'html', 'figma'] as const).map((format) => (
                <Button
                  key={format}
                  variant={outputFormat === format ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setOutputFormat(format)}
                  className="capitalize"
                >
                  {format}
                </Button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate UI
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Generated Code
            {result?.data?.code && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {result?.status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              <p className="font-medium">Error</p>
              <p className="text-sm">{result.error?.message}</p>
            </div>
          )}
          
          {result?.status === 'success' && result.data?.code && (
            <pre className="bg-muted rounded-lg p-4 overflow-auto text-sm max-h-[500px] border">
              <code>{result.data.code}</code>
            </pre>
          )}
          
          {!result && !loading && (
            <div className="text-center py-12 text-muted-foreground">
              <Wand2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Your generated code will appear here</p>
              <p className="text-sm">Enter a prompt and click Generate</p>
            </div>
          )}
          
          {loading && (
            <div className="text-center py-12">
              <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-primary" />
              <p className="text-muted-foreground">Generating your UI...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default StitchUIGenerator;
