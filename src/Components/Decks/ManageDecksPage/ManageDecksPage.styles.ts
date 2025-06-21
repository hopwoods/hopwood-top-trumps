import { makeStyles } from '@griffel/react'

export const useManageDecksPageStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the start
    minHeight: 'calc(100vh - var(--fableforge-spacing-xxl))', // Adjust based on header/footer height
    paddingTop: 'var(--fableforge-spacing-xl)',
    paddingBottom: 'var(--fableforge-spacing-xl)',
    paddingLeft: 'var(--fableforge-spacing-m)',
    paddingRight: 'var(--fableforge-spacing-m)',
    backgroundColor: 'var(--fableforge-color-background-page)',
    color: 'var(--fableforge-color-text-default)',
    boxSizing: 'border-box',
    width: '100%',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px', // Max width for content
    marginBottom: 'var(--fableforge-spacing-xl)',
  },
  title: {
    fontSize: 'var(--fableforge-typography-font-size-h2)',
    fontWeight: 'var(--fableforge-typography-font-weight-bold)',
    color: 'var(--fableforge-color-text-emphasis)',
    margin: '0',
  },
  deckListContainer: {
    width: '100%',
    maxWidth: '800px',
    textAlign: 'center',
  },
  noDecksMessage: {
    fontSize: 'var(--fableforge-typography-font-size-body)',
    color: 'var(--fableforge-color-text-secondary)',
    marginTop: 'var(--fableforge-spacing-l)',
  },
  // TODO: [DECK_MGMT_UI_STYLING] Add styles for deck items when data is available
})
