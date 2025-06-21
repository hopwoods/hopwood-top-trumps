import { fromPromise } from 'xstate'

// TODO: [DECK_MGMT_ACTORS] Implement actual Firebase service actors
export const deleteDeckActor = fromPromise(async ({ input }: { input: { deckId: string } }) => {
  console.log('Simulating deleting deck:', input.deckId)
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { id: input.deckId } // Simulate successful deletion
})
