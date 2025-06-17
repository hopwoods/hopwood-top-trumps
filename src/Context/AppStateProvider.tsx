import React from 'react'
import { GlobalStateContext } from '../Hooks/UseAppState'
import { appMachine } from '../Machines/AppMachine/AppMachine'

interface AppStateProviderProps {
  children: React.ReactNode
}

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
  // If appMachine needs specific input when created by the provider, pass it here.
  // For now, assuming no specific input beyond its internal setup.
  // Reverting to <Context.Provider> as createActorContext provides it this way.
  return (
    // eslint-disable-next-line react-x/no-context-provider
    <GlobalStateContext.Provider logic={appMachine}>
      {children}
    </GlobalStateContext.Provider>
  )
}
