import { setup, assign } from 'xstate'
import type { DeckMachineContext, DeckMachineEvents, DeckMachineInput } from './DeckMachine.types'
import { appMachineInspector } from '../AppMachine/stateInspector' // Import the inspector
import { fetchDecksActor } from './Actors/FetchDecks.actor'
import { saveDeckActor } from './Actors/SaveDeck.actor'
import { deleteDeckActor } from './Actors/DeleteDeck.actor'

export const deckMachine = setup({
  types: {} as {
    context: DeckMachineContext,
    events: DeckMachineEvents,
    input: DeckMachineInput,
  },
  actors: {
    fetchDecksActor,
    saveDeckActor,
    deleteDeckActor,
  },
  actions: {
    assignDecksToContext: assign({
      decks: ({ event }) => {
        // This action is specifically for the onDone of fetchDecksActor
        if ('output' in event && Array.isArray(event.output)) {
          return event.output
        }
        // Fallback or error logging if event doesn't have expected output
        console.warn('assignDecksToContext called with an event without expected output:', event)
        return [] // Default to empty array if output is not as expected
      },
    }),
    assignSelectedDeckToContext: assign({
      selectedDeck: ({ event }) => {
        if (event.type === 'EDIT_DECK') {
          return event.deck;
        }
        if (event.type === 'SAVE_DECK_SUCCESS') {
          return event.output;
        }
        return null;
      },
    }),
    assignDeckToDeleteToContext: assign({
      deckToDelete: ({ event }) => {
        if (event.type === 'DELETE_DECK') {
          return { id: event.deckId, name: event.deckName };
        }
        return null;
      },
    }),
    clearDeckToDelete: assign({
      deckToDelete: null,
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
  },
  guards: {
    // TODO: [DECK_MGMT_GUARDS] Add guards if needed
  },
}).createMachine({
  id: 'deckMachine',
  inspect: process.env.NODE_ENV === 'development' ? appMachineInspector : undefined,
  initial: 'initializing',
  context: ({ input }) => ({
    userId: input.userId,
    decks: [],
    selectedDeck: null,
    deckToDelete: null,
    error: null,
  }) satisfies DeckMachineContext,
  states: {
    initializing: {
      always: 'loadingDecks',
    },
    loadingDecks: {
      invoke: {
        src: 'fetchDecksActor',
        input: ({ context }) => {
          if (!context.userId) {
            console.error('DeckMachine: userId is null when trying to fetch decks.');
            throw new Error('User ID is missing, cannot fetch decks.');
          }
          return { userId: context.userId };
        },
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
          actions: 'assignSelectedDeckToContext', // Assign the deck to be edited to context
        },
        DELETE_DECK: {
          target: 'confirmingDelete',
          actions: 'assignDeckToDeleteToContext',
        },
      },
    },
    creatingDeck: {
      tags: ['deck-form'],
      entry: ['clearSelectedDeck', 'clearError'],
      on: {
        SAVE_DECK: 'savingDeck',
        CANCEL_DECK_EDIT: 'viewingDeckList',
        VIEW_DECK_LIST: 'viewingDeckList',
      },
      // TODO: [DECK_MGMT_CARD_CREATE_UI]
    },
    editingDeck: {
      tags: ['deck-form'],
      entry: 'clearError',
      on: {
        SAVE_DECK: 'savingDeck',
        ADD_CARD_TO_DECK: {
          // actions: 'addCardToSelectedDeck'
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
      tags: ['saving'],
      invoke: {
        src: 'saveDeckActor',
        input: ({ context, event }) => {
          if (event.type === 'SAVE_DECK') {
            if (!event.deck.id && !context.userId) {
              console.error('DeckMachine: userId is null when trying to create a new deck via saveDeckActor.');
              throw new Error('User ID is missing, cannot create new deck.');
            }
            return { deck: event.deck, userId: context.userId };
          }
          throw new Error('Invalid event for saving deck');
        },
        onDone: {
          target: 'loadingDecks',
          actions: [
            'clearError',
          ],
        },
        onError: {
          target: 'editingDeck',
          actions: 'assignErrorToContext',
        },
      },
    },
    deletingDeck: {
      invoke: {
        src: 'deleteDeckActor',
        input: ({ context }) => {
          if (context.deckToDelete?.id) {
            return { deckId: context.deckToDelete.id };
          }
          throw new Error('Invalid event for deleting deck');
        },
        onDone: {
          target: 'loadingDecks',
          actions: ['clearDeckToDelete', 'clearError'],
        },
        onError: {
          target: 'error',
          actions: 'assignErrorToContext',
        },
      },
    },
    confirmingDelete: {
      tags: ['confirming-delete'],
      on: {
        CONFIRM_DELETE: 'deletingDeck',
        CANCEL_DELETE: {
          target: 'viewingDeckList',
          actions: 'clearDeckToDelete',
        },
      },
    },
    error: {
      on: {
        FETCH_DECKS: 'loadingDecks',
        // TODO: [DECK_MGMT_ERROR_HANDLING]
      },
    },
  },
})
