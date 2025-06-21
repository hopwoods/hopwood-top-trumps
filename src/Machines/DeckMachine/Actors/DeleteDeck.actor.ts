import { fromPromise } from 'xstate'
import { deleteDeck } from '../../../Firebase/firebaseDeckService' // Adjusted path

// TODO: [DECK_MGMT_ACTORS] Further error handling or data transformation if needed.
export const deleteDeckActor = fromPromise(async ({ input }: { input: { deckId: string } }) => {
  if (!input.deckId) {
    console.error('DeleteDeckActor: deckId is missing in input.')
    throw new Error('Deck ID is required to delete a deck.')
  }
  console.log(`Deleting deck: ${input.deckId}...`)
  await deleteDeck(input.deckId)
  // deleteDeck returns void, so we return something to signify success to the machine if needed,
  // or the machine can just transition onDone without specific output.
  // Returning the ID can be useful for the machine to know which deck was processed.
  return { id: input.deckId }
})
