import { makeStyles } from '@griffel/react'

export const useAppLayoutStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    color: 'var(--fableforge-color-text-primary)'
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    boxSizing: 'border-box', // Include padding in the width calculation
    marginTop: 'var(--fableforge-spacing-s)', // Space below header
    marginBottom: 'var(--fableforge-spacing-m)', // Space above footer

    '@media (max-width: 768px)': { // Adjust for smaller screens
      marginTop: 'var(--fableforge-spacing-m)',
      marginBottom: 'var(--fableforge-spacing-m)',
      borderRadius: 'var(--fableforge-border-radii-m)',
    },
  },
  cardBorder: {
    padding: 'var(--fableforge-spacing-l)',
    border: '1em solid var(--fableforge-color-card-border)',
    borderRadius: 'var(--fableforge-border-radii-l)',
    display: 'flex',
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  mainContent: {
    borderRadius: 'var(--fableforge-border-radii-l)',
    width: '100%'
  },
  isAuthenticated: {
    backgroundColor: 'var(--fableforge-color-panel)',
    border: '1px solid var(--fableforge-color-brand-secondary)',
    borderRadius: 'var(--fableforge-border-radii-l)',
    boxShadow: '0 0.5em 1.5em rgba(0, 0, 0, 0.6)',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 'var(--fableforge-spacing-m)',
    textAlign: 'center',
    color: 'var(--fableforge-color-text-secondary)',
    fontSize: 'var(--fableforge-typography-font-size-s)',
    width: '100%', // Ensure footer spans full width
  },
})
