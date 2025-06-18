import { createUserWithEmailAndPassword, type User } from 'firebase/auth' // Added User type
import { fromPromise } from 'xstate'
import { auth } from '../../../Firebase/FirebaseConfig' // Adjust path as necessary
import type { AppEvent } from '../AppMachine.types' // Adjust path as necessary

export const registerWithEmailActor = fromPromise<
  User, // Output type is now User
  { event: Extract<AppEvent, { type: 'SUBMIT_REGISTRATION' }> }
>(async ({ input }) => {
  // Type guard to ensure input.event is correctly typed
  if (input.event.type !== 'SUBMIT_REGISTRATION') {
    throw new Error('Invalid event type for registerWithEmailActor')
  }

  const { email, password } = input.event
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
