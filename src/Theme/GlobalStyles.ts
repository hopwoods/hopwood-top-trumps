import { makeStaticStyles } from '@griffel/react' // shorthands removed
import {
  colorTokens,
  typographyTokens,
  spacingTokens,
  borderRadiiTokens,
  shadowTokens, // Keep shadowTokens import for CSS variable generation
} from './Tokens'

// Helper function to convert token objects to CSS variable declarations
const tokensToCssVars = (tokens: Record<string, string>, prefix = '') => {
  return Object.entries(tokens).reduce(
    (acc, [key, value]) => {
      const cssVarName = `--fableforge-${prefix}${key
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()}`
      acc[cssVarName] = value
      return acc
    },
    {} as Record<string, string>,
  )
}

export const useGlobalStyles = makeStaticStyles({
  ':root': {
    // Define CSS variables from tokens
    ...tokensToCssVars(colorTokens, 'color-'),
    ...tokensToCssVars(typographyTokens, 'typography-'),
    ...tokensToCssVars(spacingTokens, 'spacing-'),
    ...tokensToCssVars(borderRadiiTokens, 'border-radii-'),
    ...tokensToCssVars(shadowTokens, 'shadow-'), // Generate shadow CSS vars

    fontSize: 'var(--fableforge-typography-font-size-root-clamp)',

    colorScheme: 'dark',
    color: 'var(--fableforge-color-text-primary)',
    backgroundColor: 'var(--fableforge-color-background-body)',

    fontSynthesis: 'none',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTextSizeAdjust: '100%',
  },

  html: { // Added html styles
    height: '100%',
    overflowX: 'hidden',
  },

  body: {
    margin: '0',
    height: '100%',
    overflowX: 'hidden',
    fontFamily: 'var(--fableforge-typography-font-family-body)',
    color: 'var(--fableforge-color-text-primary)',
    backgroundColor: 'var(--fableforge-color-background-body)',
    lineHeight: '1.6',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },

  '*, *::before, *::after': {
    boxSizing: 'inherit',
  },

  'h1, h2, h3, h4, h5, h6': {
    fontFamily: 'var(--fableforge-typography-font-family-heading)',
    fontWeight: 'var(--fableforge-typography-font-weight-bold)',
    color: 'var(--fableforge-color-text-primary)',
    marginTop: 'var(--fableforge-spacing-l)',
    marginBottom: 'var(--fableforge-spacing-m)',
    lineHeight: '1.3',
  },
  h1: {
    fontSize: 'var(--fableforge-typography-font-size4xl)',
    textAlign: 'center',
    marginBottom: 'var(--fableforge-spacing-l)',
  },
  h2: { fontSize: 'var(--fableforge-typography-font-size3xl)' },
  h3: { fontSize: 'var(--fableforge-typography-font-size2xl)' },

  p: {
    marginBottom: 'var(--fableforge-spacing-m)',
    maxWidth: '65ch',
    lineHeight: '1.7',
  },

  a: {
    color: 'var(--fableforge-color-brand-secondary)',
    textDecoration: 'none',
    fontWeight: 'var(--fableforge-typography-font-weight-medium)',
    transition: 'color 0.2s ease-in-out',
  },
  'a:hover': {
    color: 'var(--fableforge-color-brand-secondary-hover)',
    textDecoration: 'underline',
  },

  button: {
    fontFamily: 'var(--fableforge-typography-font-family-body)',
    fontSize: 'var(--fableforge-typography-font-size-m)',
    fontWeight: 'var(--fableforge-typography-font-weight-medium)',
    color: 'var(--fableforge-color-text-primary)',
    backgroundColor: 'var(--fableforge-color-brand-primary)',
    border: '1px solid transparent',
    borderRadius: 'var(--fableforge-border-m)',
    paddingTop: 'var(--fableforge-spacing-s)',
    paddingBottom: 'var(--fableforge-spacing-s)',
    paddingLeft: 'var(--fableforge-spacing-m)',
    paddingRight: 'var(--fableforge-spacing-m)',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
  },
  'button:hover': {
    backgroundColor: 'var(--fableforge-color-brand-primary-hover)',
  },
  'button:focus, button:focus-visible': {
    outlineOffset: '2px',
    outline: '2px solid var(--fableforge-color-brand-secondary)',
  },

  'input[type="text"], input[type="email"], input[type="password"], textarea': {
    fontFamily: 'var(--fableforge-typography-font-family-body)',
    fontSize: 'var(--fableforge-typography-font-size-m)',
    paddingTop: 'var(--fableforge-spacing-s)',
    paddingBottom: 'var(--fableforge-spacing-s)',
    paddingLeft: 'var(--fableforge-spacing-m)',
    paddingRight: 'var(--fableforge-spacing-m)',
    borderRadius: 'var(--fableforge-border-s)',
    border: '1px solid var(--fableforge-color-border-opaque)',
    backgroundColor: 'var(--fableforge-color-background-subtle)',
    color: 'var(--fableforge-color-text-primary)',
    marginBottom: 'var(--fableforge-spacing-s)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  },
  'input[type="text"]:focus, input[type="email"]:focus, input[type="password"]:focus, textarea:focus': {
    borderColor: 'var(--fableforge-color-brand-primary)',
    outlineStyle: 'none',
    boxShadow: '0 0 0 2px var(--fableforge-color-brand-primary)4D',
  },

  label: {
    display: 'block',
    marginBottom: 'var(--fableforge-spacing-xs)',
    fontWeight: 'var(--fableforge-typography-font-weight-medium)',
    color: 'var(--fableforge-color-text-secondary)',
  },

  '.sr-only': {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: '0',
  },
})
