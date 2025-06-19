import { useRegisterPageStyles } from './RegisterPage.styles'
import { useRegisterPage } from './UseRegisterPage' // Import the custom hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faSpinner, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../../Common/Button/Button'
import { Input } from '../../Common/Input/Input'

const RegisterPage = () => {
  const styles = useRegisterPageStyles()
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    // passwordMismatch, // This is now part of validationErrors
    machineError, // Renamed in the hook
    validationErrors, // New state for form validation errors
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
          error={validationErrors.email}
        />
        {/* The Input component now handles displaying its own error message */}
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
          error={validationErrors.password}
        />
        {/* The Input component now handles displaying its own error message */}
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
          error={validationErrors.confirmPassword}
        />
        {/* The Input component now handles displaying its own error message */}

        {/* Display machine error if no specific validation errors are present for that field */}
        {machineError && !validationErrors.email && !validationErrors.password && !validationErrors.confirmPassword && (
          <p data-testid="generic-error-message" className={styles.errorMessage}>
            {machineError}
          </p>
        )}

        <Button type="submit" variant="primary" disabled={isLoading} data-testid="register-submit-button">
          {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faUserPlus} />}
          Register
        </Button>
      </form>
    </>
  )
}

export default RegisterPage
