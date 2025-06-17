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
    fontSize: 'var(--fableforge-typography-font-size-m)',
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
    backgroundColor: 'var(--fableforge-color-panel-color)',
    color: 'var(--fableforge-color-text-primary)',
    borderColor: 'var(--fableforge-color-border-opaque)',
    borderStyle: 'solid', // Ensure border is visible
    ':hover': {
      backgroundColor: 'var(--fableforge-color-background-subtle)',
      borderColor: 'var(--fableforge-color-border-subtle)',
    },
    ':active': {
      backgroundColor: 'var(--fableforge-color-background-body)', // Darker subtle for active
    },
    ':focus-visible': {
      outlineColor: 'var(--fableforge-color-brand-secondary)',
      borderColor: 'var(--fableforge-color-brand-secondary)', // Highlight border on focus
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
  contentHidden: {
    visibility: 'hidden',
  },
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'currentColor', // Inherit color from button text
  },
  icon: {
    // Basic icon styling if needed, e.g., display: 'flex'
  },
})

// Helper for merging classes, can be used in the component
export { mergeClasses }
