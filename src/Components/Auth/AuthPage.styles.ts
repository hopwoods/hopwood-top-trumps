import { makeStyles /* shorthands removed if not used elsewhere */ } from '@griffel/react'
// Import necessary tokens if directly used, otherwise rely on CSS variables
// import { spacingTokens, shadowTokens, borderRadiiTokens } from '../../Theme/Tokens';

export const useAuthPageStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    backgroundColor: 'var(--fableforge-color-panel-color)', // Use panelColor from theme
    border: '1px solid var(--fableforge-color-brand-secondary)', // Gold border
    borderRadius: 'var(--fableforge-border-l)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)', // More pronounced shadow
    position: 'relative',
    overflow: 'clip',

    '::before': {
      content: '""',
      position: 'absolute',
      top: '28em',
      left: '18em',
      width: '15em',
      height: '30em',
      background: 'linear-gradient(to top,rgb(78, 74, 74),rgb(37, 38, 41))',
      opacity: '0.6',
      zIndex: '1',
      rotate: '230deg',
    },
  },
  formContainer: {
    backgroundColor: 'var(--fableforge-color-transparent)',
    padding: 'var(--fableforge-spacing-xl)',
    borderRadius: 'var(--fableforge-border-l)',
    boxShadow: 'var(--fableforge-shadow-s)',
    width: '100%',
    maxWidth: '40vw',
    border: '12px solid var(--fableforge-color-black)', // Gold border
    zIndex: 2
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
