import { useState } from 'react'
import { useAppState } from '../../Hooks/UseAppState'
import type { AppEvent } from '../../Machines/AppMachine/AppMachine.types'

export const useRegisterPage = () => {
  const { appState, send, getAppStateValue } = useAppState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMismatch, setPasswordMismatch] = useState(false)

  const error = getAppStateValue('error')
  // Ensure the state path matches the AppMachine definition
  const isLoading = appState.matches({ authenticating: 'submittingRegistration' })

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setPasswordMismatch(true)
      return
    }
    setPasswordMismatch(false)
    if (!isLoading) {
      // Ensure the event payload matches AppEvent definition
      send({ type: 'SUBMIT_REGISTRATION', email, password } as Extract<AppEvent, { type: 'SUBMIT_REGISTRATION' }>)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordMismatch,
    setPasswordMismatch, // Added for completeness, though direct setting is in handler
    error,
    isLoading,
    handleRegister,
  }
}
