// src/Theme/Tokens.ts

export const colorTokens = {
  // Cleaner Dark Theme Palette
  backgroundBody: '#202124', // Dark grey
  panelColor: '#262D35',    // Slightly lighter for surfaces/panels
  backgroundSubtle: '#3C4043', // For subtle backgrounds or hover states on dark elements

  textPrimary: '#E8EAED',   // Off-white for primary text
  textSecondary: '#BDC1C6', // Lighter grey for secondary text
  textDisabled: '#9AA0A6',  // Grey for disabled states

  brandPrimary: '#8B0000',      // Blood Red
  brandPrimaryHover: '#A52A2A', // Lighter Blood Red
  brandPrimaryActive: '#660000', // Darker Blood Red

  brandSecondary: '#B8860B',     // Muted Gold
  brandSecondaryHover: '#CDAD00',
  brandSecondaryActive: '#806517',

  black: '#000000',

  // Semantic Colors (can be adjusted for better harmony with the new palette)
  error: '#EA4335', // Google's Red
  success: '#34A853', // Google's Green
  warning: '#FBBC04', // Google's Yellow/Orange
  info: '#4285F4', // Google's Blue

  // UI Elements
  borderOpaque: '#5F6368', // Medium grey for distinct borders
  borderSubtle: '#3C4043', // Darker grey for less prominent borders
} as const

export const typographyTokens = {
  fontFamilyHeading: "'Inter', sans-serif",
  fontFamilyBody: "'Inter', sans-serif",

  fontSizeRootClamp: 'clamp(0.9375rem, 0.85rem + 0.25vw, 1.0625rem)', // Slightly smaller base: ~15px-17px

  fontSizeXs: '0.75rem',  // 12px
  fontSizeS: '0.875rem', // 14px
  fontSizeM: '1rem',     // 16px (base body)
  fontSizeL: '1.125rem', // 18px
  fontSizeXl: '1.25rem', // 20px
  fontSize2xl: '1.5rem', // 24px (common for h3 or larger text)
  fontSize3xl: '1.875rem',// 30px (common for h2)
  fontSize4xl: '2.25rem', // 36px (common for h1)

  fontWeightLight: '300',
  fontWeightRegular: '400',
  fontWeightMedium: '500',
  fontWeightBold: '700',
  // Inter also has 100, 200, 600, 800, 900 if needed
} as const

export const spacingTokens = {
  xxs: '0.25rem', // 4px
  xs: '0.5rem',  // 8px
  s: '0.75rem',  // 12px
  m: '1rem',     // 16px
  l: '1.5rem',   // 24px
  xl: '2rem',    // 32px
  xxl: '3rem',   // 48px
} as const // Reduced xxxl

export const borderRadiiTokens = {
  xs: '2px', // Sharper
  s: '4px',  // Common small radius
  m: '8px',  // Common medium radius
  l: '12px', // Common large radius for panels
  circular: '50%',
} as const

export const shadowTokens = {
  // Minimized and subtle shadows
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.1)', // Very subtle
  s: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // Standard subtle
  // Remove heavier shadows m, l unless specifically needed for a floating element
  // m: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
} as const

export const zIndexTokens = {
  dropdown: 1000,
  modal: 1050,
  tooltip: 1100,
} as const
