import { useState } from 'react'
import { useAppState } from '../../Hooks/UseAppState'
import type { AppEvent } from '../../Machines/AppMachine/AppMachine.types'

export const useLoginPage = () => {
  const { appState, send, getAppStateValue } = useAppState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const error = getAppStateValue('error')
  const isLoadingEmail = appState.matches({ authenticating: 'submittingEmail' })
  const isLoadingGoogle = appState.matches({ authenticating: 'submittingGoogle' })
  const isLoading = isLoadingEmail || isLoadingGoogle

  const handleEmailLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isLoading) {
      send({ type: 'LOGIN_WITH_EMAIL', email, password } as Extract<AppEvent, { type: 'LOGIN_WITH_EMAIL' }>)
    }
  }

  const handleGoogleLogin = () => {
    // This is triggered by a button click, not a form submission, so no e.preventDefault()
    if (!isLoading) {
      send({ type: 'LOGIN_WITH_GOOGLE' } as Extract<AppEvent, { type: 'LOGIN_WITH_GOOGLE' }>)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoadingEmail,
    isLoadingGoogle,
    isLoading, // Combined loading state
    handleEmailLogin,
    handleGoogleLogin,
  }
}
