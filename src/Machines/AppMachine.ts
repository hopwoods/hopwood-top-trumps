import { createMachine, assign } from 'xstate'
// import type { User } from 'firebase/auth'; // Placeholder for Firebase User type

// Define the context for the machine
interface AppContext {
  user: any | null // Replace 'any' with 'User' from Firebase
  error: string | null
}

// Define the events the machine can receive
type AppEvent =
  | { type: 'AUTH_STATUS_CHECK_COMPLETE'; user: any | null } // user can be User type
  | { type: 'LOGIN_WITH_EMAIL'; email: string; password: string }
  | { type: 'LOGIN_WITH_GOOGLE' }
  | { type: 'LOGIN_SUCCESS'; user: any } // user can be User type
  | { type: 'LOGIN_FAILURE'; error: string }
  | { type: 'LOGOUT' }
  | { type: 'GO_TO_HOME' } // Example navigation event
  | { type: 'GO_TO_LOGIN' } // Example navigation event

export const appMachine = createMachine(
  {
    id: 'app',
    initial: 'initializing',
    // Provide context and event types directly for inference
    context: {
      user: null,
      error: null,
    } as AppContext, // Using 'as AppContext' for initial context typing

    states: {
      initializing: {
        // This state would typically invoke a service to check authentication status
        // For now, we simulate this with a direct event for demonstration
        // In a real app, you'd use: invoke: { src: 'checkAuthService', ... }
        on: {
          AUTH_STATUS_CHECK_COMPLETE: [
            {
              target: 'authenticated.home',
              guard: ({ event }) => event.user !== null,
              actions: assign({ user: ({ event }) => event.user, error: null }),
            },
            {
              target: 'authenticating',
              actions: assign({ user: null, error: null }),
            },
          ],
        },
        // entry: 'triggerAuthCheck', // Action to initiate the auth check
      },

      authenticating: {
        initial: 'loginForm',
        states: {
          loginForm: {
            // This state represents the UI for login/registration
            on: {
              LOGIN_WITH_EMAIL: 'submitting', // Transition to submitting state
              LOGIN_WITH_GOOGLE: 'submitting', // Transition to submitting state
            },
          },
          submitting: {
            // This state would invoke a service for the actual login attempt
            // e.g., invoke: { src: 'loginUserService', ... }
            on: {
              LOGIN_SUCCESS: {
                target: '#app.authenticated.home', // Go to home page on success
                actions: assign({
                  user: ({ event }) => event.user,
                  error: null,
                }),
              },
              LOGIN_FAILURE: {
                target: 'loginForm', // Go back to login form on failure
                actions: assign({
                  error: ({ event }) => event.error,
                }),
              },
            },
          },
        },
      },

      authenticated: {
        initial: 'home',
        states: {
          home: {
            // This is the Home Page state after successful login
            on: {
              LOGOUT: {
                target: '#app.authenticating', // Go back to authenticating state
                // actions: 'performLogoutServiceInvocation', // Action to trigger logout service
              },
              // Add other navigation events from home here, e.g.:
              // GO_TO_DECK_BUILDER: 'deckBuilder',
              // GO_TO_PROFILE: 'profile',
            },
          },
          // deckBuilder: {
          //   on: { GO_TO_HOME: 'home' }
          // },
          // profile: {
          //   on: { GO_TO_HOME: 'home' }
          // },
        },
      },
    },
  },
  // Setup API for actions, actors (services), guards (optional but recommended for complex logic)
  // {
  //   actions: {
  //     triggerAuthCheck: () => { console.log('Checking auth status...') },
  //     // performLogoutServiceInvocation: () => { console.log('Logging out...') }
  //   },
  //   actors: {
  //     // checkAuthService: fromPromise(async () => { /* Firebase onAuthStateChanged logic */ }),
  //     // loginUserService: fromPromise(async ({ event }) => { /* Firebase login logic */ }),
  //   },
  //   guards: {},
  // }
)
