import { createMachine, assign, fromPromise } from 'xstate' // Removed unused sendTo
import {
  type User, // Import User type
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth'
import { auth } from '../Firebase/FirebaseConfig' // Import auth instance

// Define the context for the machine
interface AppContext {
  user: User | null // Use User type
  error: string | null
}

// Define the events the machine can receive
export type AppEvent = // Exporting AppEvent to be used in machine type
  | { type: 'AUTH_STATUS_CHECK_COMPLETE'; user: User | null } // Use User type
  | { type: 'LOGIN_WITH_EMAIL'; email: string; password: string }
  | { type: 'LOGIN_WITH_GOOGLE' }
  | { type: 'LOGIN_SUCCESS'; user: User } // Use User type
  | { type: 'LOGIN_FAILURE'; error: string }
  | { type: 'LOGOUT' }
  | { type: 'GO_TO_HOME' } // Example navigation event
  | { type: 'GO_TO_LOGIN' } // Example navigation event

export const appMachine = createMachine<AppContext, AppEvent>( // Explicitly type the machine
  {
    id: 'app', // Removed duplicate id
    initial: 'initializing',
    context: {
      user: null,
      error: null,
    } satisfies AppContext,

    states: {
      initializing: {
        invoke: {
          src: 'checkAuthStatusActor',
          onDone: [
            {
              target: 'authenticated.home',
              guard: ({ event }) => event.output !== null,
              actions: assign({ user: ({ event }) => event.output as User | null, error: null }),
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
              error: ({ event }: { event: any }) => (event.data as Error)?.message || 'Failed to check authentication status.',
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
              input: ({ event }: { event: AppEvent }) => { // Explicitly type event here
                if (event.type === 'LOGIN_WITH_EMAIL') {
                  return { email: event.email, password: event.password }
                }
                return { email: '', password: '' }
              },
              onDone: {
                target: '#app.authenticated.home',
                actions: assign({
                  user: ({ event }) => event.output as User,
                  error: null,
                }),
              },
              onError: {
                target: 'loginForm',
                actions: assign({
                  error: ({ event }: { event: any }) => (event.data as Error)?.message || 'Email login failed',
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
                  user: ({ event }) => event.output as User,
                  error: null,
                }),
              },
              onError: {
                target: 'loginForm',
                actions: assign({
                  error: ({ event }: { event: any }) => (event.data as Error)?.message || 'Google login failed',
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
              error: ({ event }: { event: any }) => (event.data as Error)?.message || 'Logout failed',
            }),
          },
        },
      },
    },
  },
  {
    actors: {
      checkAuthStatusActor: fromPromise<User | null, void>(() =>
        new Promise<User | null>((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(
              auth,
              (user) => {
                unsubscribe()
                resolve(user)
              },
              (error) => {
                unsubscribe()
                reject(error)
              },
            )
          }),
      ),
      loginWithEmailActor: fromPromise<User, { email: string; password: string }>(
        async ({ input }) => {
          const { email, password } = input
          if (!email || !password) {
            throw new Error('Email and password are required.')
          }
          const userCredential = await signInWithEmailAndPassword(auth, email, password)
          return userCredential.user
        },
      ),
      loginWithGoogleActor: fromPromise<User, void>(async () => {
        const provider = new GoogleAuthProvider()
        const userCredential = await signInWithPopup(auth, provider)
        return userCredential.user
      }),
      logoutActor: fromPromise<void, void>(async () => {
        await signOut(auth)
      }),
    },
    guards: {},
  },
)
