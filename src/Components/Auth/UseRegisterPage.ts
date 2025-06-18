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
  console.log(
    '[UseRegisterPage] Render. isLoading:', isLoading,
    'appState.value:', JSON.stringify(appState.value),
    'error from context:', error, // Log the error value as seen by the hook
    'passwordMismatch:', passwordMismatch
  )


  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setPasswordMismatch(true)
      return
    }
    setPasswordMismatch(false)
    console.log('[UseRegisterPage] handleRegister called. Current isLoading:', isLoading, 'appState.value before send:', JSON.stringify(appState.value))
    if (!isLoading) {
      // Ensure the event payload matches AppEvent definition
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
    passwordMismatch,
    setPasswordMismatch, // Added for completeness, though direct setting is in handler
    error,
    isLoading,
    handleRegister,
  }
}
