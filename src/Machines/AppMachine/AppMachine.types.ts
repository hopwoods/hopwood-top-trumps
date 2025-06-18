import type { User } from 'firebase/auth'

// Define the context for the machine
export interface AppContext {
  user: User | null
  error: string | null
}

// Define the events the machine can receive
export type AppEvent =
  | { type: 'AUTH_STATUS_CHECK_COMPLETE'; user: User | null }
  | { type: 'LOGIN_WITH_EMAIL'; email: string; password: string }
  | { type: 'LOGIN_WITH_GOOGLE' }
  | { type: 'LOGIN_SUCCESS'; user: User }
  | { type: 'LOGIN_FAILURE'; error: string }
  | { type: 'LOGOUT' }
  | { type: 'GO_TO_HOME' }
  | { type: 'GO_TO_LOGIN' }
