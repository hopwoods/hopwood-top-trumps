import { useRegisterPageStyles } from './RegisterPage.styles'
import { useRegisterPage } from './UseRegisterPage' // Import the custom hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faSpinner, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../Common/Button/Button'
import { Input } from '../Common/Input/Input'

const RegisterPage = () => {
  const styles = useRegisterPageStyles()
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordMismatch,
    // setPasswordMismatch, // Not directly used by component, handled in hook
    error,
    isLoading,
    handleRegister,
  } = useRegisterPage()

  return (
    <>
      <form
        data-testid="register-form"
        onSubmit={handleRegister}
        className={styles.form}
        data-submitting={isLoading ? 'true' : 'false'} // Add data attribute for E2E
      >
        <h2 className={styles.title}>Register</h2>
        <img src="/assets/images/fable-forge-logo-2.PNG" alt="Fable Forge Logo" className={styles.logo} />
        <Input
          type="email"
          id="register-email"
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
          id="register-password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Simplified, mismatch logic in hook
          required
          disabled={isLoading}
          label="Password"
          iconLeft={faLock}
          autoComplete="new-password"
        />
        <Input
          type="password"
          id="register-confirm-password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} // Simplified
          required
          disabled={isLoading}
          label="Confirm Password"
          iconLeft={faLock}
          autoComplete="new-password"
        />

        {passwordMismatch && <p data-testid="password-mismatch-error" className={styles.errorMessage}>Passwords do not match.</p>}
        {error && !passwordMismatch && <p data-testid="generic-error-message" className={styles.errorMessage}>{error}</p>}

        <Button type="submit" variant="primary" disabled={isLoading} data-testid="register-submit-button">
          {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faUserPlus} />}
          Register
        </Button>
      </form>
    </>
  )
}

export default RegisterPage
