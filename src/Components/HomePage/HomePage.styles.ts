import { makeStyles /* shorthands removed if not used elsewhere */ } from '@griffel/react'
// Tokens are used via CSS variables
// import { typographyTokens, spacingTokens, borderRadiiTokens } from '../../Theme/Tokens';

export const useHomePageStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: 'var(--fableforge-spacing-xl)',
  },
  title: {
    fontFamily: 'var(--fableforge-typography-font-family-heading)',
    fontSize: 'var(--fableforge-typography-font-size4xl)',
    color: 'var(--fableforge-color-text-primary)',
    marginBottom: 'var(--fableforge-spacing-l)',
  },
  userInfo: {
    fontFamily: 'var(--fableforge-typography-font-family-body)',
    fontSize: 'var(--fableforge-typography-font-size-m)',
    color: 'var(--fableforge-color-text-secondary)',
    marginBottom: 'var(--fableforge-spacing-xl)',
  },
  icon: {
    // marginRight: 'var(--hopwood-spacing-xs)', // If gap on parent isn't enough
  },
})
