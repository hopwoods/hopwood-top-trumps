import { fromPromise } from 'xstate'
import type { User } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../Firebase/FirebaseConfig' // Adjusted path

export const checkAuthStatusActor = fromPromise<User | null, void>(() =>
  new Promise<User | null>((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        resolve(user)
      },
      (error) => {
        unsubscribe()
        reject(error)
      },
    )
  }),
)
