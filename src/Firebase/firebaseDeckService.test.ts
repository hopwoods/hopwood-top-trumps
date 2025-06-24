/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vitest/globals" />
import { vi } from 'vitest'
import { getUserDecks, createDeckWithCards, updateDeck, deleteDeck } from './firebaseDeckService' // Changed saveDeck to updateDeck
import type { Deck } from '../Machines/DeckMachine/DeckMachine.types'
import type { DeckDataForCreation } from '../Data/DefaultDeckData' // Corrected import path

// Use vi.hoisted to ensure mockDbInstance is initialized before mocks that use it.
const { mockDbInstance } = vi.hoisted(() => {
  return { mockDbInstance: {} };
});

// Mock FirebaseConfig to control the exported firestore instance.
vi.mock('./FirebaseConfig', () => {
  // This factory is hoisted. It must return the structure with the already defined mockDbInstance.
  return {
    firestore: mockDbInstance,
  };
});

// Mock the entire 'firebase/firestore' module
vi.mock('firebase/firestore', async (importOriginal) => {
  const original = await importOriginal<typeof import('firebase/firestore')>()
  return {
    ...original, // Spread original module to keep other exports intact
    getFirestore: vi.fn(),
    collection: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    getDocs: vi.fn(),
    doc: vi.fn(),
    getDoc: vi.fn(),
    setDoc: vi.fn(),
    addDoc: vi.fn(),
    updateDoc: vi.fn(),
    deleteDoc: vi.fn(),
    writeBatch: vi.fn().mockImplementation(() => ({
      set: vi.fn(),
      commit: vi.fn().mockResolvedValue(undefined),
    })),
    serverTimestamp: vi.fn(() => new Date()), // Mock serverTimestamp
    Timestamp: {
      now: vi.fn(() => ({
        toDate: () => new Date(),
        toMillis: () => Date.now(),
      })),
      fromDate: vi.fn((date: Date) => ({
        toDate: () => date,
        toMillis: () => date.getTime(),
      })),
    },
  }
})

// Import the mocked functions to control their behavior
// Vitest's vi.mock hoists, so we can import them directly and they will be the mocked versions.
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc, // For getDeckById if implemented
  updateDoc as firestoreUpdateDoc, // Import actual updateDoc
  deleteDoc,
  writeBatch,
} from 'firebase/firestore'

const mockCollection = vi.mocked(collection)
const mockQuery = vi.mocked(query)
const mockWhere = vi.mocked(where)
const mockGetDocs = vi.mocked(getDocs)
const mockDoc = vi.mocked(doc)
const mockGetDoc = vi.mocked(getDoc) // Uncommented
const mockDeleteDoc = vi.mocked(deleteDoc)
const mockWriteBatch = vi.mocked(writeBatch)
const mockUpdateDoc = vi.mocked(firestoreUpdateDoc) // Define mockUpdateDoc


