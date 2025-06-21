import { fromPromise } from 'xstate'
import { getUserDecks, createDeckWithCards } from '../../../Firebase/firebaseDeckService'
import { staticDefaultDeckData } from '../../../Data/DefaultDeckData'

interface CheckAndProvisionDefaultDeckInput {
  userId: string
}

/**
 * XState actor to check if a user has any decks, and if not,
 * provisions the static default deck for them.
 */
export const checkAndProvisionDefaultDeckActor = fromPromise(
  async ({ input }: { input: CheckAndProvisionDefaultDeckInput }) => {
    const { userId } = input

    if (!userId) {
      console.error('CheckAndProvisionDefaultDeckActor: userId is required in input.')
      // Optionally throw an error or return a specific error object
      throw new Error('User ID is required for deck provisioning.')
    }

    try {
      const existingDecks = await getUserDecks(userId)

      if (existingDecks.length === 0) {
        console.log(`No decks found for user ${userId}. Provisioning default starter deck.`)
        // It's important that staticDefaultDeckData matches DeckDataForCreation type
        await createDeckWithCards(userId, staticDefaultDeckData)
        console.log(`Default starter deck provisioned for user ${userId}.`)
        return { provisioned: true, userId }
      } else {
        console.log(`User ${userId} already has ${existingDecks.length} deck(s). No default deck provisioning needed.`)
        return { provisioned: false, userId, existingDeckCount: existingDecks.length }
      }
    } catch (error) {
      console.error(`Error in CheckAndProvisionDefaultDeckActor for user ${userId}:`, error)
      // Re-throw the error so it can be caught by the invoking machine if needed
      throw error
    }
  },
)
