import { makeStyles } from '@griffel/react'

export const useManageDecksPageStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the start
    minHeight: 'calc(100vh - var(--fableforge-spacing-xxl))', // Adjust based on header/footer height
    backgroundColor: 'var(--fableforge-color-background-page)',
    color: 'var(--fableforge-color-text-default)',
    width: '100%',
  },
  headerContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: '3em',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'var(--fableforge-typography-font-weight-bold)',
    color: 'var(--fableforge-color-text-emphasis)',
    justifySelf: 'start',
  },
  createDeckButton: {
    justifySelf: 'end',
    alignSelf: 'center',
  },
  deckListContainer: {
    width: '100%',
    textAlign: 'center',
  },
  noDecksMessage: {
    fontSize: 'var(--fableforge-typography-font-size-body)',
    color: 'var(--fableforge-color-text-secondary)',
  },
  confirmDeleteContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--fableforge-spacing-l)',
  },
  confirmDeleteButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 'var(--fableforge-spacing-m)',
  },
  // TODO: [DECK_MGMT_UI_STYLING] Add styles for deck items when data is available
})
