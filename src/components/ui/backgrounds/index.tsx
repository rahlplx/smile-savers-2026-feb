'use client';

import { cn } from '@/lib/utils';
import { DotPattern, HealthcareDotPattern } from './DotPattern';
import { GridPattern, HeroGridPattern } from './GridPattern';
import { WavePattern, WaveDivider } from './WavePattern';
import { GeometricShapes, FloatingOrbs } from './GeometricShapes';
import { GradientMesh, HeroGradientMesh } from './GradientMesh';

interface BackgroundWrapperProps {
  children: React.ReactNode;
  className?: string;
  pattern?: 'dots' | 'grid' | 'wave' | 'geometric' | 'gradient' | 'none';
  intensity?: 'subtle' | 'moderate' | 'strong';
  animated?: boolean;
  overlay?: boolean;
}

const intensityMap = {
  subtle: { opacity: 0.03, blur: 40 },
  moderate: { opacity: 0.06, blur: 30 },
  strong: { opacity: 0.1, blur: 20 },
};

export function BackgroundWrapper({
  children,
  className,
  pattern = 'none',
  intensity = 'subtle',
  animated = true,
  overlay = false,
}: BackgroundWrapperProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {pattern === 'dots' && <HealthcareDotPattern />}
        {pattern === 'grid' && <HeroGridPattern />}
        {pattern === 'wave' && <WavePattern animated={animated} />}
        {pattern === 'geometric' && <GeometricShapes animated={animated} />}
        {pattern === 'gradient' && <GradientMesh animated={animated} />}
      </div>

      {/* Optional overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-background/50 backdrop-blur-sm pointer-events-none"
          style={{ opacity: intensityMap[intensity].opacity * 10 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Pre-configured background variants
export function HeroBackground({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <HeroGradientMesh />
      <FloatingOrbs />
      <HealthcareDotPattern className="opacity-50" />
    </div>
  );
}

export function SectionBackground({
  className,
  variant = 'default',
}: {
  className?: string;
  variant?: 'default' | 'alt' | 'accent';
}) {
  const bgMap = {
    default: 'bg-background',
    alt: 'bg-muted/30',
    accent: 'bg-primary/5',
  };

  return (
    <div className={cn('relative', bgMap[variant], className)}>
      <GradientMesh variant="cool" animated={false} />
    </div>
  );
}

// Re-export all components
export {
  DotPattern,
  HealthcareDotPattern,
  GridPattern,
  HeroGridPattern,
  WavePattern,
  WaveDivider,
  GeometricShapes,
  FloatingOrbs,
  GradientMesh,
  HeroGradientMesh,
};
