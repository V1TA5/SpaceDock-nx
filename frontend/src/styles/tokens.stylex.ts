
import * as stylex from '@stylexjs/stylex';

// ============================================
// Colors
// ============================================

export const colors = stylex.defineVars({
  // Brand
  primary: '#07acd2',
  primaryHover: '#058aab',

  // Backgrounds
  bg: '#ffffff',
  bgAlt: '#555555',
  cardInfo: '#f5f5f5',
  surface: '#ffffff',

  // Text
  text: '#333333',
  textSecondary: '#666666',
  textMuted: '#999999',
  textInverse: '#ffffff',

  // Borders
  border: '#e0e0e0',
  borderStrong: '#cccccc',

  // Shadows
  shadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

// Intentionally stays dark in both light and dark mode.
  export const headerColors = stylex.defineVars({
    bg: '#191919',
    text: '#eeeeee',
    textSecondary: '#cccccc',
    border: 'rgba(255, 255, 255, 0.08)',
    shadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
  });

export const headerDark = stylex.create({
  dark: {
    [headerColors.bg]: '#101820',
    [headerColors.text]: '#eeeeee',
    [headerColors.textSecondary]: '#b4b4b4',
    [headerColors.border]: 'rgba(255, 255, 255, 0.08)',
    [headerColors.shadow]: '0 2px 8px rgba(0, 0, 0, 0.4)',
  },
});

// ============================================
// Fonts
// ============================================

export const fonts = stylex.defineVars({
  heading: '"Moonlight", sans-serif',
  body: '"Glacial Indifference", sans-serif',
  logo: '"Moonlight", sans-serif',
});

// ============================================
// Font sizes
// ============================================

export const fontSizes = stylex.defineVars({
  h1: '32px',
  h2: '24px',
  h3: '20px',
  h4: '16px',
  body: '14px',
  small: '12px',
});

// ============================================
// Spacing
// ============================================

export const spacing = stylex.defineVars({
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
});

// ============================================
// Border radius
// ============================================

export const radii = stylex.defineVars({
  none: '0px',
  sm: '2px',
  md: '4px',
  lg: '8px',
});

// ============================================
// Theme definitions
// ============================================

export const themes = stylex.create({
  light: {
    [colors.bg]: '#ffffff',
    [colors.bgAlt]: '#f5f5f5',
    [colors.surface]: '#ffffff',
    [colors.surfaceHover]: '#eeeeee',

    [colors.text]: '#333333',
    [colors.textSecondary]: '#666666',
    [colors.textMuted]: '#999999',
    [colors.textInverse]: '#ffffff',

    [colors.border]: '#e0e0e0',
    [colors.borderStrong]: '#cccccc',

    [colors.primary]: '#07acd2',
    [colors.primaryHover]: '#058aab',
    [colors.shadow]: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },

  dark: {
    [colors.bg]: '#121212',
    [colors.bgAlt]: '#1a1a1a',
    [colors.cardInfo]: '#101820',
    [colors.surface]: '#202020',

    [colors.text]: '#eeeeee',
    [colors.textSecondary]: '#b4b4b4',
    [colors.textMuted]: '#888888',
    [colors.textInverse]: '#121212',

    [colors.border]: '#333333',
    [colors.borderStrong]: '#484848',

    [colors.primary]: '#29bee3',
    [colors.primaryHover]: '#4fc9e8',
    [colors.shadow]: '0 0 4px rgba(255, 255, 255, 0.05)',
  },
});
