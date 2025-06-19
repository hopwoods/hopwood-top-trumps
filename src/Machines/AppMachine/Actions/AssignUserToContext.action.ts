import { assign } from 'xstate'
import type { AuthenticationSuccessEventFromChild } from '../AppMachine.types'

// Instead of exporting the action directly, we'll create an action creator function
// that returns the assign action. This gives us more control over typing.
export const createAssignUserToContextAction = () => {
  // Return the assign action with explicit typing for the context
  return assign({
    user: ({ event }) => {
      // Since this action is only used with AUTHENTICATION_SUCCESS events in the machine,
      // we can safely cast the event to the expected type
      if (event.type === 'AUTHENTICATION_SUCCESS') {
        return (event as AuthenticationSuccessEventFromChild).user
      }
      return null
    },
    error: null, // Clear any previous errors on successful auth
  })
}

// Export the created action
export const assignUserToContext = createAssignUserToContextAction()
