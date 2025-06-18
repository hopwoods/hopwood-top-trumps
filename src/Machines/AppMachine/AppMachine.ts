import { setup, assign, type AnyEventObject } from 'xstate'
// 'User' type is imported in AppMachine.types.ts, no longer needed here directly
// import {
//   type User,
// } from 'firebase/auth'
// auth instance is used in actors
// import { auth } from '../../Firebase/FirebaseConfig'
import type { AppContext, AppEvent } from './AppMachine.types' // Corrected path

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
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0BLAdlgLlsgDZYBeuUAxBAPY5jY4ButA1o2prgUaRTigJcrAMbJC9ANoAGALqy5iUKlqxe9ZSAAeiAIwAmDADYArMYMy9emQBYAHOZn2ANCACeiAMy29Jm3ZeVsb2AOyhPgC+kW5cTLwk5JQ09Iwi7Jzo8YSJAkLp4pI4ilJ6SkggqupFWroIXsYyGKG+oY4GjgCcMp2uHt6+-jIypnqdBgbj9nrG0bFZPDn8yWAATqu0qxioxBIAZpsAthhxi3xJgsIstIVY0vKKWlUaOLXexl4YppZtEzOhei8plsbk8CD09k+dmGgNs3QMoRkXnscxAcWQAFd8AALMA4Qi3QQYYi0KC4ABiRyoABkAPIAcQAkgA5AD6AHVGQAVAASrIAogBZACCjOpjwqzxqFTqnURzQMxhC4WRhkmoO8Xj89k65gMpga4V85lR6KxuPxWEJUGJpIpVLpTLZnN5rPptIZ1P5EpUahebwQcqaoUVyoi0wmnQ1CFsoVMGB8YXsMgixhDYVNWUxOLxBIklAwsAxACNDgRCIJ+YdkFhiCkGExWBwTlnzbmrfmiUXS+XKFWa8QrmJ8-cFPInn7paA6qFus0fB0bF4IjM+mD7LYmlrGgaQr1jIDM5hsxa8xWbd2y-hz-3a1Q1hstjt9kcW8e25brYWS1eb9Xa0ONwjsUDzjpKk53K8MqIL02r7qMxidHopiIiC-QIAYyIYJ0tgGLGkwQmMQSzDEaKtjmn6dheP69oI9K0KSxBgPWaTXM2ZoUWeBaXrRUD0YxYCAbco4+pUEGaNBCCzsGC7TEiK4hNGnReJ8irjDIB5eDhPQoqRHGnh257fj216UPxUBMfe6ybNsuz4AcqzHPp7Zfjxpl0QxFmCQUwElGBvrVJBAZBgqSphOGapRuhyJGFper2B0ALJgYR4nB+Z6QBg2K0IczGOrSACqXKiVKQWSXGGDIc4kbAr4sZKQYfjmIYvQpohOqpSSUBkoItJYixjYZG+trdZQfX4EJvmgeUAX+pJcKdBgviOCMXTLqY0YoU0sJtHouEjKMoSdaSPVQONVmPrZL6OcNXWneNk1FH5M1iYFEnTvodiLXoALjER3QWKE0YhsYGD2IhYymEiZjgylqI4LQEBwFoXATm9UEfQgAC0QIJrYy69Dqoz4+M0YfNhuFQzIlhmHK9i6fM3B4EsFxQGjc2Y7h0YQsGSqmJCiEtBCQKpSeLlUezU46Ig4RNVpliWM4UxA+hyF+LYuELduYSNSRjNpZxhkFl19qOZLZWY9Mi0Gupis6ol0YIn4v12I4pjdLOetke+huuTR7lQLexDm+90vgo1thg+E4ZxmYPQGI7BoYM4KHWLObSQjMovpUbXb++e5lMSHGNh4Yhhg5YGvWPTMwTNGWmgwa9NpjMypItnvsSJAxcBph9hfPTkJ2I1ljmCrYLGLhYM2LYk+TJGzgdwZhSZdluU95JHSN4PQS4YYIxpsDQQJjYUO9KMwJ4cdo29ViG+Y41CYNLPoQhAiKn0143N2JH5gWBYKZ5a4WiNEIAA */
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
