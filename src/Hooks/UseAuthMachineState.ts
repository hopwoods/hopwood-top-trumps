import { useSelector } from '@xstate/react'
import type { ActorRefFrom, SnapshotFrom } from 'xstate'
import { GlobalStateContext } from './UseAppState' // To get the main app machine's state
import { authMachine } from '../Machines/AuthMachine/AuthMachine'
import type { AuthContext } from '../Machines/AuthMachine/AuthMachine.types' // Removed AuthEvent

export const useAuthMachineState = () => {
  // Get the parent appMachine's state to find the authActorRef
  const appMachineSnapshot = GlobalStateContext.useSelector(state => state)
  const authActorRef = appMachineSnapshot.children.authActor as ActorRefFrom<typeof authMachine> | undefined

  // Now, use useSelector with the authActorRef to get its state and context
  // This will ensure components re-render when authMachine's state/context changes.

  const authMachineState: SnapshotFrom<typeof authMachine> | undefined = useSelector(
    authActorRef!, // Non-null assertion: this hook should only be used when authActorRef is expected to exist
    (snapshot) => snapshot,
    // Basic compare function, XState's default might be fine too
    (a, b) => a.value === b.value && a.context === b.context,
  )

  // A more robust way to handle authActorRef potentially being undefined initially
  // or if the component using this hook might render when authMachine is not spawned.
  if (!authActorRef || !authMachineState) {
    return {
      authActorRef: undefined,
      sendToAuthMachine: undefined,
      authContext: undefined,
      matchesState: () => false, // Default non-matching function
      isLoading: false, // Default loading state
      error: null, // Default error state
    }
  }

  return {
    authActorRef, // The ref itself, if needed for direct sending or advanced use
    sendToAuthMachine: authActorRef.send,
    authContext: authMachineState.context as AuthContext, // Cast to specific AuthContext
    matchesState: authMachineState.matches, // Consumers can use this if they prefer
    // Convenience selectors for common needs
    error: authMachineState.context.error,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isLoadingEmail: (authMachineState.value as any) === 'submittingEmail',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isLoadingGoogle: (authMachineState.value as any) === 'submittingGoogle',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isLoadingRegistration: (authMachineState.value as any) === 'submittingRegistration',
    get isLoading() {
      return this.isLoadingEmail || this.isLoadingGoogle || this.isLoadingRegistration
    },
  }
}
