import { setup, assign } from 'xstate'
import type { DeckMachineContext, DeckMachineEvents } from './DeckMachine.types'
import { appMachineInspector } from '../AppMachine/stateInspector' // Import the inspector
import { fetchDecksActor } from './Actors/FetchDecks.actor'
import { saveDeckActor } from './Actors/SaveDeck.actor'
import { deleteDeckActor } from './Actors/DeleteDeck.actor'

export const deckMachine = setup({
  types: {} as {
    context: DeckMachineContext,
    events: DeckMachineEvents,
    // input: any, // If the machine accepts input
  },
  actors: {
    fetchDecksActor,
    saveDeckActor,
    deleteDeckActor,
  },
  actions: {
    assignDecksToContext: assign({
      decks: ({ event }) => {
        if (event.type === 'FETCH_DECKS_SUCCESS') {
          return event.output
        }
        return [] // Should not happen if types are correct
      },
    }),
    assignSelectedDeckToContext: assign({
      selectedDeck: ({ event, context }) => {
        if (event.type === 'SAVE_DECK_SUCCESS') {
          return event.output
        }
        // If called in other contexts where event is not SAVE_DECK_SUCCESS,
        // it might need to behave differently or this action should be more specific.
        // For now, this covers the usage in savingDeck.onDone.
        // Fallback to existing selectedDeck if event is not relevant for this action's primary purpose here.
        return context.selectedDeck
      },
    }),
    clearSelectedDeck: assign({
      selectedDeck: null,
    }),
    assignErrorToContext: assign({
      error: ({ event }) => {
        if (
          event.type === 'FETCH_DECKS_FAILURE' ||
          event.type === 'SAVE_DECK_FAILURE' ||
          event.type === 'DELETE_DECK_FAILURE'
        ) {
          return event.error
        }
        return null
      },
    }),
    clearError: assign({
      error: null,
    }),
    // TODO: [DECK_MGMT_ACTIONS] Add more actions for card operations
    // e.g., addCardToSelectedDeck, updateCardInSelectedDeck, removeCardFromSelectedDeck
  },
  guards: {
    // TODO: [DECK_MGMT_GUARDS] Add guards if needed (e.g., canEditDeck)
  },
}).createMachine({
  id: 'deckMachine',
  inspect: process.env.NODE_ENV === 'development' ? appMachineInspector : undefined,
  initial: 'initializing',
  context: {
    decks: [],
    selectedDeck: null,
    error: null,
  } satisfies DeckMachineContext,
  states: {
    initializing: {
      always: 'loadingDecks', // Or could fetch initial data here if needed immediately
    },
    loadingDecks: {
      invoke: {
        src: 'fetchDecksActor',
        onDone: {
          target: 'viewingDeckList',
          actions: ['assignDecksToContext', 'clearError'],
        },
        onError: {
          target: 'error',
          actions: 'assignErrorToContext',
        },
      },
    },
    viewingDeckList: {
      on: {
        FETCH_DECKS: 'loadingDecks',
        CREATE_NEW_DECK: 'creatingDeck',
        EDIT_DECK: {
          target: 'editingDeck',
          // actions: 'assignSelectedDeckToContext' // This needs careful handling of how selectedDeck is populated
        },
        DELETE_DECK: 'deletingDeck', // Transition to a state to confirm and invoke delete
      },
    },
    creatingDeck: {
      // This state would manage the UI for a new deck form
      entry: ['clearSelectedDeck', 'clearError'], // Start with a clean slate
      on: {
        SAVE_DECK: 'savingDeck',
        CANCEL_DECK_EDIT: 'viewingDeckList', // Or 'idle' if that's more appropriate
        VIEW_DECK_LIST: 'viewingDeckList',
      },
      // TODO: [DECK_MGMT_CARD_CREATE_UI] Define how cards are added during creation
    },
    editingDeck: {
      // This state manages UI for editing an existing deck (name, description, cards)
      // It should have the selectedDeck in context
      entry: 'clearError',
      on: {
        SAVE_DECK: 'savingDeck',
        ADD_CARD_TO_DECK: {
          // actions: 'addCardToSelectedDeck' // Action to update selectedDeck in context
        },
        UPDATE_CARD_IN_DECK: {
          // actions: 'updateCardInSelectedDeck'
        },
        REMOVE_CARD_FROM_DECK: {
          // actions: 'removeCardFromSelectedDeck'
        },
        CANCEL_DECK_EDIT: {
          target: 'viewingDeckList',
          actions: 'clearSelectedDeck',
        },
        VIEW_DECK_LIST: {
          target: 'viewingDeckList',
          actions: 'clearSelectedDeck',
        },
      },
    },
    savingDeck: {
      invoke: {
        src: 'saveDeckActor',
        input: ({ event }) => { // Removed unused 'context'
          if (event.type === 'SAVE_DECK') {
            return { deck: event.deck }
          }
          // This should not happen if machine logic is correct
          throw new Error('Invalid event for saving deck')
        },
        onDone: {
          target: 'loadingDecks', // Or directly to viewingDeckList/editingDeck with updated data
          actions: [
            'assignSelectedDeckToContext', // Assigns the saved deck
            // TODO: [DECK_MGMT_SAVE_SUCCESS] Potentially update context.decks as well or refetch
            'clearError',
          ],
        },
        onError: {
          target: 'error', // Or back to creating/editing with error displayed
          actions: 'assignErrorToContext',
        },
      },
    },
    deletingDeck: {
      invoke: {
        src: 'deleteDeckActor',
        input: ({ event }) => {
          if (event.type === 'DELETE_DECK') {
            return { deckId: event.deckId }
          }
          throw new Error('Invalid event for deleting deck')
        },
        onDone: {
          target: 'loadingDecks', // Refresh deck list
          // TODO: [DECK_MGMT_DELETE_SUCCESS] Action to remove deck from context.decks if not refetching
          actions: ['clearSelectedDeck', 'clearError'],
        },
        onError: {
          target: 'error',
          actions: 'assignErrorToContext',
        },
      },
    },
    error: {
      on: {
        FETCH_DECKS: 'loadingDecks', // Allow retrying
        // TODO: [DECK_MGMT_ERROR_HANDLING] Add other recovery events
      },
    },
  },
})
