'use client';

import { cn } from '@/lib/utils';

interface GradientMeshProps {
  className?: string;
  variant?: 'default' | 'warm' | 'cool' | 'sunset';
  animated?: boolean;
}

const gradientVariants = {
  default: {
    colors: ['rgba(13, 148, 136, 0.1)', 'rgba(234, 88, 12, 0.05)', 'rgba(13, 148, 136, 0.08)'],
  },
  warm: {
    colors: ['rgba(234, 88, 12, 0.1)', 'rgba(249, 115, 22, 0.08)', 'rgba(251, 146, 60, 0.05)'],
  },
  cool: {
    colors: ['rgba(13, 148, 136, 0.1)', 'rgba(20, 184, 166, 0.08)', 'rgba(45, 212, 191, 0.05)'],
  },
  sunset: {
    colors: ['rgba(234, 88, 12, 0.1)', 'rgba(249, 115, 22, 0.08)', 'rgba(13, 148, 136, 0.05)'],
  },
};

export function GradientMesh({
  className,
  variant = 'default',
  animated = true,
}: GradientMeshProps) {
  const { colors } = gradientVariants[variant];

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {/* Mesh gradient layer 1 */}
      <div
        className={cn(
          'absolute w-[800px] h-[800px] rounded-full',
          animated && 'animate-float'
        )}
        style={{
          left: '-20%',
          top: '-20%',
          background: `radial-gradient(ellipse at center, ${colors[0]} 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />
      {/* Mesh gradient layer 2 */}
      <div
        className={cn(
          'absolute w-[600px] h-[600px] rounded-full',
          animated && 'animate-float'
        )}
        style={{
          right: '-10%',
          bottom: '-10%',
          background: `radial-gradient(ellipse at center, ${colors[1]} 0%, transparent 70%)`,
          filter: 'blur(50px)',
          animationDelay: '1s',
        }}
      />
      {/* Mesh gradient layer 3 */}
      <div
        className={cn(
          'absolute w-[500px] h-[500px] rounded-full',
          animated && 'animate-float'
        )}
        style={{
          left: '40%',
          top: '30%',
          background: `radial-gradient(ellipse at center, ${colors[2]} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          animationDelay: '2s',
        }}
      />
    </div>
  );
}

// Hero-specific gradient mesh
export function HeroGradientMesh({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {/* Primary gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.03) 0%, transparent 50%, rgba(234, 88, 12, 0.02) 100%)',
        }}
      />
      {/* Radial highlight */}
      <div
        className="absolute"
        style={{
          width: '150%',
          height: '150%',
          left: '-25%',
          top: '-25%',
          background: 'radial-gradient(ellipse at 30% 30%, rgba(13, 148, 136, 0.05) 0%, transparent 50%)',
        }}
      />
    </div>
  );
}
