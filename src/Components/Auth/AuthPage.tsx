import { useAuthPageStyles } from './AuthPage.styles'
import { useAuthPage } from './UseAuthPage' // Import the custom hook
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage' // Import the actual RegisterPage

const AuthPage = () => {
  const styles = useAuthPageStyles()
  const { showLogin, switchToLogin, switchToRegister } = useAuthPage()

  return (
    <div id="auth-page-root" className={styles.root}>
      <div className={styles.formContainer}>
        {showLogin ? (
          <>
            <LoginPage />
            <a href="#" onClick={switchToRegister} className={styles.toggleLink}>
              Need an account? Register
            </a>
          </>
        ) : (
          <>
            <RegisterPage />
            <a href="#" onClick={switchToLogin} className={styles.toggleLink}>
              Already have an account? Login
            </a>
          </>
        )}
      </div>
    </div>
  )
}

export default AuthPage
