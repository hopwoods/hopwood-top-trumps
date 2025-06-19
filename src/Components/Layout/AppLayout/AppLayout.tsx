import React from 'react'
import { useAppLayoutStyles } from './AppLayout.styles'
import Header from '../Header/Header'
import { GlobalStateContext } from '../../../Hooks/UseAppState'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
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
      <Header
        onLogout={handleLogout}
        onNavigateHome={handleNavigateHome}
        onNavigateManageDecks={handleNavigateManageDecks}
        onNavigatePlayGame={handleNavigatePlayGame}
      />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}

export default AppLayout
