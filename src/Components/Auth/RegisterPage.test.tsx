import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import RegisterPage from './RegisterPage'
import * as UseAppState from '../../Hooks/UseAppState' // To mock useAppState
import { AppStateProvider } from '../../Context/AppStateProvider' // To wrap component

// Mock the useAppState hook
const mockSend = vi.fn()
const mockGetAppStateValue = vi.fn()

vi.mock('../../Hooks/UseAppState', async (importOriginal) => {
  const actual = await importOriginal<typeof UseAppState>()
  return {
    ...actual, // Import and retain all original exports
    useAppState: vi.fn(), // Mock specific export
  }
})

// Mock FontAwesomeIcon
interface FontAwesomeIconProps {
  icon: { iconName: string } // Assuming icon is an object with iconName, adjust if different
  spin?: boolean
}
vi.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, spin }: FontAwesomeIconProps) => (
    <i className={`fa ${icon.iconName} ${spin ? 'fa-spin' : ''}`} />
  ),
}))

// Define interfaces for mocked component props
interface MockInputProps {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type: string
  name: string
  required?: boolean
  disabled?: boolean
  iconLeft?: { iconName: string }
  autoComplete?: string
}

interface MockButtonProps {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger'
  disabled?: boolean
  onClick?: () => void
  isLoading?: boolean
  iconLeft?: { iconName: string }
  iconRight?: { iconName: string }
}

// Mock child components if they have complex internal logic not relevant to this test
vi.mock('../Common/Input/Input', () => ({
  Input: (props: MockInputProps) => (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input {...props} data-testid={props.id} />
    </div>
  ),
}))

vi.mock('../Common/Button/Button', () => ({
  Button: (props: MockButtonProps) => (
    <button type={props.type || 'button'} {...props} data-testid="register-button">
      {props.children}
    </button>
  ),
}))

