'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Stethoscope, Users, MapPin, Phone, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOBILE_NAV_LINKS, PRACTICE_INFO } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  stethoscope: Stethoscope,
  users: Users,
  'map-pin': MapPin,
  phone: Phone,
};

/**
 * MobileBottomNav - Floating Glassmorphism Navigation
 * 
 * Design inspiration: Next.js Turborepo dev server floating UI
 * Features:
 * - Floating pill-style container with blur backdrop
 * - Safe area support for notched devices
 * - Auto-hide on scroll down, show on scroll up
 * - Touch-friendly 48px+ targets
 * - HIPAA-compliant accessibility
 */
export function MobileBottomNav() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;
    
    // Update "at top" state
    setIsAtTop(currentScrollY < 50);
    
    // Show nav when:
    // 1. At top of page
    // 2. Scrolling up
    // 3. Not much scroll movement (small delta)
    if (currentScrollY < 100) {
      setIsVisible(true);
    } else if (scrollDelta < -5) {
      // Scrolling up - show nav
      setIsVisible(true);
    } else if (scrollDelta > 10 && currentScrollY > 200) {
      // Scrolling down fast - hide nav
      setIsVisible(false);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      {/* Floating Navigation Container */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 lg:hidden',
          'transform transition-all duration-300 ease-out',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
        )}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {/* Floating Pill Container with Glassmorphism */}
        <div 
          className={cn(
            'mx-3 mb-3 safe-area-bottom',
            'bg-white/85 backdrop-blur-xl',
            'rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)]',
            'border border-white/50',
            'transition-all duration-300',
            isAtTop && 'shadow-[0_4px_16px_rgba(0,0,0,0.08)]'
          )}
        >
          <nav className="px-2 py-2">
            <div className="flex items-center justify-around">
              {MOBILE_NAV_LINKS.map((link) => {
                const Icon = iconMap[link.icon];
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                const label = language === 'es' ? link.labelEs : language === 'zh' ? link.labelZh : link.label;
                
                const isCall = link.isCall;

                if (isCall) {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'flex flex-col items-center justify-center',
                        'min-w-[52px] min-h-[52px] px-3 rounded-xl',
                        'bg-gradient-to-br from-accent to-accent/90',
                        'text-white shadow-lg shadow-accent/30',
                        'transition-all duration-200',
                        'active:scale-95 active:shadow-md',
                        'relative overflow-hidden'
                      )}
                      aria-label={`Call ${PRACTICE_INFO.phone}`}
                    >
                      {/* Pulse ring animation */}
                      <span className="absolute inset-0 rounded-xl bg-accent/40 animate-ping" />
                      <Icon className="h-5 w-5 relative z-10" />
                      <span className="text-[10px] font-bold mt-0.5 relative z-10">{label}</span>
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex flex-col items-center justify-center',
                      'min-w-[52px] min-h-[52px] px-3 rounded-xl',
                      'transition-all duration-200',
                      'active:scale-95',
                      isActive
                        ? 'bg-primary/15 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className={cn('h-5 w-5', isActive && 'stroke-[2.5px]')} />
                    <span className={cn('text-[10px] font-medium mt-0.5', isActive && 'font-bold')}>
                      {label}
                    </span>
                    {/* Active indicator dot */}
                    {isActive && (
                      <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Floating Book Appointment FAB - Appears after scrolling */}
      <div
        className={cn(
          'fixed right-4 z-40 lg:hidden',
          'transform transition-all duration-300 ease-out',
          isVisible && !isAtTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        )}
        style={{ bottom: 'calc(80px + env(safe-area-inset-bottom, 0px))' }}
      >
        <Link
          href="/contact"
          className={cn(
            'flex items-center gap-2 px-4 py-3 rounded-full',
            'bg-gradient-to-br from-primary to-primary/90',
            'text-white font-semibold text-sm',
            'shadow-lg shadow-primary/30',
            'backdrop-blur-sm',
            'transition-all duration-200',
            'active:scale-95',
            'border border-white/20'
          )}
          aria-label="Book an appointment"
        >
          <Calendar className="h-4 w-4" />
          <span>{language === 'es' ? 'Agendar' : language === 'zh' ? '预约' : 'Book'}</span>
        </Link>
      </div>
    </>
  );
}
