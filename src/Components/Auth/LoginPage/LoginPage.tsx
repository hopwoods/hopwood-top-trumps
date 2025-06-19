import { useLoginPageStyles } from './LoginPage.styles'
import { useLoginPage } from './UseLoginPage' // Import the custom hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Button } from '../../Common/Button/Button' // Corrected path
import { Input } from '../../Common/Input/Input' // Corrected path

const LoginPage = () => {
  const styles = useLoginPageStyles()
  const {
    email,
    setEmail,
    password,
    setPassword,
    machineError, // Changed from 'error'
    isLoadingEmail,
    isLoadingGoogle,
    isLoading,
    handleEmailLogin,
    handleGoogleLogin,
  } = useLoginPage()

  // Use machineError for display
  const error = machineError

  return (
    // Assuming AuthPage.tsx provides the main container with id="login-form-container"
    // or similar structure. If LoginPage needs its own specific root div, it can be added.
    <>
      <form onSubmit={handleEmailLogin} className={styles.form}>
        <img src="/assets/images/fable-forge-logo-2.PNG" alt="Fable Forge Logo" className={styles.logo} />
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
          autoComplete="email"
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
          autoComplete="current-password"
        />

        {error && <p className={styles.errorMessage}>{error}</p>}

        {/*
          The original LoginPage had the Google login button first, then email.
          Replicating that order.
          The onClick for the Google button should be handleGoogleLogin.
          The form's onSubmit is handleEmailLogin, so the email button should be type="submit".
        */}
        <Button type="button" variant="primary" onClick={handleGoogleLogin} disabled={isLoading}>
          {isLoadingGoogle ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <FontAwesomeIcon icon={faGoogle} />
          )}
          Login with Google
        </Button>
        <Button type="submit" variant="secondary" disabled={isLoading}>
          {isLoadingEmail ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <FontAwesomeIcon icon={faEnvelope} />
          )}
          Login with Email
        </Button>
      </form>
      {/* The toggle link is handled by AuthPage */}
    </>
  )
}

export default LoginPage
