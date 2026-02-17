'use client';

import { cn } from '@/lib/utils';

interface GridPatternProps {
  className?: string;
  size?: number;
  lineWidth?: number;
  color?: string;
  opacity?: number;
  dashArray?: string;
}

export function GridPattern({
  className,
  size = 40,
  lineWidth = 1,
  color = 'currentColor',
  opacity = 0.05,
  dashArray,
}: GridPatternProps) {
  const patternId = `grid-pattern-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      className={cn('absolute inset-0 h-full w-full pointer-events-none', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke={color}
            strokeWidth={lineWidth}
            strokeOpacity={opacity}
            strokeDasharray={dashArray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

// Subtle grid for hero sections
export function HeroGridPattern({ className }: { className?: string }) {
  return (
    <GridPattern
      className={className}
      size={60}
      lineWidth={0.5}
      color="#0d9488"
      opacity={0.08}
    />
  );
}
