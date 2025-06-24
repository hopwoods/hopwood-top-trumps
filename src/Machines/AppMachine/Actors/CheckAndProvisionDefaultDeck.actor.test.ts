/// <reference types="vitest/globals" />
import { vi } from 'vitest'
// Import the logic function directly for testing
import { checkAndProvisionDefaultDeckLogic } from './CheckAndProvisionDefaultDeck.actor'
import { staticDefaultDeckData } from '../../../Data/DefaultDeckData'

// Mock the firebaseDeckService functions
vi.mock('../../../Firebase/firebaseDeckService', () => ({
  getUserDecks: vi.fn(),
  createDeckWithCards: vi.fn(),
}))

// Import the mocked functions to control their behavior in tests
// Vitest's vi.mock hoists, so we can import them directly and they will be the mocked versions.
import { getUserDecks, createDeckWithCards } from '../../../Firebase/firebaseDeckService'
const mockGetUserDecks = vi.mocked(getUserDecks)
const mockCreateDeckWithCards = vi.mocked(createDeckWithCards)

// The actual logic is the async function passed to fromPromise
// To test it, we need to extract it or test through the actor.
// For unit testing the logic directly, let's assume we can access the promise factory.
// If checkAndProvisionDefaultDeckActor is just `fromPromise(logicFn)`, we test `logicFn`.
// const actorLogic = (checkAndProvisionDefaultDeckActor as any).behavior.factory // No longer needed

describe('checkAndProvisionDefaultDeckLogic', () => { // Test the logic function directly
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should provision default deck if user has no decks', async () => {
    mockGetUserDecks.mockResolvedValue([])
    mockCreateDeckWithCards.mockResolvedValue(undefined) // Assuming it resolves with no specific value on success

    const input = { userId: 'test-user-1' }
    const result = await checkAndProvisionDefaultDeckLogic({ input }) // Call the imported logic

    expect(mockGetUserDecks).toHaveBeenCalledWith('test-user-1')
    expect(mockCreateDeckWithCards).toHaveBeenCalledWith('test-user-1', staticDefaultDeckData)
    expect(result).toEqual({ provisioned: true, userId: 'test-user-1' })
  })

  it('should not provision default deck if user already has decks', async () => {
    const existingDeck = {
      id: 'deck1',
      name: 'My Deck',
      userId: 'test-user-2',
      cards: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    mockGetUserDecks.mockResolvedValue([existingDeck]) // Simulate existing deck

    const input = { userId: 'test-user-2' }
    const result = await checkAndProvisionDefaultDeckLogic({ input }) // Call the imported logic

    expect(mockGetUserDecks).toHaveBeenCalledWith('test-user-2')
    expect(mockCreateDeckWithCards).not.toHaveBeenCalled()
    expect(result).toEqual({ provisioned: false, userId: 'test-user-2', existingDeckCount: 1 })
  })

  it('should throw an error if userId is not provided in input', async () => {
    const input = { userId: '' } // Empty userId
    await expect(checkAndProvisionDefaultDeckLogic({ input })).rejects.toThrow('User ID is required for deck provisioning.') // Call the imported logic
    expect(mockGetUserDecks).not.toHaveBeenCalled()
    expect(mockCreateDeckWithCards).not.toHaveBeenCalled()
  })

  it('should re-throw error if getUserDecks fails', async () => {
    const firebaseError = new Error('Firestore permission denied')
    mockGetUserDecks.mockRejectedValue(firebaseError)

    const input = { userId: 'test-user-3' }
    await expect(checkAndProvisionDefaultDeckLogic({ input })).rejects.toThrow('Firestore permission denied') // Call the imported logic

    expect(mockGetUserDecks).toHaveBeenCalledWith('test-user-3')
    expect(mockCreateDeckWithCards).not.toHaveBeenCalled()
  })

  it('should re-throw error if createDeckWithCards fails', async () => {
    mockGetUserDecks.mockResolvedValue([])
    const creationError = new Error('Failed to create deck')
    mockCreateDeckWithCards.mockRejectedValue(creationError)

    const input = { userId: 'test-user-4' }
    await expect(checkAndProvisionDefaultDeckLogic({ input })).rejects.toThrow('Failed to create deck') // Call the imported logic

    expect(mockGetUserDecks).toHaveBeenCalledWith('test-user-4')
    expect(mockCreateDeckWithCards).toHaveBeenCalledWith('test-user-4', staticDefaultDeckData)
  })
})
