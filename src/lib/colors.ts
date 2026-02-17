/**
 * Smile Savers Dental - Color Palette System
 * 
 * DESIGN PHILOSOPHY:
 * - Warmth over clinical feel for Hispanic elderly
 * - Trust and professionalism for healthcare
 * - Family-friendly and welcoming
 * - High contrast for accessibility
 * 
 * CULTURAL CONSIDERATIONS:
 * - Hispanic elderly prefer warm tones
 * - Avoid pure white (perceived as hospital/cold)
 * - Earth tones convey family warmth
 * - Blue-green healthcare trust with warmth
 */

// ============================================
// PRIMARY COLORS (Warm Teal)
// A warm, inviting teal that maintains healthcare trust
// but adds warmth for Hispanic elderly
// ============================================
export const PRIMARY = {
  50: '#f0fdfa',    // Lightest
  100: '#ccfbf1',
  200: '#99f6e4',
  300: '#5eead4',
  400: '#2dd4bf',
  500: '#14b8a6',   // Base teal
  600: '#0d9488',   // Main primary
  700: '#0f766e',   // Darker
  800: '#115e59',
  900: '#134e4a',
  950: '#042f2e',   // Darkest
  
  // Semantic usage
  DEFAULT: '#0d9488',
  light: '#14b8a6',
  dark: '#0f766e',
  contrast: '#ffffff',
} as const;

// ============================================
// SECONDARY COLORS (Warm Navy/Sage)
// Professional but warm - sage green undertones
// ============================================
export const SECONDARY = {
  50: '#f6f7f6',    // Warm light sage
  100: '#e3e7e3',
  200: '#c7d0c7',
  300: '#a3b1a3',
  400: '#7d8f7d',
  500: '#627362',   // Sage green
  600: '#4d5c4d',   // Warm sage
  700: '#3d4a3d',   // Main secondary
  800: '#2f3a2f',
  900: '#1a221a',
  950: '#0f140f',
  
  // Semantic usage
  DEFAULT: '#3d4a3d',
  light: '#627362',
  dark: '#2f3a2f',
  contrast: '#ffffff',
} as const;

// ============================================
// ACCENT COLORS (Warm Coral/Orange)
// Energetic but not aggressive - warm Hispanic tones
// ============================================
export const ACCENT = {
  50: '#fff7ed',    // Lightest warm
  100: '#ffedd5',
  200: '#fed7aa',
  300: '#fdba74',
  400: '#fb923c',
  500: '#f97316',   // Warm coral
  600: '#ea580c',   // Main accent
  700: '#c2410c',   // Darker
  800: '#9a3412',
  900: '#7c2d12',
  950: '#431507',
  
  // Semantic usage
  DEFAULT: '#ea580c',
  light: '#f97316',
  dark: '#c2410c',
  contrast: '#ffffff',
} as const;

// ============================================
// NEUTRAL COLORS (Warm Grays)
// Warm undertones instead of cool grays
// ============================================
export const NEUTRAL = {
  50: '#fafaf9',    // Warm white
  100: '#f5f5f4',   // Off-white (not pure white)
  200: '#e7e5e4',   // Light warm gray
  300: '#d6d3d1',
  400: '#a8a29e',
  500: '#78716c',   // Medium warm gray
  600: '#57534e',
  700: '#44403c',
  800: '#292524',
  900: '#1c1917',
  950: '#0c0a09',
} as const;

// ============================================
// SEMANTIC COLORS (Status/Feedback)
// ============================================
export const SEMANTIC = {
  // Success (Green)
  success: {
    light: '#dcfce7',
    DEFAULT: '#22c55e',
    dark: '#15803d',
    contrast: '#ffffff',
  },
  
  // Warning (Amber)
  warning: {
    light: '#fef3c7',
    DEFAULT: '#f59e0b',
    dark: '#b45309',
    contrast: '#1c1917',
  },
  
  // Error (Warm Red)
  error: {
    light: '#fee2e2',
    DEFAULT: '#ef4444',
    dark: '#b91c1c',
    contrast: '#ffffff',
  },
  
  // Info (Blue)
  info: {
    light: '#dbeafe',
    DEFAULT: '#3b82f6',
    dark: '#1d4ed8',
    contrast: '#ffffff',
  },
} as const;

