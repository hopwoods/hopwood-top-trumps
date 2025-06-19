import { useHeaderStyles } from './Header.styles'
import type { HeaderProps } from './Header.types'
import { Button } from '../../Common/Button/Button' // Assuming Button is reusable

const Header = ({ onLogout, onNavigateHome, onNavigateManageDecks, onNavigatePlayGame }: HeaderProps) => {
  const styles = useHeaderStyles()

  return (
    <header className={styles.root}>
      <a href='#' className={styles.logo} onClick={onNavigateHome}>
        Hopwood Top Trumps
      </a>
      <nav className={styles.nav}>
        <a href='#' className={styles.navLink} onClick={onNavigateHome}>
          Home
        </a>
        <a href='#' className={styles.navLink} onClick={onNavigateManageDecks}>
          Manage Decks
        </a>
        <a href='#' className={styles.navLink} onClick={onNavigatePlayGame}>
          Play Game
        </a>
      </nav>
      <Button className={styles.logoutButton} onClick={onLogout}>
        Logout
      </Button>
    </header>
  )
}

export default Header
