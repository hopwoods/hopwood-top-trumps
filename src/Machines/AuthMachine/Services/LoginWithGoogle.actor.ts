import { fromPromise } from 'xstate'
import type { User } from 'firebase/auth'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../../Firebase/FirebaseConfig' // Adjusted path

export const loginWithGoogleActor = fromPromise<User, void>(async () => {
  const provider = new GoogleAuthProvider()
  const userCredential = await signInWithPopup(auth, provider)
  return userCredential.user
})
