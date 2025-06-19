import { useState } from 'react'
import { useAppState } from '../../Hooks/UseAppState'
import type { AppEvent } from '../../Machines/AppMachine/AppMachine.types'

interface ValidationErrors {
  email?: string
  password?: string
  confirmPassword?: string
}

export const useRegisterPage = () => {
  const { appState, send, getAppStateValue } = useAppState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  const error = getAppStateValue('error') // This is for machine-level errors
  const isLoading = appState.matches({ authenticating: 'submittingRegistration' })

  console.log(
    '[UseRegisterPage] Render. isLoading:', isLoading,
    'appState.value:', JSON.stringify(appState.value),
    'machineError:', error,
    'validationErrors:', JSON.stringify(validationErrors)
  )

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    // Email validation
    if (!email) {
      newErrors.email = 'Email cannot be empty.'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid.'
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password cannot be empty.'
    } else {
      if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long.'
      } else if (!/[A-Z]/.test(password)) {
        newErrors.password = 'Password must contain at least one uppercase letter.'
      } else if (!/[a-z]/.test(password)) {
        newErrors.password = 'Password must contain at least one lowercase letter.'
      } else if (!/[0-9]/.test(password)) {
        newErrors.password = 'Password must contain at least one number.'
      } else if (!/[!@#$%^&*]/.test(password)) {
        newErrors.password = 'Password must contain at least one special character.'
      }
    }
    // Confirm Password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password cannot be empty.'
    } else if (password && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.'
    }

    setValidationErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidationErrors({}) // Clear previous validation errors

    if (!validateForm()) {
      console.log('[UseRegisterPage] handleRegister: Form validation failed.')
      return
    }

    console.log('[UseRegisterPage] handleRegister called. Current isLoading:', isLoading, 'appState.value before send:', JSON.stringify(appState.value))
    if (!isLoading) {
      send({ type: 'SUBMIT_REGISTRATION', email, password } as Extract<AppEvent, { type: 'SUBMIT_REGISTRATION' }>)
      console.log('[UseRegisterPage] SUBMIT_REGISTRATION event sent.')
    } else {
      console.log('[UseRegisterPage] handleRegister: submission already in progress (isLoading is true).')
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    machineError: error, // Renamed to avoid confusion with form validation errors
    validationErrors,
    isLoading,
    handleRegister,
  }
}
