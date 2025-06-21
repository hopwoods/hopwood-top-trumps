import { fromPromise } from 'xstate'
import type { Deck } from '../DeckMachine.types'

// TODO: [DECK_MGMT_ACTORS] Implement actual Firebase service actors
export const saveDeckActor = fromPromise(async ({ input }: { input: { deck: Deck } }) => {
  console.log('Simulating saving deck:', input.deck)
  await new Promise(resolve => setTimeout(resolve, 1000))
  return input.deck // Simulate successful save
})
