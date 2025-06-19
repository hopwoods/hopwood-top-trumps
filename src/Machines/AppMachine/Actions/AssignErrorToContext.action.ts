import { assign } from 'xstate'
import type { AuthenticationFailureEventFromChild } from '../AppMachine.types'

export const assignErrorToContext = assign({
  error: ({ event }: { event: AuthenticationFailureEventFromChild }) => {
    if (event.type === 'AUTHENTICATION_FAILURE') {
      return event.error
    }
    // This case should ideally not be reached.
    return 'An unknown error occurred.'
  },
  // Optionally, clear the user on auth failure, or leave as is
  // user: null,
})
