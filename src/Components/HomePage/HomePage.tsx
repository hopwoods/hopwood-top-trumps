import { useHomePageStyles } from './HomePage.styles'
import { useHomePage } from './UseHomePage' // Import the custom hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../Common/Button/Button' // Corrected path

const HomePage = () => {
  const styles = useHomePageStyles()
  const { user, handleLogout } = useHomePage()

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Welcome to FableForge!</h1>
      {user && <p className={styles.userInfo}>Logged in as: {user.email || 'User'}</p>}
      <Button type="button" variant="secondary" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        Logout
      </Button>
      {/* More content will go here */}
    </div>
  )
}

export default HomePage
