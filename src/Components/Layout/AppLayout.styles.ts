import { makeStyles /* shorthands removed if not used elsewhere */ } from '@griffel/react'
// spacingTokens import removed as we'll use CSS variables directly

export const useAppLayoutStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor is inherited from body (var(--fableforge-color-background-body))
  },
  header: {
    backgroundColor: 'var(--fableforge-color-panel-color)',
    paddingTop: 'var(--fableforge-spacing-m)',
    paddingBottom: 'var(--fableforge-spacing-m)',
    paddingLeft: 'var(--fableforge-spacing-l)',
    paddingRight: 'var(--fableforge-spacing-l)',
    // boxShadow: 'var(--fableforge-shadow-s)',
    // borderBottom: '1px solid var(--fableforge-color-border-subtle)'
  },
  main: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: 'var(--fableforge-color-panel-color)',
    padding: 'var(--fableforge-spacing-m)',
    textAlign: 'center',
    color: 'var(--fableforge-color-text-secondary)',
    fontSize: 'var(--fableforge-typography-font-size-s)',
    // borderTop: '1px solid var(--fableforge-color-border-subtle)'
  },
})
