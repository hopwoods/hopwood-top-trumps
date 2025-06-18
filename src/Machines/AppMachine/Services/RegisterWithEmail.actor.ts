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
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  return userCredential.user // This will be the data in REGISTRATION_SUCCESS
})
