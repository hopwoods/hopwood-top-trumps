import { makeStyles } from '@griffel/react'

export const useRegisterPageStyles = makeStyles({
  title: {
    fontFamily: 'var(--fableforge-typography-font-family-heading)',
    fontSize: 'var(--fableforge-typography-font-size3xl)',
    color: 'var(--fableforge-color-text-primary)',
    textAlign: 'center',
    marginBottom: 'var(--fableforge-spacing-l)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--fableforge-spacing-m)',
    width: '80%', // Form takes 80% of its container (the card)
    margin: '0 auto', // Center the form
  },
  logo: {
    width: '100%', // Logo takes full width of its parent (the form)
    height: 'auto',
    marginBottom: 'var(--fableforge-spacing-l)', // e.g., 1.5em
    display: 'block', // Ensure it behaves as a block for width and margin auto to work if needed
    // marginLeft: 'auto', // Not needed if width is 100%
    // marginRight: 'auto', // Not needed if width is 100%
  },
  errorMessage: {
    color: 'var(--fableforge-color-danger-foreground)', // Or your theme's error color
    backgroundColor: 'var(--fableforge-color-danger-background)', // Optional: background for error
    padding: 'var(--fableforge-spacing-s)',
    borderRadius: 'var(--fableforge-border-s)',
    textAlign: 'center',
    fontSize: 'var(--fableforge-typography-font-size-s)',
    marginBottom: 'var(--fableforge-spacing-m)',
  },
  // toggleLink style will be inherited from AuthPage.styles.ts
  // No need to redefine it here if RegisterPage is always a child of AuthPage
  // and AuthPage provides the toggle link.
})
