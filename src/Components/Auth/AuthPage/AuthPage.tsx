import { useAuthPageStyles } from './AuthPage.styles'
// import { useAuthPage } from './UseAuthPage' // Hook might no longer be needed or will be simplified
import LoginPage from '../LoginPage/LoginPage'
// import RegisterPage from '../RegisterPage/RegisterPage' // RegisterPage is removed

const AuthPage = () => {
  const styles = useAuthPageStyles()
  // const { showLogin, switchToLogin, switchToRegister } = useAuthPage() // Logic removed

  return (
    <div id="auth-page-root" className={styles.root}>
      <div className={styles.formContainer}>
        <LoginPage />
        {/* Toggle links removed as RegisterPage is removed */}
      </div>
    </div>
  )
}

export default AuthPage
