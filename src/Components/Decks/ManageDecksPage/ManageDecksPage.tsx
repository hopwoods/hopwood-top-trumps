import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../../Common/Button/Button'
import { useManageDecksPageStyles } from './ManageDecksPage.styles'
import { useManageDecksPage } from './UseManageDecksPage'
import { DeckListItem } from '../DeckListItem/DeckListItem' // Import DeckListItem
// TODO: [DECK_MGMT_UI_ICONS] Import icons if needed for buttons or list items

/**
 * ManageDecksPage component.
 * This page allows users to view, create, edit, and delete their decks.
 */
const ManageDecksPage = () => {
  const styles = useManageDecksPageStyles()
  const {
    decks,
    isLoading,
    error,
    handleCreateNewDeck,
    handleEditDeck,
    handleDeleteDeck,
  } = useManageDecksPage()

  // TODO: [DECK_MGMT_UI_LOADING_ERROR] Implement proper loading and error state UI
  if (isLoading) {
    return <div className={styles.root}>Loading decks...</div> // Placeholder
  }

  if (error !== null) {
    // Explicitly assert error to Error type after null check
    const err = error as Error
    return (
      <div className={styles.root}>
        Error loading decks: {err.message} {/* Placeholder */}
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>Manage Decks</h1>
        <span className={styles.createDeckButton}>
          <Button variant="primary" onClick={handleCreateNewDeck} iconLeft={faPlus} className={styles.createDeckButton}>
            {/* TODO: [DECK_MGMT_UI_LOADING] Add isLoading prop if button should be disabled during machine transitions */}

            Create New Deck
          </Button>
        </span>
      </div>

      <div className={styles.deckListContainer}>
        {decks.length === 0
          ? <p className={styles.noDecksMessage}>
            You haven't created any decks yet. Get started by creating one!
          </p>
          : <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
            {decks.map(deck => (
              <DeckListItem
                key={deck.id}
                deck={deck}
                onEdit={handleEditDeck}
                onDelete={handleDeleteDeck}
              />
            ))}
          </ul>
        }
      </div>
      {/* TODO: [DECK_MGMT_UI_MODALS] Add Modals for deck creation/editing if not a separate page/view */}
    </div>
  )
}

export default ManageDecksPage
