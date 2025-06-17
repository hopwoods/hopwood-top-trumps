import { useState } from 'react' // React removed
import { useAuthPageStyles } from './AuthPage.styles'
import LoginPage from './LoginPage'
// import RegisterPage from './RegisterPage' // Keep this as Temp for now

// Temporary placeholder for RegisterPage until it's fully implemented
const TempRegisterPage = ({
  onSwitchToLogin,
  styles,
}: {
  onSwitchToLogin: () => void
  styles: ReturnType<typeof useAuthPageStyles>
}) => (
  <div className={styles.formContainer}>
    Register Form Placeholder (Actual RegisterPage will go here)
    <button type="button" onClick={onSwitchToLogin} className={styles.toggleLink}>
      Already have an account? Login
    </button>
  </div>
)

const AuthPage = () => {
  const styles = useAuthPageStyles()
  const [showLogin, setShowLogin] = useState(true)

  return (
    <div className={styles.root}>
      {showLogin ? (
        <div className={styles.formContainer}>
          <LoginPage />
          <button
            type="button"
            onClick={() => setShowLogin(false)}
            className={styles.toggleLink}
          >
            Need an account? Register
          </button>
        </div>
      ) : (
        // When RegisterPage is implemented, it will replace TempRegisterPage
        // and include its own toggle button or this button will be rendered alongside it.
        <TempRegisterPage
          onSwitchToLogin={() => setShowLogin(true)}
          styles={styles} // Pass styles if TempRegisterPage uses them
        />
      )}
    </div>
  )
}

export default AuthPage
