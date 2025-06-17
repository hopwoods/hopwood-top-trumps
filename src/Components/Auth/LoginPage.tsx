import React, { useState } from 'react'
import { useLoginPageStyles } from './LoginPage.styles'
import { useAppState } from '../../Hooks/UseAppState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { mergeClasses } from '@griffel/react'

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
        <div className={styles.fieldContainer}>
          <label htmlFor="login-email" className={styles.label}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} /> Email
          </label>
          <input
            type="email"
            id="login-email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
            disabled={isLoading}
          />
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor="login-password" className={styles.label}>
            <FontAwesomeIcon icon={faLock} className={styles.icon} /> Password
          </label>
          <input
            type="password"
            id="login-password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
            disabled={isLoading}
          />
        </div>

        {error !== null && <p className={styles.errorMessage}>{error}</p>}

        <button
          type="submit"
          className={mergeClasses(styles.button, styles.submitButton)}
          disabled={isLoading}
        >
          {isLoadingEmail ? (
            <FontAwesomeIcon icon={faSpinner} spin className={styles.icon} />
          ) : (
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
          )}
          Login with Email
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className={mergeClasses(styles.button, styles.googleButton)}
          disabled={isLoading}
        >
          {isLoadingGoogle ? (
            <FontAwesomeIcon icon={faSpinner} spin className={styles.icon} />
          ) : (
            <FontAwesomeIcon icon={faGoogle} className={styles.icon} />
          )}
          Login with Google
        </button>
      </form>
      {/* The toggle to Register page is handled by AuthPage */}
      {/* <button
        onClick={props.onSwitchToRegister}
        className={styles.toggleButton} // Assuming a toggleButton style exists or is added
        disabled={isLoading}
      >
        Need an account? Register
      </button> */}
    </>
  )
}

export default LoginPage
