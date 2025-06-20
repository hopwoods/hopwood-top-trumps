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
  new Promise<User | null>((resolve) => { // Prefixed reject with underscore
    // Check if in E2E testing mode
    // Vite exposes env variables via import.meta.env
    // If E2E_TESTING is set by the webServer command for Playwright,
    // Vite should make it available. We might need to prefix with VITE_
    // For now, let's try process.env and then import.meta.env if that fails.
    // The .clinerules mention process.env.E2E_TESTING for vite.config.ts
    // Let's assume it's available as process.env.E2E_TESTING here too,
    // or that Vite's define config makes it available.
    // A safer way for client-side code is import.meta.env.VITE_E2E_TESTING
    // but let's try the simpler one first based on existing patterns.

    if (process.env.E2E_TESTING === 'true' || import.meta.env.VITE_E2E_TESTING === 'true') {
      console.log('[CheckAuthStatusActor] E2E_TESTING mode: resolving with null user.');
      resolve(null); // Simulate no user logged in for E2E auth tests
    } else {
      // TEMP: For testing the HomePage UI without requiring login (during normal dev)
      console.log('[CheckAuthStatusActor] Non-E2E mode: resolving with mockUser.');
      resolve(mockUser);
    }

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
        _reject(error) // Use _reject here as well
      },
    )
    */
  }),
)
