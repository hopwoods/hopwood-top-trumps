import { setup, assign, type AnyEventObject } from 'xstate'
import { authMachine } from '../AuthMachine/AuthMachine' // Import the new authMachine

// Import actors
import { checkAuthStatusActor } from './Services/CheckAuthStatus.actor'
import { logoutActor } from './Services/Logout.actor'

// Import types
import type {
  AppContext,
  AppEvent,
  AuthenticationSuccessEventFromChild,
  AuthenticationFailureEventFromChild
} from './AppMachine.types'

export const appMachine = setup({
  types: {} as {
    context: AppContext,
    events: AppEvent,
  },
  actors: {
    checkAuthStatusActor,
    logoutActor,
    authMachine,
  },
  guards: {},
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
            guard: ({ event }) => event.output !== null,
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
          target: 'unauthenticated', // Stay here, maybe show a generic system error
          actions: assign({ error: 'Failed to start authentication process.' }),
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
      states: {
        home: {
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
          // Placeholder state for "Manage Decks"
          // Add specific logic, services, or UI events here later
          on: {
            GO_TO_HOME: 'home', // Example navigation back
            LOGOUT: '#app.loggingOut',
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
