'use client';

import { cn } from '@/lib/utils';

interface WavePatternProps {
  className?: string;
  color?: string;
  opacity?: number;
  animated?: boolean;
}

export function WavePattern({
  className,
  color = '#0d9488',
  opacity = 0.05,
  animated = false,
}: WavePatternProps) {
  const patternId = `wave-pattern-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      className={cn(
        'absolute inset-0 h-full w-full pointer-events-none overflow-hidden',
        animated && 'animate-float',
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`${patternId}-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity={opacity} />
          <stop offset="50%" stopColor={color} stopOpacity={opacity * 0.5} />
          <stop offset="100%" stopColor={color} stopOpacity={opacity} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${patternId}-gradient)`}
        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
  );
}

// Decorative wave for section dividers
export function WaveDivider({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      className={cn(
        'absolute bottom-0 left-0 right-0 w-full h-16 pointer-events-none',
        flip && 'rotate-180',
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
    >
      <path
        fill="#fafaf9"
        d="M0,50L60,55C120,60,240,70,360,65C480,60,600,40,720,35C840,30,960,40,1080,50C1200,60,1320,70,1380,75L1440,80L1440,100L0,100Z"
      />
    </svg>
  );
}
