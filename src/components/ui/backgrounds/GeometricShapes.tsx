'use client';

import { cn } from '@/lib/utils';

interface GeometricShapesProps {
  className?: string;
  variant?: 'circles' | 'triangles' | 'squares' | 'mixed';
  count?: number;
  animated?: boolean;
}

const shapes = {
  circles: [
    { size: 300, x: '10%', y: '20%', opacity: 0.03 },
    { size: 200, x: '80%', y: '60%', opacity: 0.04 },
    { size: 150, x: '50%', y: '80%', opacity: 0.02 },
  ],
  triangles: [
    { size: 200, x: '20%', y: '30%', opacity: 0.03 },
    { size: 150, x: '70%', y: '20%', opacity: 0.02 },
  ],
  squares: [
    { size: 100, x: '15%', y: '70%', opacity: 0.03 },
    { size: 80, x: '85%', y: '30%', opacity: 0.04 },
  ],
  mixed: [
    { type: 'circle', size: 250, x: '5%', y: '10%', opacity: 0.03 },
    { type: 'square', size: 120, x: '90%', y: '50%', opacity: 0.04, rotate: 45 },
    { type: 'circle', size: 180, x: '60%', y: '80%', opacity: 0.02 },
    { type: 'triangle', size: 140, x: '30%', y: '60%', opacity: 0.03 },
  ],
};

export function GeometricShapes({
  className,
  variant = 'mixed',
  animated = true,
}: GeometricShapesProps) {
  const shapeData = shapes[variant];

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {shapeData.map((shape, index) => {
        const animationDelay = `${index * 0.5}s`;
        const animationClass = animated ? 'animate-float' : '';

        if (shape.type === 'square' || variant === 'squares') {
          return (
            <div
              key={index}
              className={cn(
                'absolute rounded-lg',
                animationClass
              )}
              style={{
                width: shape.size,
                height: shape.size,
                left: shape.x,
                top: shape.y,
                opacity: shape.opacity,
                background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
                transform: `rotate(${shape.rotate || 0}deg)`,
                animationDelay,
              }}
            />
          );
        }

        if (shape.type === 'triangle' || variant === 'triangles') {
          return (
            <div
              key={index}
              className={cn('absolute', animationClass)}
              style={{
                width: 0,
                height: 0,
                left: shape.x,
                top: shape.y,
                opacity: shape.opacity,
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid #0d9488`,
                animationDelay,
              }}
            />
          );
        }

        // Circle (default)
        return (
          <div
            key={index}
            className={cn(
              'absolute rounded-full',
              animationClass
            )}
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
              opacity: shape.opacity,
              background: 'radial-gradient(circle, #0d9488, transparent)',
              animationDelay,
            }}
          />
        );
      })}
    </div>
  );
}

// Floating orbs for hero sections
export function FloatingOrbs({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {/* Primary orb */}
      <div
        className="absolute rounded-full animate-float"
        style={{
          width: 400,
          height: 400,
          left: '10%',
          top: '20%',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Secondary orb */}
      <div
        className="absolute rounded-full animate-float"
        style={{
          width: 300,
          height: 300,
          right: '15%',
          bottom: '20%',
          background: 'radial-gradient(circle, rgba(234, 88, 12, 0.1) 0%, transparent 70%)',
          filter: 'blur(30px)',
          animationDelay: '1s',
        }}
      />
      {/* Accent orb */}
      <div
        className="absolute rounded-full animate-float"
        style={{
          width: 200,
          height: 200,
          left: '60%',
          top: '60%',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.1) 0%, transparent 70%)',
          filter: 'blur(20px)',
          animationDelay: '2s',
        }}
      />
    </div>
  );
}
