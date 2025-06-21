import type { User } from 'firebase/auth'

// Define the context for the machine
export interface AppContext {
  user: User | null
  error: string | null
}

// Define individual event types for AppMachine
export type AuthStatusCheckCompleteEvent = { type: 'AUTH_STATUS_CHECK_COMPLETE'; user: User | null }
export type LogoutEvent = { type: 'LOGOUT' }
// GO_TO_HOME and GO_TO_LOGIN might be internal navigation triggers or could be refactored
// depending on how routing is handled with the child authMachine.
// For now, let's assume they might still be relevant for AppMachine to orchestrate views.
export type GoToHomeEvent = { type: 'GO_TO_HOME' }
export type GoToLoginEvent = { type: 'GO_TO_LOGIN' } // This might become an internal event if unauthenticated state always shows login UI via authMachine
export type NavigateToPlayGameEvent = { type: 'NAVIGATE_TO_PLAY_GAME' }
export type NavigateToManageDecksEvent = { type: 'NAVIGATE_TO_MANAGE_DECKS' }

// Events AppMachine receives from its children (e.g., authMachine)
export type AuthenticationSuccessEventFromChild = { type: 'AUTHENTICATION_SUCCESS'; user: User }
export type AuthenticationFailureEventFromChild = { type: 'AUTHENTICATION_FAILURE'; error: string }
export type AuthenticationCancelledEventFromChild = { type: 'AUTHENTICATION_CANCELLED' } // If authMachine can be cancelled

// Events from checkAndProvisionDefaultDeckActor
export type DeckProvisioningSuccessEvent = {
  type: 'xstate.done.actor.deckProvisioner' // Default event type for successful actor completion
  output: { provisioned: boolean; userId: string; existingDeckCount?: number }
}
export type DeckProvisioningErrorEvent = {
  type: 'xstate.error.actor.deckProvisioner' // Default event type for actor error
  error: Error // Or a more specific error type if known
}


// Define the AppEvent union type
export type AppEvent =
  | AuthStatusCheckCompleteEvent
  | LogoutEvent
  | GoToHomeEvent
  | GoToLoginEvent
  | NavigateToPlayGameEvent
  | NavigateToManageDecksEvent
  | AuthenticationSuccessEventFromChild
  | AuthenticationFailureEventFromChild
  | AuthenticationCancelledEventFromChild
  | DeckProvisioningSuccessEvent // Added event
  | DeckProvisioningErrorEvent // Added event
// Removed:
// | LoginWithEmailEvent
// | LoginWithGoogleEvent
// | LoginSuccessEvent (AppMachine now gets AUTHENTICATION_SUCCESS from child)
// | LoginFailureEvent (AppMachine now gets AUTHENTICATION_FAILURE from child)
// | SubmitRegistrationEvent
// | RegistrationSuccessEvent (AppMachine now gets AUTHENTICATION_SUCCESS from child)
// | RegistrationFailureEvent (AppMachine now gets AUTHENTICATION_FAILURE from child)
