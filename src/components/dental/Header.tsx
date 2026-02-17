'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRACTICE_INFO, NAV_LINKS } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/dental/LanguageSwitcher';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prevPathname = useRef<string | null>(null);
  const pathname = usePathname();
  const { language, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes (using microtask to avoid synchronous setState)
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (prevPathname.current !== null && prevPathname.current !== pathname && isMobileMenuOpen) {
      queueMicrotask(closeMobileMenu);
    }
    prevPathname.current = pathname;
  }, [pathname, isMobileMenuOpen, closeMobileMenu]);

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white shadow-sm'
        )}
      >
        {/* Promotional Banner - Mobile visible */}
        <div className="bg-accent text-accent-foreground py-2 px-4">
          <div className="max-w-7xl mx-auto flex justify-center items-center text-sm font-medium">
            <span className="hidden md:inline">
              🦷 Dentists recommend 2 checkups per year. Book your appointment today!
            </span>
            <span className="md:hidden">
              Book your dental checkup today!
            </span>
          </div>
        </div>
      
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href={`tel:${PRACTICE_INFO.phoneFormatted}`} className="flex items-center gap-1.5 hover:underline">
              <Phone className="h-3.5 w-3.5" />
              <span>{PRACTICE_INFO.phone}</span>
            </a>
            <span className="opacity-60">|</span>
            <span>{PRACTICE_INFO.address.city}, {PRACTICE_INFO.address.state}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs opacity-90">
              {language === 'es' ? 'Se habla español' : language === 'zh' ? '我们讲中文' : 'Se habla español • 讲中文'}
            </span>
            
            {/* Language Switcher - Client-only to prevent hydration mismatch */}
            <LanguageSwitcher variant="desktop" />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">SS</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg md:text-xl text-foreground">Smile Savers</span>
              <span className="hidden lg:inline text-muted-foreground text-sm ml-1">Creating Smiles</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:text-primary hover:bg-muted'
                )}
              >
                {language === 'es' ? link.labelEs : language === 'zh' ? link.labelZh : link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm" asChild className="relative">
              <a href={`tel:${PRACTICE_INFO.phoneFormatted}`}>
                <Phone className="h-4 w-4 mr-1.5" />
                {PRACTICE_INFO.phone}
              </a>
            </Button>
            <Button size="sm" asChild>
              <Link href="/contact">{t('nav.bookNow')}</Link>
            </Button>
          </div>

          {/* Mobile Call Button */}
          <a 
            href={`tel:${PRACTICE_INFO.phoneFormatted}`}
            className="flex lg:hidden items-center justify-center w-11 h-11 bg-accent text-accent-foreground rounded-full relative"
            aria-label="Call us"
          >
            <Phone className="h-5 w-5 relative z-10" />
            <span className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
          </a>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Language Switcher - Client-only to prevent hydration mismatch */}
            <LanguageSwitcher variant="mobile" />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-foreground min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden bg-white border-t shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-3 text-base font-medium rounded-md transition-colors',
                    pathname === link.href
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-muted'
                  )}
                >
                  {language === 'es' ? link.labelEs : language === 'zh' ? link.labelZh : link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t flex flex-col gap-3">
              <Button className="w-full" asChild>
                <Link href="/contact">{t('nav.bookNow')}</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href={`tel:${PRACTICE_INFO.phoneFormatted}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  {t('nav.callNow')}: {PRACTICE_INFO.phone}
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
    </>
  );
}
