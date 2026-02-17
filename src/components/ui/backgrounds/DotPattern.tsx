'use client';

import { cn } from '@/lib/utils';

interface DotPatternProps {
  className?: string;
  dotSize?: number;
  gap?: number;
  color?: string;
  opacity?: number;
  animated?: boolean;
}

export function DotPattern({
  className,
  dotSize = 1,
  gap = 20,
  color = 'currentColor',
  opacity = 0.1,
  animated = false,
}: DotPatternProps) {
  const patternId = `dot-pattern-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      className={cn(
        'absolute inset-0 h-full w-full pointer-events-none',
        animated && 'animate-pulse-subtle',
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={gap}
          height={gap}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={dotSize}
            cy={dotSize}
            r={dotSize}
            fill={color}
            opacity={opacity}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

// Healthcare-themed dot pattern variant
export function HealthcareDotPattern({ className }: { className?: string }) {
  return (
    <DotPattern
      className={className}
      dotSize={1.5}
      gap={24}
      color="#0d9488"
      opacity={0.08}
    />
  );
}
