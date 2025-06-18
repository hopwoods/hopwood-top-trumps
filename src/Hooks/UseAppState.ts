import { useState, useEffect } from 'react'
import { createActorContext } from '@xstate/react'
import type { ActorRefFrom, SnapshotFrom } from 'xstate'
import { appMachine } from '../Machines/AppMachine/AppMachine'
import type { AppContext } from '../Machines/AppMachine/AppMachine.types'

export const GlobalStateContext = createActorContext(appMachine)

export const useAppState = () => {
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
    // Ensure we are reading from the latest snapshot
    return actorRef.getSnapshot().context[key]
  }

  return {
    appState,
    send: actorRef.send,
    getAppStateValue,
    // Exposing actorRef directly can be useful for advanced scenarios,
    // but often appState and send are sufficient.
    // actorRef,
  }
}
