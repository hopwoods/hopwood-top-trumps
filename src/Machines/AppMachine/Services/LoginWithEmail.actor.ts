import { fromPromise } from 'xstate'
import type { User } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../Firebase/FirebaseConfig' // Adjusted path

export const loginWithEmailActor = fromPromise<User, { email: string; password: string }>(
  async ({ input }) => {
    const { email, password } = input
    if (!email || !password) {
      throw new Error('Email and password are required.')
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  },
)
