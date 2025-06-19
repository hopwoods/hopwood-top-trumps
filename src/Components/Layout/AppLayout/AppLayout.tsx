import React from 'react'
import { useAppLayoutStyles } from './AppLayout.styles'
import Header from '../Header/Header'
import { GlobalStateContext } from '../../../Hooks/UseAppState'
import { mergeClasses } from '../../Common/Button/Button.styles'

interface AppLayoutProps {
  isAuthenticated?: boolean
  children: React.ReactNode
}

const AppLayout = ({ children, isAuthenticated }: AppLayoutProps) => {
  const styles = useAppLayoutStyles()
  const appActor = GlobalStateContext.useActorRef()

  const handleLogout = () => {
    appActor.send({ type: 'LOGOUT' })
  }

  const handleNavigateHome = () => {
    appActor.send({ type: 'GO_TO_HOME' })
  }

  const handleNavigateManageDecks = () => {
    appActor.send({ type: 'NAVIGATE_TO_MANAGE_DECKS' })
  }

  const handleNavigatePlayGame = () => {
    appActor.send({ type: 'NAVIGATE_TO_PLAY_GAME' })
  }

  return (
    <div className={styles.root}>
      {
        isAuthenticated && <Header
          onLogout={handleLogout}
          onNavigateHome={handleNavigateHome}
          onNavigateManageDecks={handleNavigateManageDecks}
          onNavigatePlayGame={handleNavigatePlayGame}
        />
      }
      <main className={mergeClasses('main',styles.main, isAuthenticated && styles.isAuthenticated)}>
        <div className={mergeClasses('cardBorder', isAuthenticated && styles.cardBorder)}>
          <div className={mergeClasses('mainContent', styles.mainContent)}>
          {children}
          </div>
          </div>
      </main>
      {isAuthenticated && (
        <footer className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} FableForge. All rights reserved.</p>
        </footer>
      )}
    </div>
  )
}

export default AppLayout
