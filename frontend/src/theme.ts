import { defineVars, createTheme } from '@stylexjs/stylex';

// SpaceDock design tokens
export const themeVars = defineVars({
  // Colors
  colorBackground: '#ffffff',
  colorForeground: '#333333',
  colorSecondary: '#666666',
  colorPrimary: '#07acd2',
  colorPrimaryForeground: '#ffffff',
  colorAccent: '#07acd2',
  colorAccentForeground: '#ffffff',
  colorMuted: '#f5f5f5',
  colorMutedForeground: '#666666',
  colorDestructive: '#b3182d',
  colorDestructiveForeground: '#ffffff',
  colorSuccess: '#20bb20',
  colorInfo: '#743af3',
  colorWarning: '#e1cb3f',
  colorBorder: '#d1d5db',

  // Typography
  fontFamilyHeading: '"Moonlight", sans-serif',
  fontFamilyBody: '"Glacial Indifference", sans-serif',
  fontSizeSmall: '12px',
  fontSizeBase: '14px',
  fontSizeLarge: '16px',
  fontSizeXLarge: '18px',
  fontSizeXXLarge: '24px',
  fontSizeHeading: '36px',
  fontWeightNormal: '400',
  fontWeightMedium: '500',
  fontWeightBold: '700',

  // Spacing
  spaceXs: '4px',
  spaceSm: '8px',
  spaceMd: '16px',
  spaceLg: '24px',
  spaceXl: '32px',
  spaceXxl: '48px',

  // Border radius - none per design
  radius: '0px',
});

export const lightTheme = createTheme(themeVars, {
  colorBackground: '#ffffff',
  colorForeground: '#333333',
});

export const darkTheme = createTheme(themeVars, {
  colorBackground: '#0f172a',
  colorForeground: '#e5e5e5',
  colorSecondary: '#a0a0a0',
  colorPrimary: '#07acd2',
  colorPrimaryForeground: '#ffffff',
  colorMuted: '#1e293b',
  colorMutedForeground: '#a0a0a0',
  colorBorder: '#374151',
});
export const lightTheme = createTheme(themeVars, {
  colorBackground: '#ffffff',
  colorForeground: '#1e293b',
});

// Dark theme
export const darkTheme = createTheme(themeVars, {
  colorBackground: '#0f172a',
  colorForeground: '#f8fafc',
  colorPrimary: '#3b82f6',
  colorPrimaryForeground: '#ffffff',
  colorMuted: '#1e293b',
  colorMutedForeground: '#9ca3af',
  colorBorder: '#374151',
});