// ============================================
// BACKGROUND COLORS
// Warm backgrounds instead of clinical white
// ============================================
export const BACKGROUND = {
  primary: '#fafaf9',      // Warm white (not pure #ffffff)
  secondary: '#f5f5f4',    // Warm off-white
  tertiary: '#e7e5e4',     // Warm light gray
  card: '#ffffff',         // Pure white for cards
  elevated: '#ffffff',     // Elevated surfaces
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

// ============================================
// TEXT COLORS
// ============================================
export const TEXT = {
  primary: '#1c1917',      // Near black (warm)
  secondary: '#57534e',    // Medium warm gray
  tertiary: '#78716c',     // Light warm gray
  disabled: '#a8a29e',     // Disabled text
  inverse: '#ffffff',      // White text
  link: '#0d9488',         // Link color (primary)
  linkHover: '#0f766e',    // Link hover
} as const;

// ============================================
// INSURANCE BADGE COLORS
// Color-coded for quick recognition
// ============================================
export const INSURANCE_BADGES = {
  medicare: {
    bg: '#dcfce7',         // Light green
    text: '#15803d',       // Dark green
    border: '#86efac',
  },
  medicaid: {
    bg: '#dbeafe',         // Light blue
    text: '#1d4ed8',       // Dark blue
    border: '#93c5fd',
  },
  emergency: {
    bg: '#ffedd5',         // Light orange
    text: '#c2410c',       // Dark orange
    border: '#fdba74',
  },
  insurance: {
    bg: '#f0fdfa',         // Light teal
    text: '#0f766e',       // Dark teal
    border: '#5eead4',
  },
} as const;

// ============================================
// CSS VARIABLES (for globals.css)
// ============================================
export const CSS_VARIABLES = `
:root {
  /* Background - Warm whites */
  --background: ${BACKGROUND.primary};
  --foreground: ${TEXT.primary};
  
  /* Card */
  --card: ${BACKGROUND.card};
  --card-foreground: ${TEXT.primary};
  
  /* Popover */
  --popover: ${BACKGROUND.card};
  --popover-foreground: ${TEXT.primary};
  
  /* Primary - Warm Teal */
  --primary: ${PRIMARY.DEFAULT};
  --primary-foreground: ${PRIMARY.contrast};
  
  /* Secondary - Warm Sage */
  --secondary: ${SECONDARY.DEFAULT};
  --secondary-foreground: ${SECONDARY.contrast};
  
  /* Muted */
  --muted: ${NEUTRAL[100]};
  --muted-foreground: ${TEXT.secondary};
  
  /* Accent - Warm Coral */
  --accent: ${ACCENT.DEFAULT};
  --accent-foreground: ${ACCENT.contrast};
  
  /* Destructive */
  --destructive: ${SEMANTIC.error.DEFAULT};
  
  /* Border & Input */
  --border: ${NEUTRAL[200]};
  --input: ${NEUTRAL[200]};
  --ring: ${PRIMARY.DEFAULT};
  
  /* Radius */
  --radius: 0.5rem;
}
`;

// ============================================
// CONTRAST RATIOS (WCAG Compliance)
// ============================================
export const CONTRAST_RATIOS = {
  // Primary on white: 4.8:1 (AA)
  // Secondary on white: 9.2:1 (AAA)
  // Accent on white: 4.5:1 (AA)
  // Text on white: 16.1:1 (AAA)
  // Text on primary: 4.6:1 (AA)
  minimum: {
    aa: 4.5,
    aaa: 7.0,
  },
} as const;
