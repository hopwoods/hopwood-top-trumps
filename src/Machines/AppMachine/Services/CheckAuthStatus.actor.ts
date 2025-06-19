import { fromPromise } from 'xstate'
import type { User } from 'firebase/auth'
// import { onAuthStateChanged } from 'firebase/auth'
// import { auth } from '../../../Firebase/FirebaseConfig' // Adjusted path

// FOR DEVELOPMENT ONLY - Return a mock user for testing Homepage UI
const mockUser: User = {
  uid: 'test-user-123',
  email: 'test@example.com',
  displayName: 'Test User',
  emailVerified: true,
  isAnonymous: false,
  metadata: {
    creationTime: Date.now().toString(),
    lastSignInTime: Date.now().toString(),
  },
  providerData: [],
  refreshToken: '',
  tenantId: null,
  delete: async () => {},
  getIdToken: async () => 'mock-token',
  getIdTokenResult: async () => ({
    token: 'mock-token',
    authTime: new Date().toISOString(),
    issuedAtTime: new Date().toISOString(),
    expirationTime: new Date(Date.now() + 3600000).toISOString(),
    claims: {},
    signInProvider: null,
    signInSecondFactor: null,
  }),
  reload: async () => {},
  toJSON: () => ({}),
  phoneNumber: null,
  photoURL: null,
  providerId: 'firebase',
} as User;

export const checkAuthStatusActor = fromPromise<User | null, void>(() =>
  new Promise<User | null>((resolve) => {
    // TEMP: For testing the HomePage UI without requiring login
    resolve(mockUser);

    // ORIGINAL AUTHENTICATION CHECK - Uncomment for production use
    /*
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
    */
  }),
)
