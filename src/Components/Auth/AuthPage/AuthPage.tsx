import { useAuthPageStyles } from './AuthPage.styles'
import LoginPage from '../LoginPage/LoginPage'

const AuthPage = () => {
  const styles = useAuthPageStyles()

  return (
    <div id="auth-page-root" className={styles.root}>
      <div className={styles.formContainer}>
        <div className={styles.cardBorder} >
          <LoginPage />
        </div>
      </div>
    </div>
  )
}

export default AuthPage