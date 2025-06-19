import { useAppState } from '../../../Hooks/UseAppState'
import type {
  LogoutEvent,
  NavigateToPlayGameEvent,
  NavigateToManageDecksEvent,
} from '../../../Machines/AppMachine/AppMachine.types'

export const useHomePage = () => {
  const { send, getAppStateValue } = useAppState()
  const user = getAppStateValue('user') // Assuming 'user' in AppContext is of type User | null

  const handleLogout = () => {
    const event: LogoutEvent = { type: 'LOGOUT' }
    send(event)
  }

  const handlePlayGame = () => {
    const event: NavigateToPlayGameEvent = { type: 'NAVIGATE_TO_PLAY_GAME' }
    send(event)
    console.log('Navigate to Play Game')
  }

  const handleManageDecks = () => {
    const event: NavigateToManageDecksEvent = { type: 'NAVIGATE_TO_MANAGE_DECKS' }
    send(event)
    console.log('Navigate to Manage Decks')
  }

  return {
    user,
    handleLogout,
    handlePlayGame,
    handleManageDecks,
  }
}
