import { fromPromise } from 'xstate'
// Deck type is implicitly handled by the return type of getUserDecks
import { getUserDecks } from '../../../Firebase/firebaseDeckService' // Adjusted path

// TODO: [DECK_MGMT_ACTORS] Further error handling or data transformation if needed.
export const fetchDecksActor = fromPromise(async ({ input }: { input: { userId: string | null } }) => {
  if (!input.userId) {
    console.error('FetchDecksActor: userId is missing in input.')
    // Or throw new Error('User ID is required to fetch decks.');
    // Depending on how DeckMachine handles this, returning empty or throwing.
    // For now, if DeckMachine ensures userId is present, this check might be redundant.
    // However, DeckMachineContext.userId is string | null.
    // The invoke in AppMachine should ensure a valid string userId is passed.
    // If it can be null from DeckMachine's context, this actor needs to handle it.
    // Let's assume DeckMachine will only call this if userId is available.
    // The input to this actor will be shaped by DeckMachine's invoke config.
    throw new Error('User ID is required to fetch decks.') // Actor should expect valid input
  }
  console.log(`Fetching decks for user: ${input.userId}...`)
  return getUserDecks(input.userId)
})
