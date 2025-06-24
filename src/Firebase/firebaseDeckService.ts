import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  Timestamp, // Import Timestamp for type casting if needed
  type DocumentSnapshot, // Added top-level import for DocumentSnapshot
  writeBatch, // Import writeBatch for batch operations
  getDoc, // Import getDoc for fetching a single document
} from 'firebase/firestore'
import { firestore as db } from './FirebaseConfig' // Import firestore and alias it as db
import type { Deck, Card } from '../Machines/DeckMachine/DeckMachine.types' // Adjust path as needed
import type { DeckDataForCreation } from '../Data/DefaultDeckData' // Import creation types

const DECKS_COLLECTION = 'decks'
const CARDS_SUBCOLLECTION = 'cards' // Re-enable

/**
 * Converts a Firestore document snapshot to a Deck object.
 * Handles timestamp conversion.
 */
const deckFromSnapshot = (snapshotDoc: DocumentSnapshot): Deck => {
  const data = snapshotDoc.data()
  if (!data) {
    throw new Error('Document data was undefined.')
  }
  return {
    id: snapshotDoc.id,
    userId: data.userId,
    name: data.name,
    description: data.description,
    cards: [], // Cards would be fetched separately if stored as a subcollection
    maxSize: data.maxSize,
    minSize: data.minSize,
    createdAt: (data.createdAt as Timestamp)?.toDate() ?? new Date(),
    updatedAt: (data.updatedAt as Timestamp)?.toDate() ?? new Date(),
    cardCount: data.cardCount ?? 0, // Ensure cardCount is handled
  } as Deck // Cast to Deck, ensuring all fields are covered
}

/**
 * Converts a Firestore card document snapshot to a Card object.
 * Handles timestamp conversion.
 */
const cardFromSnapshot = (snapshotDoc: DocumentSnapshot): Card => {
  const data = snapshotDoc.data()
  if (!data) {
    throw new Error('Card document data was undefined.')
  }
  return {
    id: snapshotDoc.id,
    name: data.name,
    imageUrl: data.imageUrl,
    attributes: data.attributes,
    // specialAbility will be undefined if not present in Firestore
    specialAbility: data.specialAbility,
    createdAt: (data.createdAt as Timestamp)?.toDate() ?? new Date(),
    updatedAt: (data.updatedAt as Timestamp)?.toDate() ?? new Date(),
  } as Card
}

/**
 * Fetches all decks for a given user.
 * @param userId The ID of the user whose decks to fetch.
 * @returns A promise that resolves to an array of Deck objects.
 */
export const getUserDecks = async (userId: string): Promise<Deck[]> => {
  if (!userId) {
    console.error('getUserDecks: userId is required.')
    return []
  }
  try {
    console.log(`[firebaseDeckService] getUserDecks for userId: ${userId} - Attempting query...`) // Added log
    const decksRef = collection(db, DECKS_COLLECTION)
    const q = query(decksRef, where('userId', '==', userId))
    const querySnapshot = await getDocs(q)
    console.log(`[firebaseDeckService] getUserDecks for userId: ${userId} - Query successful, found ${querySnapshot.size} docs.`) // Added log
    const decks: Deck[] = []
    querySnapshot.forEach((snapshotDoc) => {
      decks.push(deckFromSnapshot(snapshotDoc))
    })
    return decks
  } catch (error) {
    console.error('Error fetching user decks:', error)
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`Error fetching user decks: ${message}`)
  }
}

/**
 * Creates a new deck in Firestore.
 * @param userId The ID of the user creating the deck.
 * @param deckData Data for the new deck (excluding id, createdAt, updatedAt, cards).
 * @returns A promise that resolves to the created Deck object with its new ID.
 */
export const createDeck = async (
  userId: string,
  deckData: Omit<Deck, 'id' | 'createdAt' | 'updatedAt' | 'cards' | 'userId'>,
): Promise<Deck> => {
  if (!userId) {
    throw new Error('createDeck: userId is required.')
  }
  try {
    const docRef = await addDoc(collection(db, DECKS_COLLECTION), {
      ...deckData,
      userId, // Ensure userId is part of the document
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      cardCount: 0, // Initialize card count
    })
    // For returning the full Deck object, we'd ideally fetch the created doc.
    // Or, construct it optimistically if serverTimestamp() makes that hard immediately.
    // For now, let's return a basic version.
    return {
      id: docRef.id,
      userId,
      ...deckData,
      cards: [],
      createdAt: new Date(), // Placeholder, actual value is server-generated
      updatedAt: new Date(), // Placeholder
      cardCount: 0,
    } as Deck
  } catch (error) {
    console.error('Error creating deck:', error)
    throw error
  }
}

/**
 * Updates an existing deck in Firestore.
 * @param deckId The ID of the deck to update.
 * @param deckData Partial data to update the deck with.
 * @returns A promise that resolves when the update is complete.
 */
