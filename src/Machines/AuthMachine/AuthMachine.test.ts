import { createActor, waitFor, fromPromise, type SnapshotFrom } from 'xstate'
import { authMachine } from './AuthMachine'
import type { User } from 'firebase/auth'
// Removed unused AuthContext, AuthEvent

// Mock the loginWithGoogleActor
const mockLoginWithGoogleActorFn = vi.fn()

const testUser: User = {
  uid: 'test-uid',
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: null,
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  refreshToken: '',
  tenantId: null,
  phoneNumber: null, // Added missing property
  delete: vi.fn(),
  getIdToken: vi.fn(),
  getIdTokenResult: vi.fn(),
  reload: vi.fn(),
  toJSON: vi.fn(),
  providerId: 'google.com',
}

describe('authMachine', () => {
  // Provide the mock actor correctly
  let mockAuthMachine = authMachine.provide({
    actors: {
      loginWithGoogleActor: fromPromise(() => mockLoginWithGoogleActorFn()),
    },
  })

  beforeEach(() => {
    // Reset the mock before each test
    mockLoginWithGoogleActorFn.mockReset()
    // Re-provide the machine with the reset mock
    mockAuthMachine = authMachine.provide({
      actors: {
        loginWithGoogleActor: fromPromise(() => mockLoginWithGoogleActorFn()),
      },
    })
  })

  it('should initialize in the idle state', () => {
    const actor = createActor(mockAuthMachine).start()
    expect(actor.getSnapshot().value).toBe('idle')
    expect(actor.getSnapshot().context.error).toBeNull()
    actor.stop()
  })

  it('should transition to submittingGoogle on SUBMIT_LOGIN_WITH_GOOGLE', () => {
    const actor = createActor(mockAuthMachine).start()
    actor.send({ type: 'SUBMIT_LOGIN_WITH_GOOGLE' })
    expect(actor.getSnapshot().value).toBe('submittingGoogle')
    actor.stop()
  })

  it('should transition to authenticated and send AUTHENTICATION_SUCCESS on successful Google login', async () => {
    mockLoginWithGoogleActorFn.mockResolvedValue(testUser)

    const actor = createActor(mockAuthMachine).start()
    actor.send({ type: 'SUBMIT_LOGIN_WITH_GOOGLE' })

    // Wait for the machine to reach the 'authenticated' state
    await waitFor(actor, (state: SnapshotFrom<typeof authMachine>) => state.value === 'authenticated')

    expect(actor.getSnapshot().value).toBe('authenticated')
    expect(actor.getSnapshot().context.error).toBeNull()

    // When the machine reaches its final state 'authenticated',
    // the 'sendAuthSuccessToParent' entry action should have been triggered.
    // The machine's status being 'done' indicates it reached a top-level final state.
    expect(actor.getSnapshot().status).toBe('done')

    actor.stop()
  })

  it('should transition to idle and set error on failed Google login', async () => {
    // This should match the error message set in AuthMachine's onError for loginWithGoogleActor
    const errorMessageInMachine = 'Google login failed.'
    mockLoginWithGoogleActorFn.mockRejectedValue(new Error(errorMessageInMachine))

    const actor = createActor(mockAuthMachine).start()
    actor.send({ type: 'SUBMIT_LOGIN_WITH_GOOGLE' })

    await waitFor(actor, (state: SnapshotFrom<typeof authMachine>) => state.value === 'idle' && state.context.error !== null)

    expect(actor.getSnapshot().value).toBe('idle')
    expect(actor.getSnapshot().context.error).toBe(errorMessageInMachine)
    actor.stop()
  })
})
