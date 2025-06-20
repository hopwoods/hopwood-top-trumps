import { useEffect } from 'react'
import { useAuthMachineState } from '../../../Hooks/UseAuthMachineState'
import type { SubmitLoginWithGoogleEvent } from '../../../Machines/AuthMachine/AuthMachine.types' // Removed SubmitLoginWithEmailEvent

export const useLoginPage = () => {
  const {
    sendToAuthMachine,
    error: authMachineError,
    isLoading,
    // isLoadingEmail, // Removed
    isLoadingGoogle, // This can be simplified to just isLoading if Google is the only method
    authContext,
  } = useAuthMachineState()

  // Removed email and password states

  useEffect(() => {
    console.log('[UseLoginPage] authMachine context:', authContext, 'isLoading:', isLoading)
  }, [authContext, isLoading])

  // Removed handleEmailLogin

  const handleGoogleLogin = () => {
    if (sendToAuthMachine && !isLoading) {
      const event: SubmitLoginWithGoogleEvent = { type: 'SUBMIT_LOGIN_WITH_GOOGLE' }
      sendToAuthMachine(event)
    } else if (!sendToAuthMachine) {
      console.error('[UseLoginPage] handleGoogleLogin: sendToAuthMachine is not available.')
    }
  }

  return {
    // Removed email, setEmail, password, setPassword
    machineError: authMachineError,
    // isLoadingEmail, // Removed
    isLoadingGoogle, // Or simply isLoading
    isLoading,
    // handleEmailLogin, // Removed
    handleGoogleLogin,
  }
}