describe('RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
// Default mock implementation for useAppState
    ;(UseAppState.useAppState as Mock).mockReturnValue({
      appState: {
        matches: vi.fn().mockReturnValue(false), // Default to not loading
        value: { authenticating: 'loginForm' }, // Default state
        context: { error: null, user: null }, // Add default context
      },
      send: mockSend,
      getAppStateValue: mockGetAppStateValue.mockReturnValue(null), // Default to no error
    })
  })

  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<AppStateProvider>{ui}</AppStateProvider>)
  }

  it('renders the registration form correctly', () => {
    renderWithProvider(<RegisterPage />)
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument() // Exact match for "Password"
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument()
    expect(screen.getByTestId('register-button')).toHaveTextContent(/Register/i)
  })

  it('updates email, password, and confirm password fields on input', () => {
    renderWithProvider(<RegisterPage />)
    const emailInput = screen.getByLabelText(/Email/i)
    const passwordInput = screen.getByLabelText(/^Password$/i)
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i)

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })

    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
    expect(confirmPasswordInput).toHaveValue('password123')
  })

  it('shows password mismatch error if passwords do not match on submit', async () => {
    renderWithProvider(<RegisterPage />)
    const passwordInput = screen.getByLabelText(/^Password$/i)
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i)
    // const registerButton = screen.getByTestId('register-button') // Unused

    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } })

    const form = screen.getByTestId('register-form') // Use data-testid
    act(() => {
      fireEvent.submit(form) // Explicitly submit the form
    })

    await waitFor(() => {
      expect(screen.getByTestId('password-mismatch-error')).toBeInTheDocument()
      expect(screen.getByText(/Passwords do not match./i)).toBeInTheDocument() // Keep text check as well
    })
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('calls handleRegister and sends SUBMIT_REGISTRATION event if passwords match', () => {
    renderWithProvider(<RegisterPage />)
    const emailInput = screen.getByLabelText(/Email/i)
    const passwordInput = screen.getByLabelText(/^Password$/i)
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i)
    const registerButton = screen.getByTestId('register-button')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })
    fireEvent.click(registerButton)

    expect(screen.queryByText(/Passwords do not match./i)).not.toBeInTheDocument()
    expect(mockSend).toHaveBeenCalledWith({
      type: 'SUBMIT_REGISTRATION',
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('displays a general error message from appState if not password mismatch', () => {
    mockGetAppStateValue.mockReturnValue('Registration failed. Please try again.')
    renderWithProvider(<RegisterPage />)
    expect(screen.getByText(/Registration failed. Please try again./i)).toBeInTheDocument()
  })

  it('does not display general error if password mismatch error is present', async () => {
    mockGetAppStateValue.mockReturnValue('Some other error') // General error
    renderWithProvider(<RegisterPage />)

    // Trigger password mismatch
    const passwordInput = screen.getByLabelText(/^Password$/i)
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i)
    // const registerButton = screen.getByTestId('register-button') // Unused
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } })

    const form = screen.getByTestId('register-form') // Use data-testid
    act(() => {
      fireEvent.submit(form) // Explicitly submit the form
    })

    await waitFor(() => {
      expect(screen.getByTestId('password-mismatch-error')).toBeInTheDocument()
      expect(screen.getByText(/Passwords do not match./i)).toBeInTheDocument() // Keep text check as well
    })
    expect(screen.queryByText(/Some other error/i)).not.toBeInTheDocument()
  })

  it('disables form elements and shows spinner when isLoading is true', () => {
    ;(UseAppState.useAppState as Mock).mockReturnValue({
      appState: {
        matches: (state: object) => JSON.stringify(state) === JSON.stringify({ authenticating: 'submittingRegistration' }),
        value: { authenticating: 'submittingRegistration' },
        context: { error: null, user: null }, // Add default context
      },
      send: mockSend,
      getAppStateValue: mockGetAppStateValue.mockReturnValue(null),
    })

    renderWithProvider(<RegisterPage />)

    expect(screen.getByLabelText(/Email/i)).toBeDisabled()
    expect(screen.getByLabelText(/^Password$/i)).toBeDisabled()
    expect(screen.getByLabelText(/Confirm Password/i)).toBeDisabled()
    expect(screen.getByTestId('register-button')).toBeDisabled()
    expect(screen.getByTestId('register-button').querySelector('.fa-spin')).toBeInTheDocument()
  })

  it('does not submit form if isLoading is true', () => {
    ;(UseAppState.useAppState as Mock).mockReturnValue({
      appState: {
        matches: (state: object) => JSON.stringify(state) === JSON.stringify({ authenticating: 'submittingRegistration' }),
        value: { authenticating: 'submittingRegistration' },
        context: { error: null, user: null }, // Add default context
      },
      send: mockSend,
      getAppStateValue: mockGetAppStateValue.mockReturnValue(null),
    })

    renderWithProvider(<RegisterPage />)
    const registerButton = screen.getByTestId('register-button')
    // Add a data-testid to the form in RegisterPage.tsx for reliable selection
    // For now, let's assume the form is the direct parent of the button or identifiable
    const form = registerButton.closest('form')
    expect(form).toBeInTheDocument()


    fireEvent.click(registerButton) // Attempt to click
    if (form) {
      fireEvent.submit(form)
    }

    // send should not be called again if already loading
    // The initial call that led to isLoading=true is not part of this specific test's scope
    // We are testing that *another* submission isn't made *while* loading.
    // So, if mockSend was called to *get* into the loading state, we check it wasn't called *again*.
    // For simplicity here, assuming mockSend starts fresh or we check for a specific number of calls.
    // Given beforeEach clears mocks, if it was called, it would be once from a previous interaction not shown.
    // The key is that the click/submit *while loading* doesn't trigger a *new* send.
    // Let's refine this: the handleRegister in UseRegisterPage has an `if (!isLoading)` guard.
    // So, if isLoading is true, mockSend should not be called by *this* interaction.
    expect(mockSend).not.toHaveBeenCalled()
  })
})
