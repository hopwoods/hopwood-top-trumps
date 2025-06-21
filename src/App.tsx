import { GlobalStateContext } from './Hooks/UseAppState' // Changed to use GlobalStateContext.useSelector
import AppLayout from './Components/Layout/AppLayout/AppLayout'
import AuthPage from './Components/Auth/AuthPage/AuthPage'
import HomePage from './Components/HomePage/HomePage' // Corrected path
import ManageDecksPage from './Components/Decks/ManageDecksPage/ManageDecksPage' // Added
import PlayGamePage from './Components/Game/PlayGamePage/PlayGamePage' // Added
import LoadingIndicator from './Components/Common/LoadingIndicator/LoadingIndicator'
import './App.css'

const App = () => {
  // Use useSelector to react to state changes for rendering
  const appStateValue = GlobalStateContext.useSelector(state => state.value)
  const initializing = GlobalStateContext.useSelector(state => state.matches('initializing'))
  const unauthenticated = GlobalStateContext.useSelector(state => state.matches('unauthenticated'))
  const authenticatedHome = GlobalStateContext.useSelector(state => state.matches({ authenticated: 'home' }))
  const authenticatedPlayGame = GlobalStateContext.useSelector(state => state.matches({ authenticated: 'playGame' }))
  const authenticatedManageDecks = GlobalStateContext.useSelector(state => state.matches({ authenticated: 'manageDecks' }))

  console.log('[App.tsx] Current appMachine state value:', appStateValue)


  if (initializing) {
    return <LoadingIndicator />
  }

  if (unauthenticated) {
    // AuthPage will internally manage showing Login or Register based on authMachine's state (or local UI toggle)
    // It will also need access to the authActorRef to pass events to it.
    return (
      <AppLayout isAuthenticated={false}>
        <AuthPage />
      </AppLayout>
    )
  }

  if (authenticatedHome) {
    return (
      <AppLayout isAuthenticated={true}>
        <HomePage />
      </AppLayout>
    )
  }

  if (authenticatedPlayGame) {
    return (
      <AppLayout>
        <PlayGamePage />
      </AppLayout>
    )
  }

  if (authenticatedManageDecks) {
    return (
      <AppLayout>
        <ManageDecksPage />
      </AppLayout>
    )
  }

  // Fallback or if none of the states match (should ideally not happen with a well-defined machine)
  console.warn('[App.tsx] No matching state for rendering, falling back to LoadingIndicator. Current state:', appStateValue)
  return <LoadingIndicator />
}

export default App
