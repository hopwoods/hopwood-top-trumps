import { makeStyles, mergeClasses } from '@griffel/react'

export const useButtonStyles = makeStyles({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--fableforge-spacing-s)',
    paddingTop: 'var(--fableforge-spacing-s)',
    paddingBottom: 'var(--fableforge-spacing-s)',
    paddingLeft: 'var(--fableforge-spacing-m)',
    paddingRight: 'var(--fableforge-spacing-m)',
    fontSize: 'var(--fableforge-typography-font-size-s)',
    fontFamily: 'var(--fableforge-typography-font-family-body)',
    fontWeight: 'var(--fableforge-typography-font-weight-medium)',
    borderRadius: 'var(--fableforge-border-m)',
    border: '1px solid transparent',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none', // In case it's used as a link styled as a button
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease-in-out',
    transitionProperty: 'background-color, border-color, color, box-shadow',


    ':focus-visible': {
      outlineOffset: '2px',
      outlineWidth: '2px',
      outlineStyle: 'solid',
    },
  },
  buttonContent: {
    display: 'grid',
    gridTemplateColumns: '1.5em 1fr',
    gridTemplateRows: 'min-content',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: 'var(--fableforge-color-brand-primary)',
    color: 'var(--fableforge-color-text-primary)',
    ':hover': {
      backgroundColor: 'var(--fableforge-color-brand-primary-hover)',
    },
    ':active': {
      backgroundColor: 'var(--fableforge-color-brand-primary-active)',
    },
    ':focus-visible': {
      outlineColor: 'var(--fableforge-color-brand-secondary)',
    },
  },
  secondary: {
    backgroundColor: 'var(--fableforge-color-panel)',
    color: 'var(--fableforge-color-text-primary)',
    borderTopColor: 'var(--fableforge-color-border-opaque)',
    borderRightColor: 'var(--fableforge-color-border-opaque)',
    borderBottomColor: 'var(--fableforge-color-border-opaque)',
    borderLeftColor: 'var(--fableforge-color-border-opaque)',
    ':hover': {
      backgroundColor: 'var(--fableforge-color-background-subtle)',
      borderTopColor: 'var(--fableforge-color-border-subtle)',
      borderRightColor: 'var(--fableforge-color-border-subtle)',
      borderBottomColor: 'var(--fableforge-color-border-subtle)',
      borderLeftColor: 'var(--fableforge-color-border-subtle)',
    },
    ':active': {
      backgroundColor: 'var(--fableforge-color-background-body)', // Darker subtle for active
    },
    ':focus-visible': {
      outlineColor: 'var(--fableforge-color-brand-secondary)',
      borderTopColor: 'var(--fableforge-color-brand-secondary)', // Highlight border on focus
      borderRightColor: 'var(--fableforge-color-brand-secondary)', // Highlight border on focus
      borderBottomColor: 'var(--fableforge-color-brand-secondary)', // Highlight border on focus
      borderLeftColor: 'var(--fableforge-color-brand-secondary)', // Highlight border on focus
    },
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    // Ensure hover/active states don't override disabled look
    ':hover': {
      // Keep disabled styles
    },
    ':active': {
      // Keep disabled styles
    },
  },
  // For isLoading state, content (text/icons) will be hidden by the component
  // and a spinner shown. The button itself might need specific styles for this.
  loading: {
    position: 'relative', // For spinner positioning
    // Potentially change background or add an overlay if needed
  },
  // contentHidden style is no longer needed as Button.tsx uses conditional rendering for content.
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'currentColor', // Inherit color from button text
  },
  iconStyles: {
    display: 'flex',
    margin: 0,
    marginRight: 'var(--fableforge-spacing-s)',
    position: 'relative',
    top: '0.05em'
  },
  danger: {
    // TODO: Define danger color tokens in Theme/Tokens.ts and use them here
    backgroundColor: 'var(--fableforge-color-danger-default, #dc3545)', // Fallback red
    color: 'var(--fableforge-color-text-on-danger, white)', // Fallback white
    borderTopColor: 'var(--fableforge-color-danger-border, #dc3545)',
    borderRightColor: 'var(--fableforge-color-danger-border, #dc3545)',
    borderBottomColor: 'var(--fableforge-color-danger-border, #dc3545)',
    borderLeftColor: 'var(--fableforge-color-danger-border, #dc3545)',
    ':hover': {
      backgroundColor: 'var(--fableforge-color-danger-hover, #c82333)', // Darker red
      borderTopColor: 'var(--fableforge-color-danger-hover-border, #bd2130)',
      borderRightColor: 'var(--fableforge-color-danger-hover-border, #bd2130)',
      borderBottomColor: 'var(--fableforge-color-danger-hover-border, #bd2130)',
      borderLeftColor: 'var(--fableforge-color-danger-hover-border, #bd2130)',
    },
    ':active': {
      backgroundColor: 'var(--fableforge-color-danger-active, #bd2130)', // Even darker red
      borderTopColor: 'var(--fableforge-color-danger-active-border, #b21f2d)',
      borderRightColor: 'var(--fableforge-color-danger-active-border, #b21f2d)',
      borderBottomColor: 'var(--fableforge-color-danger-active-border, #b21f2d)',
      borderLeftColor: 'var(--fableforge-color-danger-active-border, #b21f2d)',
    },
    ':focus-visible': {
      outlineColor: 'var(--fableforge-color-danger-focus, #fd7e14)', // Example focus color
    },
  },
})

// Helper for merging classes, can be used in the component
export { mergeClasses }
