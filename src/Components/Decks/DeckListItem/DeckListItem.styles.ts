import { makeStyles } from '@griffel/react'

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
    borderRadius: 'var(--fableforge-shape-border-radius-medium)',
    border: '1px solid var(--fableforge-color-border-default)',
    boxShadow: 'var(--fableforge-shadow-sm)',
    transitionProperty: 'box-shadow, transform',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease-in-out',
    ':hover': {
      backgroundColor: 'var(--fableforge-color-background-body)',
      boxShadow: 'var(--fableforge-shadow-md)',
    },
  },
  deckInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--fableforge-spacing-xs)',
  },
  deckName: {
    fontSize: 'var(--fableforge-typography-font-size2xl)',
    color: 'var(--fableforge-color-text-primary)',
    margin: '0',
    justifyContent: 'start',
    textAlign: 'left',
  },
  deckMeta: {
    display: 'flex',
    flexGrow: 1,
    fontSize: 'var(--fableforge-typography-font-size-small)',
    color: 'var(--fableforge-color-text-secondary)',
    margin: '0',
    width: 'max-content',
  },
  actionsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--fableforge-spacing-s)',
  },
})
