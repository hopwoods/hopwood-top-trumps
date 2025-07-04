import { makeStyles } from '@griffel/react'

export const useTextAreaStyles = makeStyles({
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
  textarea: {
    fontFamily: 'var(--fableforge-typography-font-family-body)',
    fontSize: 'var(--fableforge-typography-font-size-m)',

    paddingTop: 'var(--fableforge-spacing-xs)',
    paddingBottom: 'var(--fableforge-spacing-xs)',
    paddingLeft: 'var(--fableforge-spacing-s)',
    paddingRight: 'var(--fableforge-spacing-s)',

    border: '1px solid var(--fableforge-color-input-border)',
    borderRadius: 'var(--fableforge-border-radii-s)',

    backgroundColor: 'var(--fableforge-color-input-background)',
    color: 'var(--fableforge-color-text-primary)',

    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',

    ':focus': {
      borderTopColor: 'var(--fableforge-color-brand-secondary)',
      borderRightColor: 'var(--fableforge-color-brand-secondary)',
      borderBottomColor: 'var(--fableforge-color-brand-secondary)',
      borderLeftColor: 'var(--fableforge-color-brand-secondary)',

      boxShadow: '0 0 0 3px var(--fableforge-color-brand-secondary)4D',
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
