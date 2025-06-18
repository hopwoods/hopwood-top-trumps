import { useAppState } from '../../Hooks/UseAppState'
import type { AppEvent } from '../../Machines/AppMachine/AppMachine.types'

export const useHomePage = () => {
  const { send, getAppStateValue } = useAppState()
  const user = getAppStateValue('user') // Assuming 'user' in AppContext is of type User | null

  const handleLogout = () => {
    send({ type: 'LOGOUT' } as Extract<AppEvent, { type: 'LOGOUT' }>)
  }

  return {
    user,
    handleLogout,
  }
}
