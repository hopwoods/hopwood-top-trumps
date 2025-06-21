import { useState, useEffect } from 'react'
import type { ActorRefFrom, SnapshotFrom } from 'xstate'
import { GlobalStateContext } from './UseAppState' // Assuming appMachine's actor is the root
import { deckMachine } from '../Machines/DeckMachine/DeckMachine'
// DeckMachineContext and DeckMachineEvents are not directly used here, types are inferred.


/**
 * Hook to interact with the spawned/invoked deckMachine actor.
 * It assumes deckMachine is a child of appMachine and its reference
 * can be found in appMachine's state.
 */
export const useDeckMachineState = () => {
  const appActorRef = GlobalStateContext.useActorRef()
  const [appSnapshot, setAppSnapshot] = useState(appActorRef.getSnapshot())

  useEffect(() => {
    const subscription = appActorRef.subscribe(setAppSnapshot)
    return () => subscription.unsubscribe()
  }, [appActorRef])

  const deckMachineActorRef = appSnapshot.children.deckMachineActor as ActorRefFrom<typeof deckMachine> | undefined

  const [deckMachineSnapshot, setDeckMachineSnapshot] = useState<SnapshotFrom<typeof deckMachine> | undefined>(
    deckMachineActorRef?.getSnapshot()
  )

  useEffect(() => {
    if (deckMachineActorRef) {
      const subscription = deckMachineActorRef.subscribe(setDeckMachineSnapshot)
      return () => subscription.unsubscribe()
    }
    setDeckMachineSnapshot(undefined) // Clear snapshot if actor disappears
    return undefined
  }, [deckMachineActorRef])

  return {
    snapshot: deckMachineSnapshot,
    send: deckMachineActorRef?.send,
    isLoading: deckMachineSnapshot?.matches('loadingDecks') || deckMachineSnapshot?.matches('savingDeck') || deckMachineSnapshot?.matches('deletingDeck'),
    decks: deckMachineSnapshot?.context.decks ?? [],
    selectedDeck: deckMachineSnapshot?.context.selectedDeck ?? null,
    error: deckMachineSnapshot?.context.error ?? null,
  }
}
