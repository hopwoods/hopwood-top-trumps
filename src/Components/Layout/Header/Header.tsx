import { mergeClasses } from '@griffel/react'
import { useIcons } from '../../../Theme/useIcons'
import { useHeaderStyles } from './Header.styles'
import type { HeaderProps } from './Header.types'

const Header = ({ onLogout, onNavigateHome, onNavigateManageDecks, onNavigatePlayGame }: HeaderProps) => {
  const styles = useHeaderStyles()
  const { icons } = useIcons()

  return <>
    <header className={styles.root}>
      <div className={styles.logo} onClick={onNavigateHome}>
        <img src='/assets/images/fable-forge-logo.png' alt='Fable Forge Logo' />
      </div>
      <nav className={styles.nav}>
        <div className={styles.navLink} onClick={onNavigateHome}>
          {icons.home}
          Home
        </div>
        <div className={styles.navLink} onClick={onNavigateManageDecks}>
          {icons.manageDecks}
          Manage Decks
        </div>
        <div className={styles.navLink} onClick={onNavigatePlayGame}>
          {icons.play}
          Find Match
        </div>
      </nav>
      <div className={mergeClasses(styles.logoutButton, styles.navLink)} onClick={onLogout}>
        {icons.logout}
        Logout
      </div>

    </header>
  </>
}


export default Header
