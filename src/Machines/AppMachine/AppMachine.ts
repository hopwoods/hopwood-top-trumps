import { setup, assign, type AnyEventObject } from 'xstate'
import { authMachine } from '../AuthMachine/AuthMachine' // Import the new authMachine
import { deckMachine } from '../DeckMachine/DeckMachine' // Import the deckMachine
import { appMachineInspector } from './stateInspector' // Import the inspector

// Import actors
import { checkAuthStatusActor } from './Services/CheckAuthStatus.actor'
import { logoutActor } from './Services/Logout.actor'
import { checkAndProvisionDefaultDeckActor } from './Actors/CheckAndProvisionDefaultDeck.actor' // Added import

// Import types
import type {
  AppContext,
  AppEvent,
  AuthenticationSuccessEventFromChild,
  AuthenticationFailureEventFromChild
} from './AppMachine.types'
import type { CheckAndProvisionDefaultDeckInput } from './Actors/CheckAndProvisionDefaultDeck.actor' // Import the input type

interface DeckMachineInput {
  userId: string;
}

interface CheckAndProvisionDefaultDeckOutput {
  provisioned: boolean;
  userId: string;
  existingDeckCount?: number;
}

export const appMachine = setup({
  types: {} as {
    context: AppContext,
    events: AppEvent,
    guards: {
      checkAuthOutputIsNotNull: (context: AppContext, event: AnyEventObject) => boolean;
    },
    actors: {
      checkAndProvisionDefaultDeckActor: {
        src: 'checkAndProvisionDefaultDeckActor', // String matches the key in the actors object below
        input: CheckAndProvisionDefaultDeckInput,
        output: CheckAndProvisionDefaultDeckOutput
      },
      deckMachine: {
        src: 'deckMachine',
        input: DeckMachineInput,
        // Define output if deckMachine has a specific final output, otherwise omit or use 'unknown'
      }
      // authMachine can also be typed here if needed, e.g., its output if it's a final machine
    }
  },
  actors: {
    checkAuthStatusActor,
    logoutActor,
    authMachine,
    deckMachine, // Add deckMachine here
    checkAndProvisionDefaultDeckActor, // Added actor
  },
  guards: {
    checkAuthOutputIsNotNull: function ({ event }: { event: AnyEventObject }) {
      // This guard is specific to the onDone event of checkAuthStatusActor
      // which should have an 'output' property.
      return event.output !== null
    }
  },
  actions: {
    assignUserToContext: assign({
      user: ({ event }) => {
        // This action is expected to be called by an event from authMachine
        // that carries the user data.
        if (event.type === 'AUTHENTICATION_SUCCESS') {
          // Ensure event is correctly typed as AuthenticationSuccessEventFromChild
          return (event as AuthenticationSuccessEventFromChild).user
        }
        return null
      },
      error: null,
    }),
    assignErrorToContext: assign({
      error: ({ event }) => {
        // This action is expected to be called by an event from authMachine
        // that carries the error data.
        if (event.type === 'AUTHENTICATION_FAILURE') {
          // Ensure event is correctly typed as AuthenticationFailureEventFromChild
          return (event as AuthenticationFailureEventFromChild).error
        }
        return 'An unknown error occurred.'
      },
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0BLAdlgLlsgDZYBeuUAxBAPY5jY4ButA1o2prgUaRTigJcrAMbJC9ANoAGALqy5iUKlqxe9ZSAAeiALQAWAOwyMAVgDMZo0YAcAJgBsF20esAaEAE9EFtxiNHMycLAysATgtwgEYAX1jPLiZeEnJKGnpGEXZOdGTCVIEhbPFJHEUpaKUkEFV1Mq1dBD1owICZcLsTe0tbYM8fBEcOjCiO+x6HKyN7eMS8ngL+dLAAJ1XaVYxUYgkAM02AWwwkxb40wWEWWlKsaXlFLTqNHEbfewMMcMcTUIsraLDGSOAaISyfAyOewyWxRAwGaLw8JzEBJACuOGQaPwAAswDhCKVIFQ1hstjt9kcTticQBBUT4TaPGrPBo1JqOVoYYb-VqhEwGcIGUEIRFcvy2GTRVowozRYEo9GYmn4wkSYm0gCqABUABIAUQActqAJIAYVppoA8oaAPoAZU1ZrN+vt9uZKjULzezThGEFPxkZnC9isMjcFhFJiM3P+BgmgtsMTsiryGKxuNVWCJECoWr1RtNFutdoAYrSTQAZTUAJX1HtqXrZoCadgsGBkFkRks5lm6ItaZlsASCQ7MZkDgMcqcw6ZVBOz6tz+YNxvNlpNNttFsNLsrlf1ABEG6y7q92YgPu3JeHAgYYfZAdEBzZHBh7N8LI+3B9HN8Z9SmYLjmGA4rQhxgFQlZWgA4laOonk2Z4+vKZjROYcqOGEsJhDMZgDoCMYyE4aEdEYBhmPGtgARmeLAUuoHgZBhq0gAaiaMGWvqtralatoAAqVrSACatqcQAsvW8hPEhmgXqK0JvrYFHRB8sLWJ09gig4b6Pl+9hyoCPSQjR85qvgkCMRBVAsexnHatxvG2uJtIsTB3GHvqZoANLutJLKyeeLaIKpwIYMpaFqdMmkiiGMZ6YiwQyOGzimUB5mWRSXgwcg1lwTxfG6lakmIfUyHydE-zDhOEpWJRlggt4iA2GYASVU4krkclCoJKieS0VmIFZTl1nQXBCH+Z6ZVycFQwxF8wLdMRHzApGTWiuMATBN8ji7X+y1pXRGUQBghzIJiMCHmAohsLAVD5U5RUlZNjbTUFOghVV5jOG244URYjWDK4b5yl2ti9n0MLUb1SQDfRFknWdF1gFdN13WN8HaqV3ryRYMIdtEriuDY9h9P8a2DNKPwdiRBi2IRnKtABxC0FAUCUFa2IZAwTCsBwJx5CzbMc9iVxiBIZ4VC9p4zR9G10wEBnGJKBl-Ph62VS4ozxh+8a9oi04w4LrPs4InP4CS6ybNsuz4AcqzHEkQum1A5tizcEv3Ao0uBT6eh9F8pPWKGrR9AigMhUHGCqROYT3i4ZjhvEvU4LQEBwFoXAyW9ftodV0x2CErgeBrH4duOBmJ9MMgIgBZyFJQ2c47NhgfP63wmMGoaJxGIqPm+47BMD4Qj+GHwAXO6WLgjTfNnLgLtlElG2LCxGqRHooTuhgp02EoZdslRiHYNS6z+Vs3yjX4UUcCUp4z0ji2CKj-DnpPSUWRnQGMf8OWWBEFn1lk0VC9hr6J2GJVYiE4n7rRiO2BKoQgxGG+NYH+x0bbIGyrlMAgD3rALQuhZwPx5QL2iInLS60HDoVUuEPoJCIp+DQdPSySNkCXWurdXBKEq4djpopPGgpCaxQmNHD8PYPw8hhMzE2It8BcPktCT4xFYSPnDOpD8FDKb-DfMCFePwYi0LMMnWIQA */
  id: 'app',
  inspect: process.env.NODE_ENV === 'development' ? appMachineInspector : undefined,
  initial: 'initializing',
  context: {
    user: null,
    error: null,
  },
  states: {
    initializing: {
      invoke: {
        src: 'checkAuthStatusActor',
        onDone: [
          {
            target: 'authenticated.home',
            guard: 'checkAuthOutputIsNotNull', // Use named guard
            actions: assign({ user: ({ event }) => event.output, error: null }),
          },
          {
            target: 'unauthenticated', // Changed from 'authenticating'
            actions: assign({ user: null, error: null }),
          },
        ],
        onError: {
          target: 'unauthenticated', // Changed from 'authenticating'
          actions: assign({
            user: null,
            error: ({ event }: { event: AnyEventObject }) => {
              if (event.data && typeof (event.data as { message?: unknown }).message === 'string') {
                return (event.data as { message: string }).message
              }
              return 'Failed to check authentication status.'
            },
          }),
        },
      },
    },
    unauthenticated: {
      invoke: {
        id: 'authActor',
        src: 'authMachine',
        // 'onDone' is triggered when the invoked machine reaches a top-level final state.
        // authMachine is designed to send an AUTHENTICATION_SUCCESS event *before* it finishes.
        // So, we listen for that specific event from the child.
        // onError here handles errors *from the act of invoking/communicating* with authMachine,
        // not business logic errors like "invalid password" which authMachine handles internally.
        onError: {
          target: 'unauthenticated', // Stay here
          // Removed error assignment here, as specific auth errors should come via AUTHENTICATION_FAILURE event
          // or be the error from checkAuthStatusActor.
          // If invoking authMachine itself fails, that's a system issue,
          // and the existing error (e.g. from checkAuthStatusActor) should persist.
        },
      },
      // Listen for events sent from the invoked 'authActor'
      on: {
        AUTHENTICATION_SUCCESS: {
          target: 'authenticated.home',
          actions: 'assignUserToContext',
        },
        AUTHENTICATION_FAILURE: {
          // Stay in unauthenticated, authMachine handles displaying specific errors.
          // AppMachine just records the error.
          actions: 'assignErrorToContext',
        },
        AUTHENTICATION_CANCELLED: {
          // If user cancels, might stay in unauthenticated or go to a specific state
          // For now, just stay, authMachine would have transitioned to its initial state.
        },
      },
    },
    authenticated: {
      initial: 'home',
      invoke: [ // Invoke checkAndProvisionDefaultDeckActor when entering authenticated state
        {
          id: 'deckProvisioner',
          src: 'checkAndProvisionDefaultDeckActor',
          input: ({ context }) => {
            if (!context.user?.uid) {
              // This should ideally not happen if we are in an authenticated state.
              // Throwing an error or providing a default/invalid ID might be options.
              console.error('User ID is missing when invoking checkAndProvisionDefaultDeckActor. This should not happen.')
              // Consider how to handle this; perhaps the actor itself should guard against missing userId.
              // For now, we rely on the actor's internal check.
              return { userId: '' } // Actor handles empty string
            }
            return { userId: context.user.uid }
          },
          onDone: {
            actions: ({ event }) => {
              console.log('Deck provisioning actor completed successfully:', event.output)
            },
          },
          onError: {
            actions: assign({
              error: ({ event }: { event: AnyEventObject }) => { // Explicitly type event
                console.error('Deck provisioning actor failed. Event data:', event.data)
                const errorData = event.data
                if (errorData instanceof Error) {
                  return errorData.message
                }
                // If errorData is an object with a message property
                if (typeof errorData === 'object' && errorData !== null && 'message' in errorData && typeof (errorData as { message: unknown }).message === 'string') {
                  return (errorData as { message: string }).message
                }
                // If event itself is an error (less common for fromPromise but good to check)
                if (event instanceof Error) {
                    return event.message
                }
                return 'Deck provisioning failed with an unknown error.'
              },
            }),
            // Optionally, transition to a specific error sub-state within authenticated
            // or display a global error message. For now, just logging and setting context.
          },
        },
      ],
      states: {
        home: {
          // Removed the entry action from here as it's now invoked at the parent 'authenticated' level
          on: {
            LOGOUT: '#app.loggingOut',
            NAVIGATE_TO_PLAY_GAME: 'playGame',
            NAVIGATE_TO_MANAGE_DECKS: 'manageDecks',
          },
        },
        playGame: {
          // Placeholder state for "Play Game"
          // Add specific logic, services, or UI events here later
          on: {
            GO_TO_HOME: 'home', // Example navigation back
            LOGOUT: '#app.loggingOut',
          },
        },
        manageDecks: {
          invoke: {
            id: 'deckMachineActor',
            src: 'deckMachine',
            input: ({ context }) => {
              if (!context.user?.uid) {
                // This should ideally not happen if we are in an authenticated state
                // and manageDecks is only reachable when authenticated.
                // Throwing an error or providing a default/invalid ID might be options,
                // but indicates a flaw in state transition logic if user is not present.
                console.error('User ID is missing when invoking deckMachine. This should not happen.');
                // Fallback or error needed. For now, let's assume user is always present here.
                // Or, guard the transition to manageDecks to ensure user exists.
                return { userId: 'MISSING_USER_ID_ERROR' }; // Or throw
              }
              return { userId: context.user.uid };
            },
            // TODO: Handle data from deckMachine if it sends events to AppMachine
            // onError: { actions: assign({ error: 'Deck machine encountered an error.' }) }
          },
          on: {
            GO_TO_HOME: 'home', // Example navigation back
            LOGOUT: '#app.loggingOut',
            // TODO: Potentially forward relevant events to deckMachineActor
            // e.g., SOME_DECK_EVENT: { actions: sendTo('deckMachineActor', { type: 'EXTERNAL_EVENT' }) }
          },
        },
      },
    },
    loggingOut: {
      invoke: {
        src: 'logoutActor',
        onDone: {
          target: 'unauthenticated', // Changed from 'authenticating'
          actions: assign({ user: null, error: null }),
        },
        onError: {
          target: 'authenticated.home', // Or perhaps an error state
          actions: assign({
            error: ({ event }: { event: AnyEventObject }) => {
              if (event.data && typeof (event.data as { message?: unknown }).message === 'string') {
                return (event.data as { message: string }).message
              }
              return 'Logout failed.'
            },
          }),
        },
      },
    },
  },
})
