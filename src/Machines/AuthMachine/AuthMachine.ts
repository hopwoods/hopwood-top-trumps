import { setup, assign, sendParent, type AnyEventObject, type DoneActorEvent } from 'xstate' // Removed ErrorActorEvent
import type { User } from 'firebase/auth' // Added top-level import
import type { AuthContext, AuthEvent } from './AuthMachine.types' // Removed SubmitLoginWithEmailEvent

// import { loginWithEmailActor } from '../AppMachine/Services/LoginWithEmail.actor' // Fully remove this line
import { loginWithGoogleActor } from '../AppMachine/Services/LoginWithGoogle.actor' // Adjust path if moved
// import { registerWithEmailActor } from '../AppMachine/Services/RegisterWithEmail.actor' // Removed

export const authMachine = setup({
  types: {} as {
    context: AuthContext,
    events: AuthEvent,
    // Emitted events for parent machine
    emitted:
      | { type: 'AUTHENTICATION_SUCCESS'; user: User }
      | { type: 'AUTHENTICATION_FAILURE'; error: string }
      | { type: 'AUTHENTICATION_CANCELLED' },
  },
  actors: {
    loginWithGoogleActor,
    // loginWithEmailActor, // This actor is also removed from here
    // registerWithEmailActor, // Removed
  },
  actions: {
    sendAuthSuccessToParent: sendParent(({ event }) => {
      // event here is the DoneActorEvent from the actor.
      // event.output contains the data resolved by the actor's promise.
      const user = (event as unknown as DoneActorEvent<User | null>).output
      if (user) {
        return { type: 'AUTHENTICATION_SUCCESS', user }
      }
      // Extra brace removed from here
      return { type: 'AUTHENTICATION_FAILURE', error: 'Authentication succeeded but user data was null.' }
    }),
    sendAuthFailureToParent: sendParent(({ event }: { event: AuthEvent }) => {
      // This action is intended to be used in an onError transition from an invoked actor.
      // 'event' is typed as AuthEvent, so we need to check if it's an actor error event.
      let errorMessage = 'An unknown authentication error occurred.'

      // Check if the event is an error event from an actor
      // XState's internal error events for actors have type 'xstate.error.actor'
      const anyEvent = event as AnyEventObject
      if (anyEvent.type === 'xstate.error.actor') {
        // After this check, anyEvent is effectively an ErrorActorEvent.
        // Using 'as any' as a workaround for persistent TS error with .data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errorData = (anyEvent as any).data
        if (typeof errorData === 'string') {
          errorMessage = errorData
        } else if (errorData instanceof Error) {
          errorMessage = errorData.message
        } else if (errorData && typeof (errorData as { message?: string }).message === 'string') {
          errorMessage = (errorData as { message: string }).message
        }
      }
      // If it's not an actor error event but this action was somehow called,
      // it will send the default "unknown authentication error" message.
      return { type: 'AUTHENTICATION_FAILURE', error: errorMessage }
    }),
    // If we add a cancel/back button in the UI:
    // sendAuthCancelledToParent: sendParent({ type: 'AUTHENTICATION_CANCELLED' }),
  },
}).createMachine({
  id: 'authMachine',
  initial: 'idle', // Or 'loginForm' directly
  context: {
    error: null,
  },
  states: {
    idle: {
      on: {
        // SUBMIT_LOGIN_WITH_EMAIL: 'submittingEmail', // Removed email login
        SUBMIT_LOGIN_WITH_GOOGLE: 'submittingGoogle',
        // SUBMIT_REGISTRATION: 'submittingRegistration', // Removed
        // AUTHENTICATION_CANCELLED: { actions: 'sendAuthCancelledToParent' } // Example
      },
    },
    // submittingEmail state removed
    submittingGoogle: {
      invoke: {
        src: 'loginWithGoogleActor',
        onDone: {
          target: 'authenticated',
          actions: assign({ error: null }),
        },
        onError: {
          target: 'idle',
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
    // submittingRegistration state removed
    authenticated: {
      // This state signifies successful authentication within this child machine.
      // It will send an event to the parent (AppMachine).
      entry: 'sendAuthSuccessToParent',
      type: 'final', // This machine has completed its main goal.
    },
    // We could also have a 'failure' final state if we want to explicitly model that
    // and send a specific failure event to the parent.
    // For now, onError transitions back to 'idle' and can send failure via actions.
  },
})