export const updateDeck = async (
  deckId: string,
  deckData: Partial<Omit<Deck, 'id' | 'createdAt' | 'updatedAt' | 'cards' | 'userId'>>,
): Promise<void> => {
  if (!deckId) {
    throw new Error('updateDeck: deckId is required.')
  }
  try {
    const deckRef = doc(db, DECKS_COLLECTION, deckId)
    await updateDoc(deckRef, {
      ...deckData,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error('Error updating deck:', error)
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`Error updating deck: ${message}`)
  }
}

/**
 * Deletes a deck from Firestore.
 * Note: This does not automatically delete subcollections (like cards).
 * A Firebase Function might be needed for cascading deletes.
 * @param deckId The ID of the deck to delete.
 * @returns A promise that resolves when the deletion is complete.
 */
export const deleteDeck = async (deckId: string): Promise<void> => {
  if (!deckId) {
    throw new Error('deleteDeck: deckId is required.')
  }
  try {
    const deckRef = doc(db, DECKS_COLLECTION, deckId)
    await deleteDoc(deckRef)
    // TODO: Implement deletion of cards subcollection, likely via a Firebase Function.
  } catch (error) {
    console.error('Error deleting deck:', error)
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`Error deleting deck: ${message}`)
  }
}

// TODO: Implement functions for card operations (add, update, delete cards in a deck's subcollection)
// e.g., addCardToDeck(deckId: string, cardData: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>): Promise<Card>
// e.g., getDeckCards(deckId: string): Promise<Card[]>

/**
 * Creates a new deck with its cards in Firestore using a batch write.
 * @param userId The ID of the user creating the deck.
 * @param deckToCreate Data for the new deck, including card data.
 * @returns A promise that resolves to the fully created Deck object.
 */
export const createDeckWithCards = async (
  userId: string,
  deckToCreate: DeckDataForCreation,
): Promise<Deck> => {
  if (!userId) {
    throw new Error('createDeckWithCards: userId is required.')
  }
  if (!deckToCreate || !deckToCreate.cardsData || deckToCreate.cardsData.length === 0) {
    throw new Error('createDeckWithCards: deckToCreate must include cardsData.')
  }

  const deckDocRef = doc(collection(db, DECKS_COLLECTION)) // Generate ID for the new deck
  console.log(`[firebaseDeckService] createDeckWithCards for userId: ${userId} - Deck ID ${deckDocRef.id} generated.`)

  try {
    console.log(`[firebaseDeckService] createDeckWithCards for userId: ${userId} - Starting batch write...`)
    const batch = writeBatch(db)

    // 1. Prepare deck document data
    const deckDocumentData = {
      userId,
      name: deckToCreate.name,
      description: deckToCreate.description || '',
      cardCount: deckToCreate.cardsData.length,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
    batch.set(deckDocRef, deckDocumentData)
    console.log(`[firebaseDeckService] createDeckWithCards for userId: ${userId} - Deck document added to batch.`)

    // 2. Prepare card documents and add to batch
    const cardsCollectionRef = collection(deckDocRef, CARDS_SUBCOLLECTION)
    deckToCreate.cardsData.forEach((cardData) => {
      const cardDocRef = doc(cardsCollectionRef) // Generate ID for each new card
      const cardDocument = {
        ...cardData, // name, imageUrl, attributes
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }
      batch.set(cardDocRef, cardDocument)
    })
    console.log(`[firebaseDeckService] createDeckWithCards for userId: ${userId} - ${deckToCreate.cardsData.length} Card documents added to batch.`)


    // 3. Commit the batch
    console.log(`[firebaseDeckService] createDeckWithCards for userId: ${userId} - Firestore instance:`, db)
    console.log(`[firebaseDeckService] createDeckWithCards for userId: ${userId} - Batch object:`, batch)
    console.log(`[firebaseDeckService] createDeckWithCards for userId: ${userId} - Committing batch...`)
    await batch.commit().catch(error => {
      console.error(`[firebaseDeckService] createDeckWithCards for userId: ${userId} - BATCH COMMIT FAILED:`, error)
      throw error // Re-throw to be caught by the outer try-catch
    })
    console.log(`[firebaseDeckService] createDeckWithCards for userId: ${userId} - Batch committed.`)

    // 4. Fetch the created deck document to get server timestamps
    console.log(`[firebaseDeckService] createDeckWithCards for userId: ${userId} - Fetching created deck document...`)
    const createdDeckSnap = await getDoc(deckDocRef)
    const newDeck = deckFromSnapshot(createdDeckSnap)

    // 5. Fetch the created card documents to get their server timestamps
    const fetchedCards: Card[] = []
    if (deckToCreate.cardsData.length > 0) { // Only fetch if we attempted to create cards
      console.log(`[firebaseDeckService] createDeckWithCards for userId: ${userId} - Fetching created card documents...`)
      const cardsCollectionRefAfterCommit = collection(deckDocRef, CARDS_SUBCOLLECTION)
      const createdCardsQuerySnap = await getDocs(cardsCollectionRefAfterCommit)
      createdCardsQuerySnap.forEach((cardDocSnap) => {
        fetchedCards.push(cardFromSnapshot(cardDocSnap))
      })
      console.log(`[firebaseDeckService] createDeckWithCards for userId: ${userId} - Fetched ${fetchedCards.length} cards.`)
    } else {
      console.log(`[firebaseDeckService] createDeckWithCards for userId: ${userId} - No cards in input, not fetching cards.`)
    }


    // 6. Return the full Deck object with populated cards
    return {
      ...newDeck,
      cards: fetchedCards,
    }
  } catch (error) {
    console.error('Error creating deck with cards:', error)
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`Error creating deck with cards: ${message}`)
  }
}
