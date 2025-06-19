import { useState, useEffect } from 'react'
import { useAuthMachineState } from '../../Hooks/UseAuthMachineState' // Changed to useAuthMachineState
import type { SubmitLoginWithEmailEvent, SubmitLoginWithGoogleEvent } from '../../Machines/AuthMachine/AuthMachine.types'
// Removed ActorRefFrom, authMachine, GlobalStateContext, useAppState imports

export const useLoginPage = () => {
  const {
    sendToAuthMachine,
    error: authMachineError,
    isLoading, // Use the combined isLoading from the hook
    isLoadingEmail, // Use specific loading state from the hook
    isLoadingGoogle, // Use specific loading state from the hook
    authContext, // For debugging
  } = useAuthMachineState()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // isLoadingEmail and isLoadingGoogle are now directly from useAuthMachineState
  // const isLoading = isLoadingEmail || isLoadingGoogle; // This is now done by the getter in the hook

  useEffect(() => {
    console.log('[UseLoginPage] authMachine context:', authContext, 'isLoading:', isLoading)
  }, [authContext, isLoading])

  const handleEmailLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sendToAuthMachine && !isLoading) { // Use combined isLoading
      const event: SubmitLoginWithEmailEvent = { type: 'SUBMIT_LOGIN_WITH_EMAIL', email, password }
      sendToAuthMachine(event)
    } else if (!sendToAuthMachine) {
      console.error('[UseLoginPage] handleEmailLogin: sendToAuthMachine is not available.')
    }
  }

  const handleGoogleLogin = () => {
    if (sendToAuthMachine && !isLoading) { // Use combined isLoading
      const event: SubmitLoginWithGoogleEvent = { type: 'SUBMIT_LOGIN_WITH_GOOGLE' }
      sendToAuthMachine(event)
    } else if (!sendToAuthMachine) {
      console.error('[UseLoginPage] handleGoogleLogin: sendToAuthMachine is not available.')
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    machineError: authMachineError,
    isLoadingEmail, // Kept for potential distinct UI, though isLoading from hook can be used
    isLoadingGoogle, // Kept for potential distinct UI
    isLoading, // Use the combined loading state from the hook
    handleEmailLogin,
    handleGoogleLogin,
  }
}
