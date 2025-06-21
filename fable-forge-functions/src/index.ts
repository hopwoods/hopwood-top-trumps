import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import type { UserRecord } from 'firebase-functions/v1/auth'; // Correct top-level import
import { staticDefaultDeckData } from './data/defaultDeckData';

// Initialize Firebase Admin SDK
// This should only be done once per function deployment.
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = admin.firestore();

/**
 * Auth trigger that provisions a default deck for new users.
 */
export const onCreateUserProvisionDefaultDeck = functions.auth.user().onCreate(async (user: UserRecord) => {
  const { uid, email } = user; // displayName removed as it was unused
  functions.logger.info(`New user created: UID = ${uid}, Email = ${email}`);

  const defaultDeckDocument = {
    userId: uid,
    name: staticDefaultDeckData.name,
    description: staticDefaultDeckData.description,
    cardCount: staticDefaultDeckData.cardsData.length,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  try {
    // 1. Create the deck document
    const deckRef = await db.collection('decks').add(defaultDeckDocument);
    functions.logger.info(`Default deck created for user ${uid} with deck ID: ${deckRef.id}`);

    // 2. Create cards in a subcollection using a batch
    const batch = db.batch();
    const cardsCollectionRef = deckRef.collection('cards');

    staticDefaultDeckData.cardsData.forEach((cardData) => {
      const newCardRef = cardsCollectionRef.doc(); // Auto-generate card ID
      batch.set(newCardRef, {
        ...cardData, // name, imageUrl, attributes
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        // specialAbility is intentionally omitted as per plan
      });
    });

    await batch.commit();
    functions.logger.info(`Added ${staticDefaultDeckData.cardsData.length} cards to default deck ${deckRef.id} for user ${uid}`);

    return { success: true, deckId: deckRef.id };
  } catch (error) {
    functions.logger.error(`Error provisioning default deck for user ${uid}:`, error);
    throw new functions.https.HttpsError('internal', 'Failed to provision default deck.', error);
  }
});

// Example of another function (can be removed if not needed)
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
