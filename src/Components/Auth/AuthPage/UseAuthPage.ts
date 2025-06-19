import { useState } from 'react'

export const useAuthPage = (initialState = true) => {
  const [showLogin, setShowLogin] = useState(initialState)

  const switchToLogin = (e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e?.preventDefault() // Prevent default for anchor tags
    setShowLogin(true)
  }

  const switchToRegister = (e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e?.preventDefault() // Prevent default for anchor tags
    setShowLogin(false)
  }

  return {
    showLogin,
    switchToLogin,
    switchToRegister,
  }
}
