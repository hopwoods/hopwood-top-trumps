import { makeStyles } from '@griffel/react' // shorthands removed
// typographyTokens and spacingTokens are no longer directly used as values are CSS variables
// import { typographyTokens, spacingTokens } from '../../Theme/Tokens'

export const useLoadingIndicatorStyles = makeStyles({
  root: {
    padding: 'var(--fableforge-spacing-xl)',
    textAlign: 'center',
    fontSize: 'var(--fableforge-typography-font-size-l)',
    color: 'var(--fableforge-color-text-secondary)',
  },
  icon: {
    color: 'var(--fableforge-color-brand-secondary)',
  },
  text: {
    marginTop: 'var(--fableforge-spacing-m)',
    fontFamily: 'var(--fableforge-typography-font-family-body)',
  },
})
