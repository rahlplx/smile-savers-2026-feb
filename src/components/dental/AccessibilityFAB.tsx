'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { 
  Accessibility, X, Type, Contrast, Eye, 
  Shield, RotateCcw, ChevronRight,
  Minus, Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n';

/**
 * AccessibilityFAB - HIPAA Compliant Accessibility Menu
 * 
 * Features:
 * - Floating action button with expandable menu
 * - Text size adjustment (increase/decrease/reset)
 * - High contrast mode toggle
 * - Reduced motion preference
 * - Screen reader optimization
 * - HIPAA notice access
 * 
 * Design: Similar to Next.js Turborepo dev server floating icons
 * with glassmorphism and blur effects
 */

// Get preference from localStorage with SSR safety
function getStoredPreference(key: string, defaultValue: boolean | number): boolean | number {
  if (typeof window === 'undefined') return defaultValue;
  const value = localStorage.getItem(key);
  if (value === null) return defaultValue;
  if (typeof defaultValue === 'boolean') return value === 'true';
  return parseInt(value, 10);
}

export function AccessibilityFAB() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  // Use function initializer to read from localStorage once on mount
  const [fontSize, setFontSize] = useState(() => {
    const saved = getStoredPreference('a11y-fontSize', 100) as number;
    // Apply to DOM immediately on initial render
    if (typeof window !== 'undefined' && saved !== 100) {
      document.documentElement.style.fontSize = `${saved}%`;
    }
    return saved;
  });
  
  const [highContrast, setHighContrast] = useState(() => {
    const saved = getStoredPreference('a11y-highContrast', false) as boolean;
    if (typeof window !== 'undefined' && saved) {
      document.documentElement.classList.add('high-contrast-mode');
    }
    return saved;
  });
  
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = getStoredPreference('a11y-reducedMotion', false) as boolean;
    const systemPreference = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const value = saved || systemPreference;
    if (value) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
    return value;
  });

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Adjust font size
  const adjustFontSize = useCallback((delta: number) => {
    const newSize = Math.min(150, Math.max(80, fontSize + delta));
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
    localStorage.setItem('a11y-fontSize', newSize.toString());
  }, [fontSize]);

  // Reset all accessibility settings
  const resetSettings = useCallback(() => {
    setFontSize(100);
    setHighContrast(false);
    setReducedMotion(false);
    document.documentElement.style.fontSize = '100%';
    document.documentElement.classList.remove('high-contrast-mode');
    document.documentElement.style.removeProperty('--animation-duration');
    localStorage.removeItem('a11y-fontSize');
    localStorage.removeItem('a11y-highContrast');
    localStorage.removeItem('a11y-reducedMotion');
  }, []);

  // Toggle high contrast
  const toggleHighContrast = useCallback(() => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    document.documentElement.classList.toggle('high-contrast-mode', newValue);
    localStorage.setItem('a11y-highContrast', newValue.toString());
  }, [highContrast]);

  // Toggle reduced motion
  const toggleReducedMotion = useCallback(() => {
    const newValue = !reducedMotion;
    setReducedMotion(newValue);
    if (newValue) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    } else {
      document.documentElement.style.removeProperty('--animation-duration');
    }
    localStorage.setItem('a11y-reducedMotion', newValue.toString());
  }, [reducedMotion]);

  const labels = useMemo(() => ({
    accessibility: language === 'es' ? 'Accesibilidad' : language === 'zh' ? '无障碍' : 'Accessibility',
    textSize: language === 'es' ? 'Tamaño de texto' : language === 'zh' ? '文字大小' : 'Text Size',
    increaseText: language === 'es' ? 'Aumentar texto' : language === 'zh' ? '增大文字' : 'Increase Text',
    decreaseText: language === 'es' ? 'Reducir texto' : language === 'zh' ? '减小文字' : 'Decrease Text',
    highContrast: language === 'es' ? 'Alto contraste' : language === 'zh' ? '高对比度' : 'High Contrast',
    reducedMotion: language === 'es' ? 'Reducir animación' : language === 'zh' ? '减少动画' : 'Reduce Motion',
    reset: language === 'es' ? 'Restablecer' : language === 'zh' ? '重置' : 'Reset',
    hipaaNotice: language === 'es' ? 'Aviso HIPAA' : language === 'zh' ? 'HIPAA通知' : 'HIPAA Notice',
    close: language === 'es' ? 'Cerrar' : language === 'zh' ? '关闭' : 'Close',
  }), [language]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* FAB Container */}
      <div 
        className={cn(
          'fixed z-[70] transition-all duration-300 ease-out',
          'bottom-20 right-4 lg:bottom-6',
          // Hide on mobile when nav is visible
          'max-lg:bottom-[calc(90px+env(safe-area-inset-bottom,0px))]'
        )}
      >
        {/* Expanded Menu */}
        <div
          className={cn(
            'absolute bottom-16 right-0 w-72',
            'bg-white/95 backdrop-blur-xl rounded-2xl',
            'shadow-[0_8px_32px_rgba(0,0,0,0.15),0_2px_8px_rgba(0,0,0,0.1)]',
            'border border-white/50',
            'transition-all duration-300 ease-out',
            'overflow-hidden',
            isOpen 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          )}
          role="dialog"
          aria-label={labels.accessibility}
          aria-hidden={!isOpen}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary/5 border-b border-border/50">
            <div className="flex items-center gap-2">
              <Accessibility className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm">{labels.accessibility}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
              aria-label={labels.close}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Options */}
          <div className="p-2 space-y-1">
            {/* Text Size Controls */}
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{labels.textSize}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => adjustFontSize(-10)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                  aria-label={labels.decreaseText}
                  disabled={fontSize <= 80}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-medium">{fontSize}%</span>
                <button
                  onClick={() => adjustFontSize(10)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                  aria-label={labels.increaseText}
                  disabled={fontSize >= 150}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* High Contrast Toggle */}
            <button
              onClick={toggleHighContrast}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2.5 rounded-lg',
                'transition-colors min-h-[48px]',
                highContrast ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
              )}
            >
              <div className="flex items-center gap-2">
                <Contrast className="h-4 w-4" />
                <span className="text-sm font-medium">{labels.highContrast}</span>
              </div>
              <div
                className={cn(
                  'w-10 h-6 rounded-full transition-colors relative',
                  highContrast ? 'bg-primary' : 'bg-muted-foreground/30'
                )}
                role="switch"
                aria-checked={highContrast}
              >
                <div
                  className={cn(
                    'absolute top-1 w-4 h-4 rounded-full bg-white transition-all',
                    highContrast ? 'left-5' : 'left-1'
                  )}
                />
              </div>
            </button>

            {/* Reduced Motion Toggle */}
            <button
              onClick={toggleReducedMotion}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2.5 rounded-lg',
                'transition-colors min-h-[48px]',
                reducedMotion ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
              )}
            >
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="text-sm font-medium">{labels.reducedMotion}</span>
              </div>
              <div
                className={cn(
                  'w-10 h-6 rounded-full transition-colors relative',
                  reducedMotion ? 'bg-primary' : 'bg-muted-foreground/30'
                )}
                role="switch"
                aria-checked={reducedMotion}
              >
                <div
                  className={cn(
                    'absolute top-1 w-4 h-4 rounded-full bg-white transition-all',
                    reducedMotion ? 'left-5' : 'left-1'
                  )}
                />
              </div>
            </button>

            {/* HIPAA Notice Link */}
            <Link
              href="/privacy"
              onClick={() => setIsOpen(false)}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2.5 rounded-lg',
                'hover:bg-muted transition-colors min-h-[48px]'
              )}
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{labels.hipaaNotice}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>

            {/* Reset Button */}
            <button
              onClick={resetSettings}
              className={cn(
                'w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg',
                'bg-muted/50 hover:bg-muted transition-colors min-h-[48px]',
                'text-sm font-medium text-muted-foreground'
              )}
            >
              <RotateCcw className="h-4 w-4" />
              {labels.reset}
            </button>
          </div>
        </div>

        {/* Main FAB Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-14 h-14 rounded-full flex items-center justify-center',
            'bg-white/90 backdrop-blur-xl',
            'shadow-[0_4px_16px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.1)]',
            'border border-white/50',
            'transition-all duration-300',
            'hover:scale-105 active:scale-95',
            isOpen && 'bg-primary text-primary-foreground rotate-180'
          )}
          aria-label={isOpen ? labels.close : labels.accessibility}
          aria-expanded={isOpen}
          aria-controls="accessibility-menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Accessibility className="h-6 w-6 text-primary" />
          )}
        </button>
      </div>
    </>
  );
}
