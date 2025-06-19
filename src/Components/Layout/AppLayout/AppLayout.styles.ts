import { makeStyles } from '@griffel/react'

export const useAppLayoutStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    //backgroundColor: 'var(--fableforge-color-background-body)',
    color: 'var(--fableforge-color-text-primary)', // Default text color for the app
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center content horizontally within the main area
    justifyContent: 'flex-start',
    width: '100%',
    maxWidth: '1200px', // Max width for content to prevent it from stretching too wide on large screens
    margin: '0 auto', // Center the main content block

    boxSizing: 'border-box', // Include padding in the width calculation

    marginTop: 'var(--fableforge-spacing-s)', // Space below header
    marginBottom: 'var(--fableforge-spacing-m)', // Space above footer

    '@media (max-width: 768px)': { // Adjust for smaller screens
      padding: 'var(--fableforge-spacing-m)',
      marginTop: 'var(--fableforge-spacing-m)',
      marginBottom: 'var(--fableforge-spacing-m)',
      borderRadius: 'var(--fableforge-border-radii-m)',
    },
  },
  cardBorder: {
    padding: 'var(--fableforge-spacing-l)',
    border: '1em solid var(--fableforge-color-card-border)',
    borderRadius: 'var(--fableforge-border-radii-l)',
  },
  mainContent: {
    borderRadius: 'var(--fableforge-border-radii-l)',
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