describe('firebaseDeckService', () => {

  beforeEach(() => {
    vi.resetAllMocks()
    // mockFirebaseConfigFirestoreExport is no longer used with this simplified mock.
    // If getFirestore were used directly by the service (it's not, service uses FirebaseConfig directly),
    // this would be relevant:
    // mockGetFirestore.mockReturnValue(mockDbInstance as any);
  })

  describe('getUserDecks', () => {
    it('should fetch and return decks for a user', async () => {
      const now = new Date()
      const mockTimestamp = { // Simulate Firestore Timestamp structure
        toDate: () => now,
        toMillis: () => now.getTime(),
      }
      const mockDeckData = {
        name: 'Test Deck 1',
        userId: 'user123',
        cards: [],
        createdAt: mockTimestamp, // Use mocked Timestamp
        updatedAt: mockTimestamp, // Use mocked Timestamp
      }
      const mockDocSnap = { id: 'deck1', data: () => mockDeckData }
      const mockSnapshot = {
        docs: [mockDocSnap],
        empty: false,
        forEach: (callback: (docSnap: any) => void) => [mockDocSnap].forEach(callback) // Add forEach
      }
      mockGetDocs.mockResolvedValue(mockSnapshot as any)
      mockCollection.mockReturnValue({} as any) // Mock collection return value
      mockQuery.mockReturnValue({} as any) // Mock query return value
      mockWhere.mockReturnValue({} as any) // Mock where return value


      const decks = await getUserDecks('user123')

      expect(mockCollection).toHaveBeenCalledWith(mockDbInstance, 'decks')
      expect(mockWhere).toHaveBeenCalledWith('userId', '==', 'user123')
      expect(mockQuery).toHaveBeenCalled() // More specific checks can be added for query composition
      expect(mockGetDocs).toHaveBeenCalled()
      expect(decks).toHaveLength(1)
      const expectedDeckDataWithJSDates = {
        ...mockDeckData,
        createdAt: mockDeckData.createdAt.toDate(), // Ensure JS Date for comparison
        updatedAt: mockDeckData.updatedAt.toDate(), // Ensure JS Date for comparison
      };
      expect(decks[0]).toEqual(expect.objectContaining({ id: 'deck1', ...expectedDeckDataWithJSDates }))
    })

    it('should return an empty array if user has no decks', async () => {
      const mockSnapshot = {
        docs: [],
        empty: true,
        forEach: (callback: (docSnap: any) => void) => [].forEach(callback) // Add forEach
      }
      mockGetDocs.mockResolvedValue(mockSnapshot as any)
      mockCollection.mockReturnValue({} as any)
      mockQuery.mockReturnValue({} as any)
      mockWhere.mockReturnValue({} as any)

      const decks = await getUserDecks('user-no-decks')
      expect(decks).toEqual([])
    })

    it('should throw an error if fetching decks fails', async () => {
      mockGetDocs.mockRejectedValue(new Error('Firestore query failed'))
      mockCollection.mockReturnValue({} as any)
      mockQuery.mockReturnValue({} as any)
      mockWhere.mockReturnValue({} as any)

      await expect(getUserDecks('user-error')).rejects.toThrow('Error fetching user decks: Firestore query failed')
    })
  })

  describe('createDeckWithCards', () => {
    const userId = 'user123'
    const deckToCreate: DeckDataForCreation = {
      name: 'New Awesome Deck',
      description: 'A deck for testing creation',
      cardsData: [
        {
          name: 'Test Card 1',
          attributes: { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1 },
        },
      ],
    }
    const mockDeckDocRef = { id: 'newDeckId', path: 'decks/newDeckId' } as any; // Add path for mock
    const mockCardDocRef = { id: 'newCardId', path: 'decks/newDeckId/cards/newCardId' } as any; // Add path for mock
    const DECKS_COLLECTION = 'decks'; // Define for mock logic
    const CARDS_SUBCOLLECTION = 'cards'; // Define for mock logic

    beforeEach(() => {
      // Reset specific mocks used in these tests
      mockDoc.mockClear()
      mockCollection.mockClear()
      mockWriteBatch.mockClear()

      // Setup default behavior for mocks
      // For collection().doc() or doc(collection()) to generate new IDs
      mockDoc.mockImplementation((refOrFirestore, pathOrIdIfFirstArgIsFirestore, ...segments) => {
        // Check if the first argument is a collection reference (has a 'path' property)
        // and if that path matches the CARDS_SUBCOLLECTION for a specific deck.
        if (refOrFirestore && (refOrFirestore as any).path && (refOrFirestore as any).path === `${DECKS_COLLECTION}/${mockDeckDocRef.id}/${CARDS_SUBCOLLECTION}`) {
          // This is for doc(cardsCollectionRef) -> new card
          return mockCardDocRef;
        }
        // Check if it's for doc(db, DECKS_COLLECTION, specificId) -> existing deck (not used in this test's beforeEach for new doc)
        if (typeof pathOrIdIfFirstArgIsFirestore === 'string' && pathOrIdIfFirstArgIsFirestore === DECKS_COLLECTION && segments.length > 0) {
           return { id: segments[0], path: `${DECKS_COLLECTION}/${segments[0]}` } as any;
        }
        // Default for doc(collection(db, DECKS_COLLECTION)) -> new deck
        if (refOrFirestore && (refOrFirestore as any).path === DECKS_COLLECTION && !pathOrIdIfFirstArgIsFirestore) {
            return mockDeckDocRef;
        }
        // Fallback for other doc calls, or specific existing doc if path is fully qualified
        if (typeof pathOrIdIfFirstArgIsFirestore === 'string' && pathOrIdIfFirstArgIsFirestore.includes('/')) {
             return { id: pathOrIdIfFirstArgIsFirestore.split('/').pop() || 'fixedMockId', path: pathOrIdIfFirstArgIsFirestore } as any;
        }
        // Default to new deck ref if it's just doc(collectionRefForDecks)
        return mockDeckDocRef;
      });

      // Mock collection to return a ref that can be used by doc
      mockCollection.mockImplementation((firestoreInput, path) => {
        // Ensure the path is correctly formed for subcollections
        let constructedPath = path;
        if (firestoreInput && (firestoreInput as any).path && path) { // If firestoreInput is actually a DocumentReference
            constructedPath = `${(firestoreInput as any).path}/${path}`;
        }
        return { firestore: firestoreInput, path: constructedPath, id: path } as any; // Added id for clarity
      });


      const batchInstance = {
        set: vi.fn(),
        commit: vi.fn().mockResolvedValue(undefined),
      };
      (mockWriteBatch as any).mockReturnValue(batchInstance);

      // Mock getDoc for fetching the created deck
      const mockCreatedDeckData = {
        ...deckToCreate,
        userId,
        cardCount: deckToCreate.cardsData.length,
        createdAt: { toDate: () => new Date(), toMillis: () => Date.now() }, // Mock Timestamp
        updatedAt: { toDate: () => new Date(), toMillis: () => Date.now() }, // Mock Timestamp
      };
      const mockCreatedDeckSnap = {
        exists: () => true,
        id: mockDeckDocRef.id,
        data: () => mockCreatedDeckData,
      };
      // This mockGetDoc needs to be the one from 'firebase/firestore'
      mockGetDoc.mockResolvedValue(mockCreatedDeckSnap as any);


      // Mock getDocs for fetching created cards
      const mockCreatedCardData = {
        ...deckToCreate.cardsData[0],
        createdAt: { toDate: () => new Date(), toMillis: () => Date.now() },
        updatedAt: { toDate: () => new Date(), toMillis: () => Date.now() },
      };
      const mockCreatedCardSnap = { id: mockCardDocRef.id, data: () => mockCreatedCardData };
      const mockCreatedCardsQuerySnap = {
        docs: [mockCreatedCardSnap],
        empty: false,
        forEach: (callback: (docSnap: any) => void) => [mockCreatedCardSnap].forEach(callback),
      };
      mockGetDocs.mockResolvedValue(mockCreatedCardsQuerySnap as any);
    })

    it('should create a new deck and its cards using a batch write', async () => {
      const result = await createDeckWithCards(userId, deckToCreate)

      // The service calls writeBatch(db), so our mockWriteBatch should be called with mockDbInstance
      // And it returns the batchInstance.
      const batchInstance = mockWriteBatch.mock.results[0].value;


      expect(mockDoc).toHaveBeenCalledWith(mockCollection(mockDbInstance as any, 'decks')) // For deckDocRef
      expect(batchInstance.set).toHaveBeenCalledTimes(1 + deckToCreate.cardsData.length) // Deck + cards

      // Check deck document data (simplified check for key properties)
      expect(batchInstance.set).toHaveBeenCalledWith(
        mockDeckDocRef,
        expect.objectContaining({
          userId,
          name: deckToCreate.name,
          cardCount: deckToCreate.cardsData.length,
        })
      )
      // Check card document data (simplified)
      expect(batchInstance.set).toHaveBeenCalledWith(
        mockCardDocRef, // This relies on mockDoc returning this for the card subcollection path
        expect.objectContaining({
          name: deckToCreate.cardsData[0].name,
        })
      )
      expect(batchInstance.commit).toHaveBeenCalledTimes(1)
      expect(mockGetDoc).toHaveBeenCalledWith(mockDeckDocRef) // Use the correctly mocked getDoc
      expect(mockGetDocs).toHaveBeenCalled() // Check if created cards were fetched

      expect(result.id).toBe(mockDeckDocRef.id)
      expect(result.name).toBe(deckToCreate.name)
      expect(result.userId).toBe(userId)
      expect(result.cards).toHaveLength(deckToCreate.cardsData.length)
      expect(result.cards[0].id).toBe(mockCardDocRef.id)
      expect(result.cards[0].name).toBe(deckToCreate.cardsData[0].name)
    })

    it('should throw error if userId is not provided', async () => {
      await expect(createDeckWithCards('', deckToCreate)).rejects.toThrow('createDeckWithCards: userId is required.')
    })

    it('should throw error if cardsData is missing or empty', async () => {
      await expect(createDeckWithCards(userId, { ...deckToCreate, cardsData: [] })).rejects.toThrow('createDeckWithCards: deckToCreate must include cardsData.')
      await expect(createDeckWithCards(userId, { name: 'Deck without cards' } as any)).rejects.toThrow('createDeckWithCards: deckToCreate must include cardsData.')
    })

    it('should throw error if batch commit fails', async () => {
      const batchInstance = {
        set: vi.fn(),
        commit: vi.fn().mockRejectedValue(new Error('Batch commit failed')),
      };
      (mockWriteBatch as any).mockReturnValue(batchInstance);

      await expect(createDeckWithCards(userId, deckToCreate)).rejects.toThrow('Batch commit failed')
    })
  })

  describe('updateDeck', () => {
    const deckId = 'existingDeck123'
    const partialDeckData: Partial<Omit<Deck, 'id' | 'createdAt' | 'updatedAt' | 'cards' | 'userId'>> = {
      name: 'Updated Deck Name',
      description: 'Updated description.',
    }

    it('should update an existing deck', async () => {
      mockUpdateDoc.mockResolvedValue(undefined)


      await updateDeck(deckId, partialDeckData)

      expect(mockDoc).toHaveBeenCalledWith(mockDbInstance, 'decks', deckId)
      const deckRef = mockDoc.mock.results[0].value // Get the return value of the last mockDoc call

      // updateDoc is called with the document reference and the data to update
      // It also automatically adds an updatedAt serverTimestamp
      expect(mockUpdateDoc).toHaveBeenCalledWith(
        deckRef,
        expect.objectContaining({
          ...partialDeckData,
          updatedAt: expect.any(Date), // serverTimestamp() mock returns new Date()
        })
      )
    })

    it('should throw error if deckId is not provided', async () => {
      await expect(updateDeck('', partialDeckData)).rejects.toThrow('updateDeck: deckId is required.')
    })

    it('should throw error if updating deck fails', async () => {
      mockUpdateDoc.mockRejectedValue(new Error('Firestore update failed'))

      await expect(updateDeck(deckId, partialDeckData)).rejects.toThrow('Error updating deck: Firestore update failed')
    })
  })

  // More tests for deleteDeck will follow

  describe('deleteDeck', () => {
    const deckId = 'deckToDelete123'

    it('should delete an existing deck', async () => {
      mockDeleteDoc.mockResolvedValue(undefined)

      await deleteDeck(deckId)

      expect(mockDoc).toHaveBeenCalledWith(mockDbInstance, 'decks', deckId)
      const deckRef = mockDoc.mock.results[0].value // Get the return value of the last mockDoc call
      expect(mockDeleteDoc).toHaveBeenCalledWith(deckRef)
    })

    it('should throw error if deckId is not provided', async () => {
      await expect(deleteDeck('')).rejects.toThrow('deleteDeck: deckId is required.')
    })

    it('should throw error if deleting deck fails', async () => {
      mockDeleteDoc.mockRejectedValue(new Error('Firestore delete failed'))

      await expect(deleteDeck(deckId)).rejects.toThrow('Error deleting deck: Firestore delete failed')
    })
  })
})
