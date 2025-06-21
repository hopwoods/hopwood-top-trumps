import { auth as functionsAuth, logger as functionsLogger } from 'firebase-functions/v1'; // Specific v1 imports
import * as admin from 'firebase-admin';
import type { UserRecord } from 'firebase-functions/v1/auth';
import { staticDefaultDeckData } from './data/defaultDeckData';

// Initialize Firebase Admin SDK
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = admin.firestore();

/**
 * Auth trigger that provisions a default deck for new users. (Using specific v1 imports)
 */
export const onCreateUserProvisionDefaultDeck = functionsAuth.user().onCreate(async (user: UserRecord) => {
  const { uid, email } = user;
  functionsLogger.info(`New user created: UID = ${uid}, Email = ${email}`);

  const defaultDeckDocument = {
    userId: uid,
    name: staticDefaultDeckData.name,
    description: staticDefaultDeckData.description,
    cardCount: staticDefaultDeckData.cardsData.length,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  try {
    const deckRef = await db.collection('decks').add(defaultDeckDocument);
    functionsLogger.info(`Default deck created for user ${uid} with deck ID: ${deckRef.id}`);

    const batch = db.batch();
    const cardsCollectionRef = deckRef.collection('cards');

    staticDefaultDeckData.cardsData.forEach((cardData) => {
      const newCardRef = cardsCollectionRef.doc();
      batch.set(newCardRef, {
        ...cardData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    await batch.commit();
    functionsLogger.info(`Added ${staticDefaultDeckData.cardsData.length} cards to default deck ${deckRef.id} for user ${uid}`);

    return { success: true, deckId: deckRef.id };
  } catch (error) {
    functionsLogger.error(`Error provisioning default deck for user ${uid}:`, error);
    return { success: false, error: (error as Error).message || 'Unknown error during deck provisioning.' };
  }
});

// Example of another function (can be removed if not needed)
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functionsLogger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
