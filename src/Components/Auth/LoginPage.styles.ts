import { makeStyles /* shorthands removed if not used elsewhere */ } from '@griffel/react'
// Tokens are used via CSS variables, direct import might not be needed
// import { colorTokens, spacingTokens, typographyTokens, borderRadiiTokens } from '../../Theme/Tokens';

export const useLoginPageStyles = makeStyles({
  title: {
    fontFamily: 'var(--fableforge-typography-font-family-heading)',
    fontSize: 'var(--fableforge-typography-font-size3xl)',
    color: 'var(--fableforge-color-text-primary)',
    textAlign: 'center',
    marginBottom: 'var(--fableforge-spacing-l)',
  },
  errorMessage: {
    color: 'var(--fableforge-color-error)',
    fontSize: 'var(--fableforge-typography-font-size-s)',
    textAlign: 'center',
    minHeight: '1.5em',
    marginTop: 'var(--fableforge-spacing-xs)',
  },
  icon: {
    marginRight: '10px !important',
  },
  logo: {
    width: '100%', // Adjust as needed
    height: 'auto',
    marginBottom: 'var(--fableforge-spacing-l)',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--fableforge-spacing-m)',
  },
})
