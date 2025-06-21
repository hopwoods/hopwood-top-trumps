import type { User } from 'firebase/auth'

// Define the context for the authentication machine
export interface AuthContext {
  error: string | null
  // We might add other auth-specific context here later, e.g., email for registration
}

// Define individual event types for the authentication machine
export type SubmitLoginWithGoogleEvent = { type: 'SUBMIT_LOGIN_WITH_GOOGLE' }

// Events sent from AuthMachine to parent (AppMachine) - These are 'emitted' types
// These type definitions are useful for defining the `emitted` shape in setup.
export type AuthenticationSuccessEvent = { type: 'AUTHENTICATION_SUCCESS'; user: User }
export type AuthenticationFailureEvent = { type: 'AUTHENTICATION_FAILURE'; error: string }
export type AuthenticationCancelledEvent = { type: 'AUTHENTICATION_CANCELLED' } // If user can cancel/go back

// Define the AuthEvent union type for events the AuthMachine can RECEIVE
export type AuthEvent =
  | SubmitLoginWithGoogleEvent
  // If the machine needs to receive a cancellation event from UI/parent:
  | AuthenticationCancelledEvent // Assuming it can be received to trigger cancellation logic.
  // Actor-specific success/failure events (like ActorLoginSuccessEvent) are typically
  // not part of this union if handled by onDone/onError of invokes.
