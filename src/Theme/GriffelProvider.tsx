import React from 'react'
import { useGlobalStyles } from './GlobalStyles'
// If needed for advanced scenarios like SSR or specific renderer configurations:
// import { RendererProvider, createDOMRenderer } from '@griffel/react';

interface GriffelProviderProps {
  children: React.ReactNode
}

export const GriffelProvider = ({ children }: GriffelProviderProps) => {
  useGlobalStyles() // This hook injects the static styles

  // Example for custom renderer, not strictly needed for basic client-side rendering
  // const renderer = React.useMemo(() => createDOMRenderer(), []);

  return (
    // <RendererProvider renderer={renderer}>
    <>{children}</>
    // </RendererProvider>
  )
}
