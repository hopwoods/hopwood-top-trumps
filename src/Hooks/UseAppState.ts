import { useState, useEffect } from 'react'
import { createActorContext } from '@xstate/react'
import type { ActorRefFrom, SnapshotFrom } from 'xstate'
import { appMachine } from '../Machines/AppMachine/AppMachine'
import { authMachine } from '../Machines/AuthMachine/AuthMachine'
import type { AppContext } from '../Machines/AppMachine/AppMachine.types'

// Explicit type for GlobalStateContext using ReturnType
export const GlobalStateContext: ReturnType<typeof createActorContext<typeof appMachine>> = createActorContext(appMachine)

// Define the return type for useAppState
export interface UseAppStateReturn {
  appState: SnapshotFrom<typeof appMachine>;
  send: ActorRefFrom<typeof appMachine>['send'];
  getAppStateValue: <K extends keyof AppContext>(key: K) => AppContext[K];
  authActorRef: ActorRefFrom<typeof authMachine> | undefined;
}

export const useAppState = (): UseAppStateReturn => {
  const actorRef: ActorRefFrom<typeof appMachine> = GlobalStateContext.useActorRef()
  const [appState, setAppState] = useState<SnapshotFrom<typeof appMachine>>(
    actorRef.getSnapshot(),
  )

  useEffect(() => {
    const subscription = actorRef.subscribe((snapshot) => {
      setAppState(snapshot)
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [actorRef])

  const getAppStateValue = <K extends keyof AppContext>(
    key: K,
  ): AppContext[K] => {
    return actorRef.getSnapshot().context[key]
  }

  // Get the spawned authActor ref if it exists
  const authActorRef = appState.children.authActor as ActorRefFrom<typeof authMachine> | undefined

  return {
    appState,
    send: actorRef.send, // send to appMachine
    getAppStateValue,
    authActorRef
  }
}
