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
          // actions: 'assignSelectedDeckToContext'
        },
        DELETE_DECK: 'deletingDeck',
      },
    },
    creatingDeck: {
      entry: ['clearSelectedDeck', 'clearError'],
      on: {
        SAVE_DECK: 'savingDeck',
        CANCEL_DECK_EDIT: 'viewingDeckList',
        VIEW_DECK_LIST: 'viewingDeckList',
      },
      // TODO: [DECK_MGMT_CARD_CREATE_UI]
    },
    editingDeck: {
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
            'assignSelectedDeckToContext',
            // TODO: [DECK_MGMT_SAVE_SUCCESS]
            'clearError',
          ],
        },
        onError: {
          target: 'error',
          actions: 'assignErrorToContext',
        },
      },
    },
    deletingDeck: {
      invoke: {
        src: 'deleteDeckActor',
        input: ({ event }) => {
          if (event.type === 'DELETE_DECK') {
            return { deckId: event.deckId };
          }
          throw new Error('Invalid event for deleting deck');
        },
        onDone: {
          target: 'loadingDecks',
          // TODO: [DECK_MGMT_DELETE_SUCCESS]
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
        FETCH_DECKS: 'loadingDecks',
        // TODO: [DECK_MGMT_ERROR_HANDLING]
      },
    },
  },
})
