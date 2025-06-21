import { useHomePageStyles } from './HomePage.styles'
import { useHomePage } from './UseHomePage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../Common/Button/Button' // Adjusted path
import { mergeClasses } from '@griffel/react'

const HomePage = () => {
  const styles = useHomePageStyles()
  const { handlePlayGame, handleManageDecks } = useHomePage()

  return (
    <div className={styles.root}>
      <div className={styles.hero}>
        <img src='./assets/images/fable-forge-logo.png' alt='Fable Forge Logo' />
      </div>

      <div className={styles.subtitle}>
        <img src='./assets/images/imp-waving.png' alt='A fantasy style imp facing the right with a cheeky face like he is talking' />
        <span>
          <div className={styles.welcomeText}>Hi! I'm Imp. Welcome to Fable Forge!</div>
          In this fast-paced card game, you hold the power to bring mythical heroes, fearsome beasts, and legendary artifacts to life.<br />
          Challenge your friends to an epic contest of stats, strategy, and a little bit of luck. <br /><br />
          Choose your champion's most powerful attribute and go head-to-head to see whose fable will reign supreme.<br />
          Will your chosen legend conquer all, or will it be shattered in the forge of creation?<br />
          The fate of the fables is in your hands!
        </span>
      </div>

      <div className={styles.featuredBanner}>
        <FontAwesomeIcon icon={faTrophy} className={styles.bannerIcon} />
        <span>Create your first deck or challenge opponents in thrilling card battles!</span>
      </div>

      <div className={styles.optionsContainer}>
        <div className={mergeClasses(styles.optionCard, styles.findMatch)} onClick={handlePlayGame}>
          <div className={styles.cardOverlay}>
            <Button type="button" variant="primary" onClick={handlePlayGame} className={styles.optionButton}>
              Start Playing
            </Button>
          </div>
        </div>

        <div className={mergeClasses(styles.optionCard, styles.manageDecks)} onClick={handleManageDecks}>
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
