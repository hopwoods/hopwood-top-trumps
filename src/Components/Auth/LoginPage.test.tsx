import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LoginPage from './LoginPage'

// Define mocks outside and before vi.mock
const mockSend = vi.fn()
const mockGetAppStateValue = vi.fn()
const mockMatches = vi.fn()

// Define a more specific type for the state patterns our mock's `matches` function will handle
type LoginPageMockStateObjectPattern =
  | { authenticating: 'submittingEmail' }
  | { authenticating: 'submittingGoogle' }
// Union with string if top-level string states were also directly matched by this component's tests
type MockPattern = LoginPageMockStateObjectPattern | string

vi.mock('../../Hooks/UseAppState', () => ({
  useAppState: () => ({
    appState: {
      matches: mockMatches as (state: MockPattern) => boolean,
      context: { error: null, user: null },
    },
    send: mockSend,
    getAppStateValue: mockGetAppStateValue,
  }),
}))

describe('LoginPage Component', () => {
  beforeEach(() => {
    mockSend.mockClear()
    mockGetAppStateValue.mockReset()
    mockMatches.mockReset()

    mockGetAppStateValue.mockImplementation((key: string) => {
      if (key === 'error') return null
      return undefined
    })
    mockMatches.mockImplementation((pattern: MockPattern) => {
      if (typeof pattern === 'object' && pattern !== null && 'authenticating' in pattern && pattern.authenticating !== undefined) {
        // const authPattern = pattern as LoginPageMockStateObjectPattern; // Assertion removed
        if (pattern.authenticating === 'submittingEmail') return false
        if (pattern.authenticating === 'submittingGoogle') return false
      }
      return false
    })
  })

  it('renders the login form with email and password fields', () => {
    render(<LoginPage />)
    expect(screen.getByAltText(/Fable Forge Logo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login with email/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login with google/i })).toBeInTheDocument()
  })

  it('allows typing into email and password fields', () => {
    render(<LoginPage />)
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    expect(emailInput.value).toBe('test@example.com')
    expect(passwordInput.value).toBe('password123')
  })

  it('calls send with LOGIN_WITH_EMAIL when email form is submitted', () => {
    render(<LoginPage />)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login with email/i })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)
    expect(mockSend).toHaveBeenCalledWith({
      type: 'LOGIN_WITH_EMAIL',
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('calls send with LOGIN_WITH_GOOGLE when Google login button is clicked', () => {
    render(<LoginPage />)
    const googleButton = screen.getByRole('button', { name: /login with google/i })
    fireEvent.click(googleButton)
    expect(mockSend).toHaveBeenCalledWith({ type: 'LOGIN_WITH_GOOGLE' })
  })

  it('displays an error message if present in app state', () => {
    mockGetAppStateValue.mockImplementation((key: string) => {
      if (key === 'error') return 'Invalid credentials'
      return undefined
    })
    render(<LoginPage />)
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
  })

  it('disables buttons and inputs when loading for email login', () => {
    mockMatches.mockImplementation((pattern: MockPattern) => {
      if (typeof pattern === 'object' && pattern !== null && 'authenticating' in pattern && pattern.authenticating === 'submittingEmail') {
        return true
      }
      return false
    })
    render(<LoginPage />)
    expect(screen.getByRole('button', { name: /login with email/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /login with google/i })).toBeDisabled()
    expect(screen.getByLabelText(/email/i)).toBeDisabled()
    expect(screen.getByLabelText(/password/i)).toBeDisabled()
  })

  it('disables buttons and inputs when loading for Google login', () => {
    mockMatches.mockImplementation((pattern: MockPattern) => {
      if (typeof pattern === 'object' && pattern !== null && 'authenticating' in pattern && pattern.authenticating === 'submittingGoogle') {
        return true
      }
      return false
    })
    render(<LoginPage />)
    expect(screen.getByRole('button', { name: /login with email/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /login with google/i })).toBeDisabled()
    expect(screen.getByLabelText(/email/i)).toBeDisabled()
    expect(screen.getByLabelText(/password/i)).toBeDisabled()
  })
})
