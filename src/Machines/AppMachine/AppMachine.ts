import { setup, assign, type AnyEventObject } from 'xstate'
// 'User' type is imported in AppMachine.types.ts, no longer needed here directly
// import {
//   type User,
// } from 'firebase/auth'
// auth instance is used in actors
// import { auth } from '../../Firebase/FirebaseConfig'
import type { AppContext, AppEvent } from '../AppMachine.types' // Corrected path

// Import actors
import { checkAuthStatusActor } from './Services/CheckAuthStatus.actor'
import { loginWithEmailActor } from './Services/LoginWithEmail.actor'
import { loginWithGoogleActor } from './Services/LoginWithGoogle.actor'
import { logoutActor } from './Services/Logout.actor'

export const appMachine = setup({
  types: {} as {
    context: AppContext,
    events: AppEvent,
  },
  actors: {
    checkAuthStatusActor,
    loginWithEmailActor,
    loginWithGoogleActor,
    logoutActor,
  },
  guards: {},
  actions: {},
}).createMachine({
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
            target: 'authenticating',
            actions: assign({ user: null, error: null }),
          },
        ],
        onError: {
          target: 'authenticating',
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

    authenticating: {
      initial: 'loginForm',
      states: {
        loginForm: {
          on: {
            LOGIN_WITH_EMAIL: 'submittingEmail',
            LOGIN_WITH_GOOGLE: 'submittingGoogle',
          },
        },
        submittingEmail: {
          invoke: {
            src: 'loginWithEmailActor',
            input: ({ event }) => {
              const loginEvent = event as Extract<AppEvent, { type: 'LOGIN_WITH_EMAIL' }>
              return { email: loginEvent.email, password: loginEvent.password }
            },
            onDone: {
              target: '#app.authenticated.home',
              actions: assign({
                user: ({ event }) => event.output,
                error: null,
              }),
            },
            onError: {
              target: 'loginForm',
              actions: assign({
                error: ({ event }: { event: AnyEventObject }) => {
                  if (event.data && typeof (event.data as { message?: unknown }).message === 'string') {
                    return (event.data as { message: string }).message
                  }
                  return 'Email login failed.'
                },
              }),
            },
          },
        },
        submittingGoogle: {
          invoke: {
            src: 'loginWithGoogleActor',
            onDone: {
              target: '#app.authenticated.home',
              actions: assign({
                user: ({ event }) => event.output,
                error: null,
              }),
            },
            onError: {
              target: 'loginForm',
              actions: assign({
                error: ({ event }: { event: AnyEventObject }) => {
                  if (event.data && typeof (event.data as { message?: unknown }).message === 'string') {
                    return (event.data as { message: string }).message
                  }
                  return 'Google login failed.'
                },
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
          on: {
            LOGOUT: '#app.loggingOut',
          },
        },
      },
    },
    loggingOut: {
      invoke: {
        src: 'logoutActor',
        onDone: {
          target: 'authenticating',
          actions: assign({ user: null, error: null }),
        },
        onError: {
          target: 'authenticated.home',
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
