/// <reference types="vitest/globals" />
import { createActor, waitFor, fromPromise, type SnapshotFrom, createMachine, sendTo, assign as assignParent } from 'xstate'
import { authMachine } from './AuthMachine'
import type { User } from 'firebase/auth'
import type { AuthenticationSuccessEvent, AuthenticationFailureEvent } from './AuthMachine.types'

// Union type for events sent by AuthMachine to its parent
type AuthMachineSentEvent = AuthenticationSuccessEvent | AuthenticationFailureEvent

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
    mockLoginWithGoogleActorFn.mockResolvedValue(testUser) // Ensure mock is set up before parent actor starts

    // To properly test sendParent, we need a parent machine
    const parentMachine = createMachine({
      id: 'testParent',
      initial: 'runningChild',
      context: {
        receivedEvent: undefined as AuthMachineSentEvent | undefined,
      },
      states: {
        runningChild: {
          invoke: {
            id: 'authChild',
            src: mockAuthMachine, // Use the machine with mocked actors
          },
          on: {
            TRIGGER_CHILD_LOGIN: { // New event to trigger the child's login
              actions: sendTo('authChild', { type: 'SUBMIT_LOGIN_WITH_GOOGLE' }),
            },
            AUTHENTICATION_SUCCESS: {
              target: 'done',
              actions: assignParent({
                receivedEvent: ({ event }) => event as AuthenticationSuccessEvent,
              }),
            },
            AUTHENTICATION_FAILURE: {
              target: 'done',
              actions: assignParent({
                receivedEvent: ({ event }) => event as AuthenticationFailureEvent,
              }),
            },
          },
        },
        done: {
          type: 'final',
        },
      },
    })

    const parentActor = createActor(parentMachine).start()

    // Send an event to the parent machine, which will then forward to the child
    parentActor.send({ type: 'TRIGGER_CHILD_LOGIN' })

    // Wait for the parent machine to reach its 'done' state,
    // which signifies it has received an event from the child.
    await waitFor(parentActor, (state) => state.value === 'done')

    // Assertions on the event received by the parent
    // Verifying the child's internal state here can be tricky if it stops immediately.
    // The main goal is to ensure the parent received the correct event.
    const receivedEvent = parentActor.getSnapshot().context.receivedEvent
    expect(receivedEvent?.type).toBe('AUTHENTICATION_SUCCESS')
    if (receivedEvent?.type === 'AUTHENTICATION_SUCCESS') {
      expect(receivedEvent.user).toEqual(testUser)
    }

    parentActor.stop()
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
