import { useAppState } from './Hooks/UseAppState'
import AppLayout from './Components/Layout/AppLayout'
import AuthPage from './Components/Auth/AuthPage'
import HomePage from './Components/HomePage/HomePage'
import LoadingIndicator from './Components/Common/LoadingIndicator'
import './App.css' // We can keep this for now or move styles later

const App = () => {
  const { appState } = useAppState()

  // The 'initializing' state covers the initial auth check
  if (appState.matches('initializing')) {
    return <LoadingIndicator />
  }

  // The 'authenticating' state is where login/register forms will be shown.
  // Errors during login attempts are handled within this state, updating appState.context.error.
  if (appState.matches('authenticating')) {
    return (
      <AppLayout>
        <AuthPage />
      </AppLayout>
    )
  }

  if (appState.matches('authenticated')) {
    return (
      <AppLayout>
        <HomePage />
      </AppLayout>
    )
  }

  // Fallback or initial state before machine fully initializes (should be brief)
  return <LoadingIndicator />
}

export default App
