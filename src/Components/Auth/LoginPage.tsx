import React, { useState } from 'react'
import { useLoginPageStyles } from './LoginPage.styles'
import { useAppState } from '../../Hooks/UseAppState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Button } from '../../Components/Common/Button/Button'
import { Input } from '../../Components/Common/Input/Input'

// The AuthPage will handle switching between Login and Register,
// so LoginPage doesn't need onSwitchToRegister prop directly anymore.
// interface LoginPageProps {
//   onSwitchToRegister: () => void;
// }

const LoginPage = (/* props: LoginPageProps */) => {
  const styles = useLoginPageStyles()
  const { appState, send, getAppStateValue } = useAppState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const error = getAppStateValue('error')
  // Using object notation for matches, which can be more robust with TypeScript for nested states
  const isLoadingEmail = appState.matches({ authenticating: 'submittingEmail' })
  const isLoadingGoogle = appState.matches({ authenticating: 'submittingGoogle' })
  const isLoading = isLoadingEmail || isLoadingGoogle

  const handleEmailLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isLoading) {
      send({ type: 'LOGIN_WITH_EMAIL', email, password })
    }
  }

  const handleGoogleLogin = () => {
    if (!isLoading) {
      send({ type: 'LOGIN_WITH_GOOGLE' })
    }
  }

  return (
    <>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleEmailLogin} className={styles.form}>
        <Input
          type="email"
          id="login-email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          label="Email"
          iconLeft={faEnvelope}
        />
        <Input
          type="password"
          id="login-password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          label="Password"
          iconLeft={faLock}
        />

        {error !== null && <p className={styles.errorMessage}>{error}</p>}

        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoadingEmail ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <FontAwesomeIcon icon={faEnvelope} />
          )}
          Login with Email
        </Button>
        <Button type="button" variant="secondary" onClick={handleGoogleLogin} disabled={isLoading}>
          {isLoadingGoogle ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <FontAwesomeIcon icon={faGoogle} />
          )}
          Login with Google
        </Button>
      </form>
    </>
  )
}

export default LoginPage
