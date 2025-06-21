import { useDeckMachineState } from '../../../Hooks/UseDeckMachineState'

// TODO: [DECK_MGMT_HOOK_IMPL] Further implement logic as DeckMachine evolves.

/**
 * Custom hook for the ManageDecksPage component.
 * This hook encapsulates the logic for fetching decks, handling deck creation,
 * navigation, and interaction with the DeckMachine by leveraging useDeckMachineState.
 */
export const useManageDecksPage = () => {
  const {
    decks,
    isLoading,
    error,
    send: sendToDeckMachine,
    // snapshot, // if needed for more complex logic or direct state matching
  } = useDeckMachineState()

  const handleCreateNewDeck = () => {
    if (sendToDeckMachine) {
      sendToDeckMachine({ type: 'CREATE_NEW_DECK' })
    } else {
      console.error('DeckMachine actor not available to send CREATE_NEW_DECK event')
    }
  }

  const handleEditDeck = (deckId: string) => {
    // TODO: Dispatch EDIT_DECK event to DeckMachine
    console.log('Edit deck clicked:', deckId)
    if (sendToDeckMachine) {
      // sendToDeckMachine({ type: 'EDIT_DECK', deckId }) // Example for later
    }
  }

  const handleDeleteDeck = (deckId: string) => {
    // TODO: Dispatch DELETE_DECK event to DeckMachine (likely after confirmation)
    console.log('Delete deck clicked:', deckId)
    if (sendToDeckMachine) {
      // sendToDeckMachine({ type: 'DELETE_DECK', deckId }) // Example for later
    }
  }

  return {
    decks,
    isLoading,
    error,
    handleCreateNewDeck,
    handleEditDeck,
    handleDeleteDeck,
  }
}
