import { useDeckMachineState } from '../../../Hooks/UseDeckMachineState'
// No longer need to import Deck type here as it's inferred from useDeckMachineState return

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
      // This case should ideally not happen if the deckMachineActor is always available
      // when this page is rendered.
      console.error('DeckMachine actor not available to send CREATE_NEW_DECK event')
    }
  }

  return {
    decks,
    isLoading,
    error,
    handleCreateNewDeck,
  }
}
