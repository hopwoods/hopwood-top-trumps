/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import LoginPage from './LoginPage'
import { GlobalStateContext } from '../../../Hooks/UseAppState' // Corrected import path
import { appMachine } from '../../../Machines/AppMachine/AppMachine'
import { type ActorRefFrom, createActor, fromPromise } from 'xstate' // Added fromPromise
// import { authMachine } from '../../Machines/AuthMachine/AuthMachine'; // Not directly used here, but good for context

// Mocks for the authMachine actor's state/send, which useAuthMachineState will return
const mockAuthMachineSend = vi.fn()
let mockAuthMachineState: any // Will be set in beforeEach for each test's specific scenario

vi.mock('../../../Hooks/UseAuthMachineState', () => ({ // Corrected path
  useAuthMachineState: () => mockAuthMachineState,
}))

describe('LoginPage Component', () => {
  let appActor: ActorRefFrom<typeof appMachine>
  let customAppMachine: any // Define here to be accessible in renderLoginPage

  beforeEach(() => {
    // Reset and setup mockAuthMachineState for each test's specific scenario
    mockAuthMachineSend.mockClear()
    mockAuthMachineState = {
      sendToAuthMachine: mockAuthMachineSend, // Corrected name
      authContext: { error: null }, // Added (can be simple for this mock)
      error: null, // This is what UseLoginPage destructures as authMachineError
      isLoadingEmail: false,
      isLoadingGoogle: false,
      // isLoading is a getter in the real hook, derived from isLoadingEmail/Google/Registration.
      // For the mock, we can set it directly based on test needs or derive it.
      // Let's start by setting it explicitly in tests that need it, or derive it here.
      get isLoading() {
        // isLoadingEmail is removed, so isLoading is now effectively isLoadingGoogle for this mock
        return this.isLoadingGoogle
      },
      // snapshot and can are not directly destructured by UseLoginPage, but good to keep for completeness of the mock
      snapshot: {
        matches: vi.fn().mockReturnValue(false),
        context: { error: null }, // This context is for the authMachine itself
        can: vi.fn().mockReturnValue(true),
      },
    }

    // Create and start the appMachine actor to provide context
    // We need to provide mock implementations for actors invoked by appMachine
    // if they are critical to the appMachine reaching a state where authMachine is spawned.
    // For LoginPage tests, we primarily care that an authMachine *could* be spawned and its state controlled via mockAuthMachineState.

    const mockCheckAuthStatusActor = vi.fn().mockResolvedValue(null) // Simulates no user initially
    const mockLogoutActor = vi.fn().mockResolvedValue(undefined)

    // Provide mock actors to the appMachine for actors it directly invokes
    customAppMachine = appMachine.provide({ // Assign to the outer scope variable
      actors: {
        checkAuthStatusActor: fromPromise(() => mockCheckAuthStatusActor()),
        logoutActor: fromPromise(() => mockLogoutActor()),
        // authMachine is also an actor here, but since useAuthMachineState is mocked,
        // we don't need to provide a mock for authMachine itself at this level for these specific tests.
        // If appMachine had other actors it directly invokes, they would be mocked here.
      },
    })
    appActor = createActor(customAppMachine).start()

    // To ensure the GlobalStateContext has a valid actor, even if we're mocking useAuthMachineState,
    // it's good practice to have the appActor running.
    // The actual spawned authActor within appActor isn't directly tested here because
    // useAuthMachineState is fully mocked.
  })

  afterEach(() => {
    if (appActor) {
      appActor.stop()
    }
  })

  // Helper function to render LoginPage with the GlobalStateContext
  const renderLoginPage = () => {
    // The Provider from createActorContext expects the machine *logic* (definition)
    // It will then create an actor instance internally.
    // We pass customAppMachine which includes our mocked sub-actors.
    return render(
      <GlobalStateContext.Provider logic={customAppMachine as any}>
        <LoginPage />
      </GlobalStateContext.Provider>,
    )
  }

  it('renders the login form with only Google login button', () => {
    renderLoginPage()
    expect(screen.getByAltText(/Fable Forge Logo/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /login with email/i })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Sign in with Google/i })).toBeInTheDocument() // Updated text
  })

  // This test is no longer relevant
  // it('allows typing into email and password fields', () => {
  //   renderLoginPage()
  //   const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
  //   const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement
  //   fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
  //   fireEvent.change(passwordInput, { target: { value: 'password123' } })
  //   expect(emailInput.value).toBe('test@example.com')
  //   expect(passwordInput.value).toBe('password123')
  // })

  // This test is no longer relevant
  // it('calls send with LOGIN_WITH_EMAIL when email form is submitted', () => {
  //   renderLoginPage()
  //   const emailInput = screen.getByLabelText(/email/i)
  //   const passwordInput = screen.getByLabelText(/password/i)
  //   const submitButton = screen.getByRole('button', { name: /login with email/i })
  //   fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
  //   fireEvent.change(passwordInput, { target: { value: 'password123' } })
  //   fireEvent.click(submitButton)
  //   expect(mockAuthMachineSend).toHaveBeenCalledWith({
  //     type: 'SUBMIT_LOGIN_WITH_EMAIL', // Corrected event type
  //     email: 'test@example.com',
  //     password: 'password123',
  //   })
  // })

  it('calls send with LOGIN_WITH_GOOGLE when Google login button is clicked', () => {
    renderLoginPage()
    const googleButton = screen.getByRole('button', { name: /Sign in with Google/i }) // Updated text
    fireEvent.click(googleButton)
    expect(mockAuthMachineSend).toHaveBeenCalledWith({ type: 'SUBMIT_LOGIN_WITH_GOOGLE' })
  })

  it('displays an error message if present in app state', () => {
    mockAuthMachineState.error = 'Invalid credentials'
    // To ensure the component re-renders with the new mock state if it was already rendered
    // or to set it up before initial render.
    // If useAuthMachineState was more complex, we might need a more robust way to trigger re-render
    // or ensure this is set before the renderLoginPage() call.
    // For this mock, direct assignment before render should work.
    renderLoginPage()
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
  })

  // This test is no longer relevant as isLoadingEmail is removed and only one button exists
  // it('disables buttons and inputs when loading for email login', () => {
  //   mockAuthMachineState.isLoadingEmail = true // This specific state is gone
  //   mockAuthMachineState.isLoading = true // Use combined isLoading
  //   renderLoginPage()
  //   // expect(screen.getByRole('button', { name: /login with email/i })).toBeDisabled() // Button removed
  //   expect(screen.getByRole('button', { name: /Sign in with Google/i })).toBeDisabled()
  //   // expect(screen.getByLabelText(/email/i)).toBeDisabled() // Field removed
  //   // expect(screen.getByLabelText(/password/i)).toBeDisabled() // Field removed
  // })

  it('disables Google login button when loading for Google login', () => {
    mockAuthMachineState.isLoadingGoogle = true
    // mockAuthMachineState.isLoading = true // No longer need to set this directly, getter handles it
    renderLoginPage()
    // expect(screen.queryByRole('button', { name: /login with email/i })).not.toBeInTheDocument() // Button removed
    expect(screen.getByRole('button', { name: /Sign in with Google/i })).toBeDisabled()
    // expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument() // Field removed
    // expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument() // Field removed
  })
})
