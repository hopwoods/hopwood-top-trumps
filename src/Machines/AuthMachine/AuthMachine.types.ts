import type { User } from 'firebase/auth'

// Define the context for the authentication machine
export interface AuthContext {
  error: string | null
  // We might add other auth-specific context here later, e.g., email for registration
}

// Define individual event types for the authentication machine
export type SubmitLoginWithEmailEvent = { type: 'SUBMIT_LOGIN_WITH_EMAIL'; email: string; password: string }
export type SubmitLoginWithGoogleEvent = { type: 'SUBMIT_LOGIN_WITH_GOOGLE' }
export type SubmitRegistrationEvent = { type: 'SUBMIT_REGISTRATION'; email: string; password: string }

// Events sent from actors to the machine
export type ActorLoginSuccessEvent = { type: 'ACTOR_LOGIN_SUCCESS'; user: User }
export type ActorLoginFailureEvent = { type: 'ACTOR_LOGIN_FAILURE'; error: string }
export type ActorRegistrationSuccessEvent = { type: 'ACTOR_REGISTRATION_SUCCESS'; user: User }
export type ActorRegistrationFailureEvent = { type: 'ACTOR_REGISTRATION_FAILURE'; error: string }

// Events sent from AuthMachine to parent (AppMachine)
export type AuthenticationSuccessEvent = { type: 'AUTHENTICATION_SUCCESS'; user: User }
export type AuthenticationFailureEvent = { type: 'AUTHENTICATION_FAILURE'; error: string } // Optional, if parent needs to know
export type AuthenticationCancelledEvent = { type: 'AUTHENTICATION_CANCELLED' } // If user can cancel/go back

// Define the AuthEvent union type
export type AuthEvent =
  | SubmitLoginWithEmailEvent
  | SubmitLoginWithGoogleEvent
  | SubmitRegistrationEvent
  | ActorLoginSuccessEvent
  | ActorLoginFailureEvent
  | ActorRegistrationSuccessEvent
  | ActorRegistrationFailureEvent
  | AuthenticationSuccessEvent // These might be primarily for external communication
  | AuthenticationFailureEvent
  | AuthenticationCancelledEvent
