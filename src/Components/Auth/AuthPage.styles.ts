import { makeStyles /* shorthands removed if not used elsewhere */ } from '@griffel/react'
// Import necessary tokens if directly used, otherwise rely on CSS variables
// import { spacingTokens, shadowTokens, borderRadiiTokens } from '../../Theme/Tokens';

export const useAuthPageStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh', // Ensure it takes up good space
    padding: 'var(--fableforge-spacing-l)',
  },
  formContainer: {
    backgroundColor: 'var(--fableforge-color-panel-color)',
    padding: 'var(--fableforge-spacing-xl)',
    borderRadius: 'var(--fableforge-border-l)',
    boxShadow: 'var(--fableforge-shadow-s)',
    width: '100%',
    maxWidth: '400px',
  },
  // Tertiary actions like toggle links should be styled as links, not buttons
  toggleLink: {
    display: 'block',
    marginTop: 'var(--fableforge-spacing-l)',
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'var(--fableforge-color-brand-secondary)',
    borderTopStyle: 'none',
    borderRightStyle: 'none',
    borderBottomStyle: 'none',
    borderLeftStyle: 'none',
    // Or alternatively, ensure border width is 0 if style 'none' is problematic
    // borderWidth: 0,
    textDecoration: 'underline', // Set to underline by default to match image
    cursor: 'pointer',
    fontSize: 'var(--fableforge-typography-font-size-s)',
    fontFamily: 'var(--fableforge-typography-font-family-body)',
    transition: 'color 0.2s ease-in-out',
    // Removed hover effect as per user request for a simple hyperlink
  },
})
