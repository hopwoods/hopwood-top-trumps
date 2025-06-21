/* eslint-disable @typescript-eslint/no-explicit-any */
import { createActor, waitFor, fromPromise, type SnapshotFrom } from 'xstate'
import { vi } from 'vitest' // Reverted to vi import
import { appMachine } from './AppMachine'
// Removed unused authMachine import
import type { User } from 'firebase/auth'

// --- Mocks for AppMachine's actors ---
const mockCheckAuthStatusActorFn = vi.fn() // Reverted to vi.fn()
const mockLogoutActorFn = vi.fn() // Reverted to vi.fn()
const mockAuthMachineActorLogic = vi.fn() // Reverted to vi.fn(), This will represent the logic of the spawned authMachine

const testUser: User = {
  uid: 'app-test-uid',
  email: 'app-test@example.com',
  displayName: 'App Test User',
  photoURL: null,
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  refreshToken: '',
  tenantId: null,
  phoneNumber: null,
  delete: vi.fn(),
  getIdToken: vi.fn(),
  getIdTokenResult: vi.fn(),
  reload: vi.fn(),
  toJSON: vi.fn(),
  providerId: 'google.com',
}

describe('appMachine', () => {
  // Helper to create a fully mocked AppMachine instance for testing
  const createMockedAppMachine = () => {
    return appMachine.provide({
      actors: {
        checkAuthStatusActor: fromPromise(() => mockCheckAuthStatusActorFn()),
        logoutActor: fromPromise(() => mockLogoutActorFn()),
        // Use the vi.fn() directly. It can be configured with mockImplementation in specific tests if needed.
        // For tests not focusing on authMachine interaction, a basic mock is often sufficient.
        authMachine: mockAuthMachineActorLogic as any,
      },
    })
  }

  beforeEach(() => {
    mockCheckAuthStatusActorFn.mockReset()
    mockLogoutActorFn.mockReset()
    mockAuthMachineActorLogic.mockReset()

    // Set a default, non-erroring implementation for the authMachine mock
    mockAuthMachineActorLogic.mockImplementation(() => ({
      id: 'mockAuthActorInstance',
      send: vi.fn(),
      subscribe: () => ({ unsubscribe: vi.fn() }),
      getSnapshot: () => ({ status: 'active', value: 'idle', context: { error: null } } as any),
      start: vi.fn(),
      stop: vi.fn(),
    }));
  })

  it('should initialize by invoking checkAuthStatusActor', () => {
    const actor = createActor(createMockedAppMachine()).start()
    expect(mockCheckAuthStatusActorFn).toHaveBeenCalled()
    expect(actor.getSnapshot().value).toBe('initializing')
    actor.stop()
  })

  it('should transition to authenticated.home if checkAuthStatusActor resolves with a user', async () => {
    mockCheckAuthStatusActorFn.mockResolvedValue(testUser)
    const actor = createActor(createMockedAppMachine()).start()

    await waitFor(actor, (state: any) => state.matches({ authenticated: 'home' }))

    expect(actor.getSnapshot().matches({ authenticated: 'home' })).toBe(true)
    expect(actor.getSnapshot().context.user).toEqual(testUser)
    expect(actor.getSnapshot().context.error).toBeNull()
    actor.stop()
  })

  it('should transition to unauthenticated if checkAuthStatusActor resolves with null', async () => {
    mockCheckAuthStatusActorFn.mockResolvedValue(null)
    const actor = createActor(createMockedAppMachine()).start()

    await waitFor(actor, (state: SnapshotFrom<typeof appMachine>) => state.value === 'unauthenticated')

    expect(actor.getSnapshot().value).toBe('unauthenticated')
    expect(actor.getSnapshot().context.user).toBeNull()
    expect(actor.getSnapshot().context.error).toBeNull()
    // Check if authMachine is invoked
    // This requires a more sophisticated mock for authMachineActorLogic
    // or inspecting the actor's children. For now, we assume it's invoked.
    actor.stop()
  })

  it('should transition to unauthenticated and set error if checkAuthStatusActor rejects', async () => {
    const errorMessage = 'Auth check failed'
    mockCheckAuthStatusActorFn.mockRejectedValue(new Error(errorMessage))
    const actor = createActor(createMockedAppMachine()).start()

    await waitFor(actor, (state: SnapshotFrom<typeof appMachine>) => state.value === 'unauthenticated' && state.context.error !== null)

    expect(actor.getSnapshot().value).toBe('unauthenticated')
    expect(actor.getSnapshot().context.user).toBeNull()
    expect(actor.getSnapshot().context.error).toBe(errorMessage)
    actor.stop()
  })

  // Tests for interactions with the invoked authMachine
  describe('when in unauthenticated state (authMachine invoked)', () => {
    let unauthActor: ReturnType<typeof createActor<typeof appMachine>>
    let mockSpawnedAuthMachine: { send: vi.MockInstance<any, any>, _snapshot?: any, _logic?: any, _parent?: any, _id?: string, _system?: any, events?: any[], ref?: any } // Reverted to vi.MockInstance


    beforeEach(async () => {
      mockCheckAuthStatusActorFn.mockResolvedValue(null) // Ensure it goes to unauthenticated

      // Mock the behavior of the spawned authMachine
      // This is a simplified mock. A real test might need a more complete actor mock.
      mockSpawnedAuthMachine = { send: vi.fn(), events: [] } // Reverted to vi.fn()

      // When appMachine tries to invoke 'authMachine', provide our mock actor
      // mockAuthMachineActorLogic is already part of createMockedAppMachine.
      // We need to make mockAuthMachineActorLogic return our mockSpawnedAuthMachine for these tests.
      mockAuthMachineActorLogic.mockImplementation(() => mockSpawnedAuthMachine);

      unauthActor = createActor(createMockedAppMachine()).start()
      await waitFor(unauthActor, (state: SnapshotFrom<typeof appMachine>) => state.value === 'unauthenticated')
    })

    afterEach(() => {
      unauthActor.stop()
    })

    it('should transition to authenticated.home on AUTHENTICATION_SUCCESS from authMachine', async () => {
      // Simulate authMachine sending AUTHENTICATION_SUCCESS
      // This requires the mockSpawnedAuthMachine to be able to send events to its parent (unauthActor)
      // This is complex to mock directly. A common pattern is to send an event *to* the parent
      // that simulates the child having sent it.
      unauthActor.send({ type: 'AUTHENTICATION_SUCCESS', user: testUser } as any) // Cast as any to bypass strict event type checks for this test event

      await waitFor(unauthActor, (state: any) => state.matches({ authenticated: 'home' }))
      expect(unauthActor.getSnapshot().matches({ authenticated: 'home' })).toBe(true)
      expect(unauthActor.getSnapshot().context.user).toEqual(testUser)
      expect(unauthActor.getSnapshot().context.error).toBeNull()
    })

    it('should remain in unauthenticated and set error on AUTHENTICATION_FAILURE from authMachine', async () => {
      const authError = 'Child auth failed'
      unauthActor.send({ type: 'AUTHENTICATION_FAILURE', error: authError } as any)

      // Wait for context to update, state should remain unauthenticated
      await waitFor(unauthActor, (state: SnapshotFrom<typeof appMachine>) => state.context.error === authError)
      expect(unauthActor.getSnapshot().value).toBe('unauthenticated')
      expect(unauthActor.getSnapshot().context.error).toBe(authError)
    })
  })


  it('should transition to loggingOut then unauthenticated on LOGOUT', async () => {
    mockCheckAuthStatusActorFn.mockResolvedValue(testUser) // Start as authenticated
    mockLogoutActorFn.mockResolvedValue(undefined) // Logout succeeds

    const actor = createActor(createMockedAppMachine()).start()
    await waitFor(actor, (state: any) => state.matches({ authenticated: 'home' }))

    actor.send({ type: 'LOGOUT' })
    await waitFor(actor, (state: SnapshotFrom<typeof appMachine>) => state.value === 'loggingOut')
    expect(mockLogoutActorFn).toHaveBeenCalled()

    await waitFor(actor, (state: SnapshotFrom<typeof appMachine>) => state.value === 'unauthenticated')
    expect(actor.getSnapshot().context.user).toBeNull()
    actor.stop()
  })

  it('should navigate to playGame when authenticated', async () => {
    mockCheckAuthStatusActorFn.mockResolvedValue(testUser)
    const actor = createActor(createMockedAppMachine()).start()
    await waitFor(actor, (state: any) => state.matches({ authenticated: 'home' }))

    actor.send({ type: 'NAVIGATE_TO_PLAY_GAME' })
    expect(actor.getSnapshot().matches({ authenticated: 'playGame' })).toBe(true)
    actor.stop()
  })

  it('should navigate to manageDecks when authenticated', async () => {
    mockCheckAuthStatusActorFn.mockResolvedValue(testUser)
    const actor = createActor(createMockedAppMachine()).start()
    await waitFor(actor, (state: any) => state.matches({ authenticated: 'home' }))

    actor.send({ type: 'NAVIGATE_TO_MANAGE_DECKS' })
    expect(actor.getSnapshot().matches({ authenticated: 'manageDecks' })).toBe(true)
    actor.stop()
  })
})
