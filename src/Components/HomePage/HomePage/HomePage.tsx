import { useHomePageStyles } from './HomePage.styles'
import { useHomePage } from './UseHomePage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGamepad,
  faLayerGroup,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '../../Common/Button/Button'
import { mergeClasses } from '@griffel/react'

const HomePage = () => {
  const styles = useHomePageStyles()
  const { handlePlayGame, handleManageDecks } = useHomePage()

  return (
    <div className={styles.root}>
      <div className={styles.hero}>
        <img src='/public/assets/images/fable-forge-logo-2.PNG' alt='Fable Forge Logo' />
      </div>

      <div className={styles.featuredBanner}>
        <FontAwesomeIcon icon={faTrophy} className={styles.bannerIcon} />
        <span>Create your first deck or challenge opponents in thrilling card battles!</span>
      </div>

      <div className={styles.optionsContainer}>
        <div className={styles.optionCard} onClick={handlePlayGame}>
          <div className={styles.cardIcon}>
            <FontAwesomeIcon icon={faGamepad} />
          </div>
          <h2>Play Game</h2>
          <p className={styles.cardDescription}>
            Challenge AI opponents or other players in exciting card battles
          </p>
          <div className={styles.cardOverlay}>
            <Button type="button" variant="primary" onClick={handlePlayGame} className={styles.optionButton}>
              Start Playing
            </Button>
          </div>
        </div>

        <div className={mergeClasses(styles.optionCard, styles.manageDecks)} onClick={handleManageDecks}>
          {/* <div className={styles.cardIcon}>
            <FontAwesomeIcon icon={faLayerGroup} />
          </div>
          <h2>Manage Decks</h2>
          <p className={styles.cardDescription}>
            Create, edit and customize your card collections
          </p> */}
          <div className={styles.cardOverlay}>
            <Button type="button" variant="primary" onClick={handleManageDecks} className={styles.optionButton}>
              Open Deck Library
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
