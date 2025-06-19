import { createUserWithEmailAndPassword, type User } from 'firebase/auth' // Added User type
import { fromPromise } from 'xstate'
import { auth } from '../../../Firebase/FirebaseConfig' // Adjust path as necessary

// Simplified input structure to match the loginWithEmailActor pattern
export const registerWithEmailActor = fromPromise<
  User, // Output type is User
  { email: string; password: string }
>(async ({ input }) => {
  const { email, password } = input
  // Original production logic:
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    // Ensure a proper error object is always thrown for the machine
    if (error instanceof Error) {
      throw error;
    } else if (typeof error === 'string') {
      throw new Error(error);
    } else if (error && typeof (error as { message?: unknown }).message === 'string') {
      throw new Error((error as { message: string }).message);
    } else {
      // Fallback for undefined or unknown error structures
      console.error('RegisterWithEmailActor caught an unusual error:', error);
      throw new Error('An unexpected error occurred during registration.');
    }
  }
})
