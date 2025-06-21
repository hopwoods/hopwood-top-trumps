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
} from 'firebase/firestore'
import { firestore as db } from './FirebaseConfig' // Import firestore and alias it as db
import type { Deck } from '../Machines/DeckMachine/DeckMachine.types' // Adjust path as needed

const DECKS_COLLECTION = 'decks'

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
    // cardCount: data.cardCount, // If you add this field
  } as Deck // Cast to Deck, ensuring all fields are covered
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
    const decksRef = collection(db, DECKS_COLLECTION)
    const q = query(decksRef, where('userId', '==', userId))
    const querySnapshot = await getDocs(q)
    const decks: Deck[] = []
    querySnapshot.forEach((snapshotDoc) => {
      decks.push(deckFromSnapshot(snapshotDoc))
    })
    return decks
  } catch (error) {
    console.error('Error fetching user decks:', error)
    throw error // Re-throw to be caught by the actor
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
    throw error
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
    throw error
  }
}

// TODO: Implement functions for card operations (add, update, delete cards in a deck's subcollection)
// e.g., addCardToDeck(deckId: string, cardData: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>): Promise<Card>
// e.g., getDeckCards(deckId: string): Promise<Card[]>
