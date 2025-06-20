import { useLoginPageStyles } from './LoginPage.styles'
import { useLoginPage } from './UseLoginPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons' // Removed faEnvelope, faLock
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Button } from '../../Common/Button/Button'
// Input component is no longer used here
// import { Input } from '../../Common/Input/Input'

const LoginPage = () => {
  const styles = useLoginPageStyles()
  const {
    machineError,
    isLoadingGoogle, // Can be simplified to just isLoading
    isLoading,
    handleGoogleLogin,
  } = useLoginPage()

  // Use machineError for display
  const error = machineError

  return (
    <>
      {/* Form tag might be optional if there are no inputs other than buttons */}
      <div className={styles.form}> {/* Changed form to div, or keep form and remove onSubmit */}
        <img src="./assets/images/fable-forge-logo.png" alt="Fable Forge Logo" className={styles.logo} />
        {/* Email and Password Inputs Removed */}

        {error && <p className={styles.errorMessage} data-testid="generic-error-message">{error}</p>}

        <Button type="button" variant="primary" onClick={handleGoogleLogin} disabled={isLoading} data-testid="google-login-button">
          {isLoadingGoogle || isLoading ? ( // Check combined isLoading or specific google one
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <FontAwesomeIcon icon={faGoogle} />
          )}
          Sign in with Google
        </Button>
        {/* Email Login Button Removed */}
      </div>
      {/* The toggle link to RegisterPage will be removed from AuthPage.tsx */}
    </>
  )
}

export default LoginPage
