import { makeStyles } from '@griffel/react'

export const useHeaderStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '0.33fr 0.33fr 0.33fr',
    gridTemplateRows: 'auto',
    gap: 'var(--fableforge-spacing-s)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'var(--fableforge-color-panel-color)',
    color: 'var(--fableforge-color-text-primary)',
    paddingTop: 'var(--fableforge-spacing-m)',
    paddingBottom: 'var(--fableforge-spacing-s)',
    paddingLeft: 'var(--fableforge-spacing-s)',
    paddingRight: 'var(--fableforge-spacing-s)',
    zIndex: 0,
    height: '6em',
    fontFamily: 'var(--fableforge-typography-font-family-heading)',
  },
  icon: {
    marginRight: 'var(--fableforge-spacing-s)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifySelf: 'start',
    flexGrow: 1,
    cursor: 'pointer',
    '& img': {
      width: '100%',
      cursor: 'pointer',
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
    cursor: 'pointer',
    
    '&:hover': {
      color: 'var(--fableforge-color-brand-secondary)',
    },
  },
  logoutButton: {
    justifySelf: 'end',
  },
})
