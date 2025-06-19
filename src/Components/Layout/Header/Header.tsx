import { useHeaderStyles } from './Header.styles'
import type { HeaderProps } from './Header.types'
import { mergeClasses } from '@griffel/react'

const Header = ({ onLogout, onNavigateHome, onNavigateManageDecks, onNavigatePlayGame }: HeaderProps) => {
  const styles = useHeaderStyles()

  return <>
    <header className={styles.root}>
      <div className={styles.logo} onClick={onNavigateHome}>
        <img src='/public/assets/images/fable-forge-logo-title.PNG' alt='Fable Forge Logo' />
      </div>
      <nav className={styles.nav}>
        <div className={styles.navLink} onClick={onNavigateHome}>
          Home
        </div>
        <div className={styles.navLink} onClick={onNavigateManageDecks}>
          Manage Decks
        </div>
        <div className={styles.navLink} onClick={onNavigatePlayGame}>
          Play Game
        </div>
      </nav>
      <div className={mergeClasses(styles.logoutButton, styles.navLink)} onClick={onLogout}>
        Menu
      </div>

    </header>
  </>
}


export default Header
