import { makeStyles } from '@griffel/react'

export const useHeaderStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gridTemplateRows: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'var(--fableforge-color-panel-color)',
    color: 'var(--fableforge-color-text-primary)',
    paddingTop: 'var(--fableforge-spacing-m)',
    paddingBottom: 'var(--fableforge-spacing-s)',
    paddingLeft: 'var(--fableforge-spacing-s)',
    paddingRight: 'var(--fableforge-spacing-s)',
    zIndex: 0,
    height: '4em',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifySelf: 'start',
    cursor: 'pointer',
    '& img': {
      cursor: 'pointer',
      width: '14em',
      display: 'inline-block',
      alignSelf: 'center',
    }
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'var(--fableforge-spacing-l)',
    alignItems: 'center',
  },
  menu: {
    position: 'fixed',
    top: '1em',
    right: '1em',
    backgroundColor: 'var(--fableforge-color-header)',
    boxShadow: 'var(--fableforge-shadow-m)',
    borderRadius: 'var(--fableforge-border-radii-m)',
    zIndex: 1000,
    padding: 'var(--fableforge-spacing-s)',
    width: '10em',
    display: 'flex',
    flexDirection: 'column',
  },
  navLink: {
    color: 'var(--fableforge-color-text-primary)',
    textDecorationLine: 'none',
    fontSize: 'var(--fableforge-typography-font-size-m)',
    fontWeight: 'var(--fableforge-typography-font-weight-medium)',
    '&:hover': {
      color: 'var(--fableforge-color-brand-secondary)',
    },
  },
  logoutButton: {
    justifySelf: 'end',
  },
})
