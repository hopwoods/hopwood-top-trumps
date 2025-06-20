import React from 'react'
import { GlobalStateContext } from '../Hooks/UseAppState'
import { appMachine } from '../Machines/AppMachine/AppMachine'

interface AppStateProviderProps {  children: React.ReactNode
}

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
  return (
    <GlobalStateContext.Provider logic={appMachine}>
      {children}
    </GlobalStateContext.Provider>
  )
}
  