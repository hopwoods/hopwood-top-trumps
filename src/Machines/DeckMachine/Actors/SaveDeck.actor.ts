import { fromPromise } from 'xstate'
import type { Deck } from '../DeckMachine.types'
import { createDeck, updateDeck } from '../../../Firebase/firebaseDeckService' // Adjusted path

// TODO: [DECK_MGMT_ACTORS] Further error handling or data transformation if needed.
export const saveDeckActor = fromPromise(async ({ input }: { input: { deck: Deck; userId: string | null } }) => {
  const { deck, userId } = input

  if (deck.id) {
    // Update existing deck
    console.log(`Updating deck ${deck.id}:`, deck)
    // Prepare data for update (omitting fields that shouldn't be directly updated this way)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, cards: _cards, userId: _deckUserId, ...updateData } = deck
    await updateDeck(deck.id, updateData)
    // updateDeck doesn't return the deck, so we return the input deck as it should be after update
    // (assuming updatedAt is handled by Firestore or a trigger if not explicitly re-fetched)
    return { ...deck, updatedAt: new Date() } // Optimistic update of updatedAt for return
  } else {
    // Create new deck
    if (!userId) {
      console.error('SaveDeckActor (create): userId is missing in input.')
      throw new Error('User ID is required to create a new deck.')
    }
    console.log(`Creating new deck for user ${userId}:`, deck)
    // Prepare data for create (omitting fields that will be auto-generated or are not part of initial creation data)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, cards: _cards, ...createData } = deck
    return createDeck(userId, createData)
  }
})
