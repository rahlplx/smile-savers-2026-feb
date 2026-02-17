/**
 * Smile Savers Dental - Enterprise Design System
 * Target: Spanish-speaking elderly (60+) and families
 * 
 * BREAKPOINT SYSTEM (Enterprise Standard)
 * Mobile Portrait:  320px - 480px
 * Mobile Landscape: 480px - 640px
 * Tablet Portrait:  640px - 768px
 * Tablet Landscape: 768px - 1024px
 * Desktop:          1024px - 1280px
 * Large Desktop:    1280px - 1536px
 * Ultra-wide:       1536px+
 */

// ============================================
// BREAKPOINTS
// ============================================
export const BREAKPOINTS = {
  xs: '320px',   // Small mobile
  sm: '480px',   // Large mobile
  md: '640px',   // Small tablet
  lg: '768px',   // Tablet
  xl: '1024px',  // Desktop
  '2xl': '1280px', // Large desktop
  '3xl': '1536px', // Ultra-wide
} as const;

// Tailwind breakpoint mapping
export const TAILWIND_BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================
// SPACING SCALE (4px base unit)
// ============================================
export const SPACING = {
  0: '0',
  0.5: '2px',   // 0.5 * 4
  1: '4px',     // 1 * 4
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',   // Minimum touch target
  12: '48px',
  14: '56px',   // Touch target large
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
} as const;

// ============================================
// TYPOGRAPHY SCALE (Elderly-Friendly)
// ============================================
export const TYPOGRAPHY = {
  // Font families
  fontFamily: {
    sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'Inter, system-ui, sans-serif',
    mono: '"SF Mono", Monaco, "Cascadia Mono", monospace',
  },
  
  // Font sizes (minimum 16px for body, larger for elderly)
  fontSize: {
    xs: '0.75rem',     // 12px - only for badges/labels
    sm: '0.875rem',    // 14px - small text
    base: '1rem',      // 16px - body text minimum
    lg: '1.125rem',    // 18px - comfortable reading
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
  },
  
  // Line heights (1.6 minimum for readability)
  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 1.75,
    elderly: 1.8,      // Extra loose for seniors
  },
  
  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
} as const;

// ============================================
// TOUCH TARGETS (WCAG AAA)
// ============================================
export const TOUCH_TARGETS = {
  minimum: '44px',   // WCAG minimum
  comfortable: '48px', // Recommended
  large: '56px',     // Elderly-friendly
  xlarge: '64px',    // Very accessible
} as const;

// ============================================
// CONTAINER WIDTHS
// ============================================
export const CONTAINERS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1400px',
  prose: '65ch',     // Optimal reading width
} as const;

// ============================================
// GRID SYSTEM
// ============================================
export const GRID = {
  // Columns per breakpoint
  columns: {
    mobile: 4,
    tablet: 8,
    desktop: 12,
  },
  
  // Gaps
  gap: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  
  // Container padding
  containerPadding: {
    mobile: '16px',
    tablet: '24px',
    desktop: '32px',
  },
} as const;

// ============================================
// Z-INDEX SCALE
// ============================================
export const Z_INDEX = {
  hide: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  top: 100,
  skipLink: 9999,
} as const;

// ============================================
// BORDER RADIUS
// ============================================
export const RADIUS = {
  none: '0',
  sm: '0.25rem',   // 4px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  '2xl': '1rem',   // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
} as const;

// ============================================
// SHADOWS
// ============================================
export const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
} as const;

// ============================================
// TRANSITIONS
// ============================================
export const TRANSITIONS = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  timing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// ============================================
// RESPONSIVE VALUE HELPERS
// ============================================
export const RESPONSIVE = {
  // Mobile-first responsive values
  padding: {
    mobile: 'p-4',      // 16px
    tablet: 'md:p-6',   // 24px
    desktop: 'lg:p-8',  // 32px
  },
  
  // Section padding
  sectionPadding: {
    mobile: 'py-12',    // 48px
    tablet: 'md:py-16', // 64px
    desktop: 'lg:py-24', // 96px
  },
  
  // Container max widths
  container: 'max-w-7xl mx-auto px-4 md:px-6 lg:px-8',
  
  // Grid columns
  grid: {
    mobile: 'grid-cols-1',
    tablet: 'md:grid-cols-2',
    desktop: 'lg:grid-cols-3',
    wide: 'xl:grid-cols-4',
  },
  
  // Text alignment
  textCenterMobile: 'text-center lg:text-left',
  
  // Hide/show by breakpoint
  hide: {
    mobile: 'hidden md:block',
    tablet: 'md:hidden lg:block',
    desktop: 'lg:hidden',
  },
  show: {
    mobile: 'block md:hidden',
    tablet: 'hidden md:block lg:hidden',
    desktop: 'hidden lg:block',
  },
} as const;
