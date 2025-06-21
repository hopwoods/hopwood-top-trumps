import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (admin.apps.length === 0) {
  admin.initializeApp();
}

// Example of another function (can be removed if not needed)
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functionsLogger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
