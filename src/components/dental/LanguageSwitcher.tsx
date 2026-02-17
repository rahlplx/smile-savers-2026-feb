'use client';

import { useSyncExternalStore } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage, languageNames, Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile';
}

// Helper to safely check if we're on the client
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function LanguageSwitcher({ variant = 'desktop' }: LanguageSwitcherProps) {
  // Use useSyncExternalStore to safely detect client-side rendering
  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
  const { language, setLanguage } = useLanguage();

  if (!mounted) {
    // Return a placeholder with the same structure to prevent layout shift
    if (variant === 'mobile') {
      return (
        <div className="p-2.5 text-muted-foreground min-w-[44px] min-h-[44px] flex items-center justify-center">
          <Globe className="h-5 w-5" />
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 px-2 py-1 opacity-70">
        <Globe className="h-3.5 w-3.5" />
        <span className="text-sm">{languageNames[language]}</span>
        <ChevronDown className="h-3 w-3" />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {variant === 'mobile' ? (
          <button
            className="p-2.5 text-muted-foreground hover:text-foreground min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Change language"
          >
            <Globe className="h-5 w-5" />
          </button>
        ) : (
          <button className="flex items-center gap-1.5 hover:bg-white/10 px-2 py-1 rounded transition-colors">
            <Globe className="h-3.5 w-3.5" />
            <span>{languageNames[language]}</span>
            <ChevronDown className="h-3 w-3" />
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={variant === 'mobile' ? '' : 'min-w-[120px]'}>
        {(['en', 'es', 'zh'] as Language[]).map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={cn(language === lang && 'bg-primary/10')}
          >
            {languageNames[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
