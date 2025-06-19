import { makeStyles } from '@griffel/react'

export const useHeaderStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'var(--hopwood-color-panel-color)',
    paddingTop: 'var(--hopwood-spacing-m)',
    paddingBottom: 'var(--hopwood-spacing-m)',
    paddingLeft: 'var(--hopwood-spacing-l)',
    paddingRight: 'var(--hopwood-spacing-l)',
    boxShadow: 'var(--hopwood-shadow-s)',
    borderBottom: '1px solid var(--hopwood-color-border-subtle)',
  },
  logo: {
    fontSize: 'var(--hopwood-typography-font-size-2xl)',
    fontWeight: 'var(--hopwood-typography-font-weight-bold)',
    color: 'var(--hopwood-color-brand-primary)',
    textDecorationLine: 'none',
    cursor: 'pointer',
  },
  nav: {
    display: 'flex',
    gap: 'var(--hopwood-spacing-l)',
  },
  navLink: {
    color: 'var(--hopwood-color-text-primary)',
    textDecorationLine: 'none',
    fontSize: 'var(--hopwood-typography-font-size-m)',
    fontWeight: 'var(--hopwood-typography-font-weight-medium)',
    '&:hover': {
      color: 'var(--hopwood-color-brand-secondary)',
    },
  },
  logoutButton: {
    // Inherit button styles from Common/Button if needed, or define here
    backgroundColor: 'var(--hopwood-color-brand-primary)',
    color: 'var(--hopwood-color-text-primary)',
    padding: 'var(--hopwood-spacing-xs) var(--hopwood-spacing-s)',
    borderRadius: 'var(--hopwood-border-radii-s)',
    border: 'none',
    cursor: 'pointer',
    fontSize: 'var(--hopwood-typography-font-size-s)',
    fontWeight: 'var(--hopwood-typography-font-weight-medium)',
    '&:hover': {
      backgroundColor: 'var(--hopwood-color-brand-primary-hover)',
    },
    '&:active': {
      backgroundColor: 'var(--hopwood-color-brand-primary-active)',
    },
  },
})
