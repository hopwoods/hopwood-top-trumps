import { fromPromise } from 'xstate'
import { signOut } from 'firebase/auth'
import { auth } from '../../../Firebase/FirebaseConfig' // Adjusted path

export const logoutActor = fromPromise<void, void>(async () => {
  await signOut(auth)
})
