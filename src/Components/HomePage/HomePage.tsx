import { useAppState } from '../../Hooks/UseAppState' // React removed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useHomePageStyles } from './HomePage.styles'
import { Button } from '../../Components/Common/Button/Button'

const HomePage = () => {
  const styles = useHomePageStyles()
  const { send, getAppStateValue } = useAppState()
  const user = getAppStateValue('user')

  const handleLogout = () => {
    send({ type: 'LOGOUT' })
  }

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
