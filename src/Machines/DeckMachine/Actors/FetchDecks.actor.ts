import { fromPromise } from 'xstate'
import type { Deck } from '../DeckMachine.types'

// TODO: [DECK_MGMT_ACTORS] Implement actual Firebase service actors
export const fetchDecksActor = fromPromise(async () => {
  console.log('Simulating fetching decks...')
  await new Promise(resolve => setTimeout(resolve, 1000))
  // Simulate fetching an empty array of decks for now
  return [] as Deck[]
})
