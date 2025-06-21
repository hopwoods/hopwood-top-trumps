import { makeStyles, shorthands } from '@griffel/react'

export const useDeckListItemStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 'var(--fableforge-spacing-m)',
    paddingBottom: 'var(--fableforge-spacing-m)',
    paddingLeft: 'var(--fableforge-spacing-l)',
    paddingRight: 'var(--fableforge-spacing-l)',
    marginBottom: 'var(--fableforge-spacing-m)',
    backgroundColor: 'var(--fableforge-color-background-surface)',
    ...shorthands.borderRadius('var(--fableforge-shape-border-radius-medium)'),
    ...shorthands.border('1px', 'solid', 'var(--fableforge-color-border-default)'),
    boxShadow: 'var(--fableforge-shadow-sm)',
    transitionProperty: 'box-shadow, transform',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease-in-out',
    ':hover': {
      boxShadow: 'var(--fableforge-shadow-md)',
      transform: 'translateY(-2px)',
    },
  },
  deckInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--fableforge-spacing-xs)',
  },
  deckName: {
    fontSize: 'var(--fableforge-typography-font-size-large)',
    fontWeight: 'var(--fableforge-typography-font-weight-semibold)',
    color: 'var(--fableforge-color-text-primary)',
    margin: '0',
  },
  deckMeta: {
    fontSize: 'var(--fableforge-typography-font-size-small)',
    color: 'var(--fableforge-color-text-secondary)',
    margin: '0',
  },
  actionsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--fableforge-spacing-s)',
  },
})
