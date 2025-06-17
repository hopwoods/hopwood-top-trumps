import { makeStyles /* shorthands removed if not used elsewhere */ } from '@griffel/react'
// Tokens are used via CSS variables, direct import might not be needed
// import { colorTokens, spacingTokens, typographyTokens, borderRadiiTokens } from '../../Theme/Tokens';

export const useLoginPageStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--fableforge-spacing-m)',
  },
  title: {
    fontFamily: 'var(--fableforge-typography-font-family-heading)',
    fontSize: 'var(--fableforge-typography-font-size3xl)',
    color: 'var(--fableforge-color-text-primary)',
    textAlign: 'center',
    marginBottom: 'var(--fableforge-spacing-l)',
  },
  fieldContainer: {
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
    border: '1px solid var(--fableforge-color-border-opaque)',
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
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--fableforge-spacing-s)',
    padding: 'var(--fableforge-spacing-s)',
    fontSize: 'var(--fableforge-typography-font-size-m)',
    fontWeight: 'var(--fableforge-typography-font-weight-medium)',
    borderRadius: 'var(--fableforge-border-m)',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
    textAlign: 'center',
    border: '1px solid transparent',
  },
  submitButton: {
    backgroundColor: 'var(--fableforge-color-brand-primary)',
    color: 'var(--fableforge-color-text-primary)',
    ':hover': {
      backgroundColor: 'var(--fableforge-color-brand-primary-hover)',
    },
    ':focus-visible': {
      outlineOffset: '2px',
      outline: '2px solid var(--fableforge-color-brand-secondary)',
    },
  },
  googleButton: {
    backgroundColor: 'var(--fableforge-color-panel-color)',
    color: 'var(--fableforge-color-text-primary)',
    border: '1px solid var(--fableforge-color-border-opaque)',
    ':hover': {
      backgroundColor: 'var(--fableforge-color-background-subtle)',
      borderTopColor: 'var(--fableforge-color-border-subtle)',
      borderRightColor: 'var(--fableforge-color-border-subtle)',
      borderBottomColor: 'var(--fableforge-color-border-subtle)',
      borderLeftColor: 'var(--fableforge-color-border-subtle)',
    },
    ':focus-visible': {
      outlineOffset: '2px',
      outline: '2px solid var(--fableforge-color-brand-secondary)',
    },
  },
  errorMessage: {
    color: 'var(--fableforge-color-error)',
    fontSize: 'var(--fableforge-typography-font-size-s)',
    textAlign: 'center',
    minHeight: '1.5em',
    marginTop: 'var(--fableforge-spacing-xs)',
  },
  icon: {
    // marginRight: 'var(--fableforge-spacing-xs)',
  },
})
