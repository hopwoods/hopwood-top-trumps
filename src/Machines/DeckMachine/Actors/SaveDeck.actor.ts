import { fromPromise } from 'xstate'
import type { Deck, DeckUpdatePayload } from '../DeckMachine.types'
import { createDeck, updateDeck, getDeck } from '../../../Firebase/firebaseDeckService' // Adjusted path

type SaveDeckActorInput = {
  deck: Partial<Deck> & { name: string };
  userId: string | null;
};

// TODO: [DECK_MGMT_ACTORS] Further error handling or data transformation if needed.
export const saveDeckActor = fromPromise(async ({ input }: { input: SaveDeckActorInput }) => {
  try {
    const { deck, userId } = input
    console.log('[SaveDeckActor] Actor started with input:', input)

    if (deck.id) {
      // Update existing deck
      console.log(`[SaveDeckActor] Updating deck ${deck.id}:`, deck)
      const updateData: DeckUpdatePayload = {
        name: deck.name,
        description: deck.description || '', // Ensure description is not undefined
      }
      await updateDeck(deck.id, updateData)
      console.log('[SaveDeckActor] updateDeck call finished.')

      // Fetch the full, updated deck to ensure we have the latest data for the UI
      const updatedDeck = await getDeck(deck.id);
      if (!updatedDeck) {
        throw new Error(`Failed to fetch updated deck with id: ${deck.id}`);
      }

      console.log('[SaveDeckActor] Returning result for update:', updatedDeck)
      return updatedDeck
    } else {
      // Create new deck
      if (!userId) {
        console.error('SaveDeckActor (create): userId is missing in input.')
        throw new Error('User ID is required to create a new deck.')
      }
      console.log(`[SaveDeckActor] Creating new deck for user ${userId}:`, deck)
      const createData = {
        name: deck.name,
        description: deck.description,
      }
      console.log('[SaveDeckActor] Calling createDeck with data:', createData)
      const result = await createDeck(userId, createData)
      console.log('[SaveDeckActor] createDeck call finished, returning result:', result)
      return result
    }
  } catch (error) {
    console.error('[SaveDeckActor] An error occurred:', error)
    // Re-throw a clean error for the machine to handle
    const message = error instanceof Error ? error.message : 'An unknown error occurred during save.'
    throw new Error(message)
  }
});
