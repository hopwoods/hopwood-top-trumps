import { useHomePageStyles } from './HomePage.styles'
import { useHomePage } from './UseHomePage' // Import the custom hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faGamepad, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../../Common/Button/Button'

const HomePage = () => {
  const styles = useHomePageStyles()
  const { user, handleLogout, handlePlayGame, handleManageDecks } = useHomePage()

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome to FableForge!</h1>
        {user && <p className={styles.userInfo}>Logged in as: {user.email || 'User'}</p>}
        <Button type="button" variant="secondary" onClick={handleLogout} className={styles.logoutButton}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </Button>
      </div>

      <div className={styles.optionsContainer}>
        <div className={styles.optionCard}>
          <div className={styles.imagePlaceholder}>
            {/* Placeholder for Play Game Image */}
            <span>Play Game Image</span>
          </div>
          <Button type="button" variant="primary" onClick={handlePlayGame} className={styles.optionButton}>
            <FontAwesomeIcon icon={faGamepad} />
            Play Game
          </Button>
        </div>

        <div className={styles.optionCard}>
          <div className={styles.imagePlaceholder}>
            {/* Placeholder for Manage Decks Image */}
            <span>Manage Decks Image</span>
          </div>
          <Button type="button" variant="primary" onClick={handleManageDecks} className={styles.optionButton}>
            <FontAwesomeIcon icon={faLayerGroup} />
            Manage Decks
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
