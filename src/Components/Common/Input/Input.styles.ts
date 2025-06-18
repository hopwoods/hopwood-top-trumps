import { makeStyles } from '@griffel/react'

export const useInputStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--fableforge-spacing-xs)',
  },
  label: {
    fontSize: 'var(--fableforge-typography-font-size-s)',
    color: 'var(--fableforge-color-text-secondary)',
    fontWeight: 'var(--fableforge-typography-font-weight-regular)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--fableforge-spacing-xs)',
  },
  input: {
    fontFamily: 'var(--fableforge-typography-font-family-body)',
    fontSize: 'var(--fableforge-typography-font-size-m)',
    paddingTop: 'var(--fableforge-spacing-s)',
    paddingBottom: 'var(--fableforge-spacing-s)',
    paddingLeft: 'var(--fableforge-spacing-m)',
    paddingRight: 'var(--fableforge-spacing-m)',
    borderRadius: 'var(--fableforge-border-s)',
    borderTopColor: 'var(--fableforge-color-border-opaque)',
    borderRightColor: 'var(--fableforge-color-border-opaque)',
    borderBottomColor: 'var(--fableforge-color-border-opaque)',
    borderLeftColor: 'var(--fableforge-color-border-opaque)',
    backgroundColor: 'var(--fableforge-color-background-subtle)',
    color: 'var(--fableforge-color-text-primary)',
    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    ':focus': {
      borderTopColor: 'var(--fableforge-color-brand-primary)',
      borderRightColor: 'var(--fableforge-color-brand-primary)',
      borderBottomColor: 'var(--fableforge-color-brand-primary)',
      borderLeftColor: 'var(--fableforge-color-brand-primary)',
      boxShadow: '0 0 0 3px var(--fableforge-color-brand-primary)4D',
      outlineStyle: 'none',
    },
  },
  errorMessage: {
    color: 'var(--fableforge-color-error)',
    fontSize: 'var(--fableforge-typography-font-size-s)',
    textAlign: 'left',
    minHeight: '1.5em',
    marginTop: 'var(--fableforge-spacing-xs)',
  },
  icon: {
    // marginRight: 'var(--fableforge-spacing-xs)',
  },
})
