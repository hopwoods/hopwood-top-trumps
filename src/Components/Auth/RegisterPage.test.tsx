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
  label: string // Kept as required for the mock's label rendering
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type: string
  name: string
  required?: boolean
  disabled?: boolean
  iconLeft?: { iconName: string }
  iconRight?: { iconName: string } // Added
  error?: string // Added
  autoComplete?: string
  // Add any other props that the actual Input component might receive and that the mock needs to handle
  // For example, if 'className' is passed and needs to be applied or ignored.
  // For now, focusing on the props causing the TS errors.
  className?: string // Assuming className might be passed
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
  Input: (props: MockInputProps) => {
    // Destructure custom props that should not be spread onto the native input
    // Removed iconRight as it's not used in this simplified mock
    const { label, iconLeft, error, ...restInputProps } = props
    return (
      <div>
        {label && <label htmlFor={props.id}>{label}</label>}
        {/* Optionally render the icon if needed for test assertions, though not strictly necessary for fixing the warning */}
        {iconLeft && <i className={`fa ${iconLeft.iconName} mock-icon-left`} />}
        <input {...restInputProps} data-testid={props.id} />
        {error && <p className="mock-error">{error}</p>}
      </div>
    )
  },
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
        context: { error: null, user: null },
      },
      send: mockSend,
      // getAppStateValue is called by useRegisterPage to get what it calls `machineError`
      getAppStateValue: mockGetAppStateValue.mockImplementation((path) => {
        if (path === 'error') return null // Default to no machine error
        return undefined
      }),
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

    const form = screen.getByTestId('register-form')
    act(() => {
      fireEvent.submit(form)
    })

    await waitFor(() => {
      // Password mismatch is now part of validationErrors.confirmPassword
      expect(screen.getByTestId('confirm-password-error')).toBeInTheDocument()
      // The text check is implicitly covered by checking the content of 'confirm-password-error'
      // If getByTestId finds the element, and later we check its text content, that's sufficient.
      // For this specific error, the text is "Passwords do not match."
      expect(screen.getByTestId('confirm-password-error')).toHaveTextContent(/Passwords do not match./i)
    })
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('calls handleRegister and sends SUBMIT_REGISTRATION event if form is valid', () => {
    renderWithProvider(<RegisterPage />)
    const emailInput = screen.getByLabelText(/Email/i)
    const passwordInput = screen.getByLabelText(/^Password$/i)
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i)
    const registerButton = screen.getByTestId('register-button')

    // Valid inputs
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'ValidPass1!' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'ValidPass1!' } })
    fireEvent.click(registerButton)

    expect(screen.queryByTestId('email-error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('password-error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('confirm-password-error')).not.toBeInTheDocument()

    expect(mockSend).toHaveBeenCalledWith({
      type: 'SUBMIT_REGISTRATION',
      email: 'test@example.com',
      password: 'ValidPass1!',
    })
  })

  it('displays a machine error message if no validation errors are present for specific fields', () => {
    mockGetAppStateValue.mockImplementation((path) => {
      if (path === 'error') return 'Registration failed due to a server issue.'
      return undefined
    })
    renderWithProvider(<RegisterPage />)
    // Ensure no validation errors are triggered by default empty fields for this specific test
    // We are testing the display of machineError when other validation errors are not present
    // (or rather, when the conditions for displaying machineError are met)
    expect(screen.getByTestId('generic-error-message')).toBeInTheDocument()
    expect(screen.getByText(/Registration failed due to a server issue./i)).toBeInTheDocument()
  })

  it('does not display machine error if a specific field validation error is present', async () => {
    mockGetAppStateValue.mockImplementation((path) => {
      if (path === 'error') return 'Some machine error'
      return undefined
    })
    renderWithProvider(<RegisterPage />)

    // Trigger a specific validation error (e.g., empty email)
    const form = screen.getByTestId('register-form')
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'ValidPass1!' } })
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'ValidPass1!' } })
    act(() => {
      fireEvent.submit(form)
    })

    await waitFor(() => {
      expect(screen.getByTestId('email-error')).toBeInTheDocument() // e.g. "Email cannot be empty"
    })
    // The generic-error-message for machineError should not be visible
    // because a specific validation error (email-error) is present.
    expect(screen.queryByTestId('generic-error-message')).not.toBeInTheDocument()
    expect(screen.queryByText(/Some machine error/i)).not.toBeInTheDocument()
  })


  // --- New Validation Tests ---

  it('shows error if email is empty on submit', async () => {
    renderWithProvider(<RegisterPage />)
    const form = screen.getByTestId('register-form')
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'ValidPass1!' } })
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'ValidPass1!' } })
    act(() => { fireEvent.submit(form) })
    await waitFor(() => {
      expect(screen.getByTestId('email-error')).toHaveTextContent('Email cannot be empty.')
    })
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('shows error if email is invalid on submit', async () => {
    renderWithProvider(<RegisterPage />)
    const form = screen.getByTestId('register-form')
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalidemail' } })
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'ValidPass1!' } })
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'ValidPass1!' } })
    act(() => { fireEvent.submit(form) })
    await waitFor(() => {
      expect(screen.getByTestId('email-error')).toHaveTextContent('Email address is invalid.')
    })
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('shows error if password is empty on submit', async () => {
    renderWithProvider(<RegisterPage />)
    const form = screen.getByTestId('register-form')
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'ValidPass1!' } })
    act(() => { fireEvent.submit(form) })
    await waitFor(() => {
      expect(screen.getByTestId('password-error')).toHaveTextContent('Password cannot be empty.')
    })
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('shows error if password is too short', async () => {
    renderWithProvider(<RegisterPage />)
    const form = screen.getByTestId('register-form')
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'Short1!' } })
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'Short1!' } })
    act(() => { fireEvent.submit(form) })
    await waitFor(() => {
      expect(screen.getByTestId('password-error')).toHaveTextContent('Password must be at least 8 characters long.')
    })
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('shows error if password has no uppercase letter', async () => {
    renderWithProvider(<RegisterPage />)
    const form = screen.getByTestId('register-form')
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'nouppercase1!' } })
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'nouppercase1!' } })
    act(() => { fireEvent.submit(form) })
    await waitFor(() => {
      expect(screen.getByTestId('password-error')).toHaveTextContent('Password must contain at least one uppercase letter.')
    })
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('shows error if password has no lowercase letter', async () => {
    renderWithProvider(<RegisterPage />)
    const form = screen.getByTestId('register-form')
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'NOLOWERCASE1!' } })
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'NOLOWERCASE1!' } })
    act(() => { fireEvent.submit(form) })
    await waitFor(() => {
      expect(screen.getByTestId('password-error')).toHaveTextContent('Password must contain at least one lowercase letter.')
    })
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('shows error if password has no number', async () => {
    renderWithProvider(<RegisterPage />)
    const form = screen.getByTestId('register-form')
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'NoNumberPass!' } })
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'NoNumberPass!' } })
    act(() => { fireEvent.submit(form) })
    await waitFor(() => {
      expect(screen.getByTestId('password-error')).toHaveTextContent('Password must contain at least one number.')
    })
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('shows error if password has no special character', async () => {
    renderWithProvider(<RegisterPage />)
    const form = screen.getByTestId('register-form')
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'NoSpecial1Pass' } })
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'NoSpecial1Pass' } })
    act(() => { fireEvent.submit(form) })
    await waitFor(() => {
      expect(screen.getByTestId('password-error')).toHaveTextContent('Password must contain at least one special character.')
    })
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('shows error if confirm password is empty on submit', async () => {
    renderWithProvider(<RegisterPage />)
    const form = screen.getByTestId('register-form')
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'ValidPass1!' } })
    act(() => { fireEvent.submit(form) })
    await waitFor(() => {
      expect(screen.getByTestId('confirm-password-error')).toHaveTextContent('Confirm Password cannot be empty.')
    })
    expect(mockSend).not.toHaveBeenCalled()
  })

  // End of New Validation Tests

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
