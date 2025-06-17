import React from 'react'
import { useAppLayoutStyles } from './AppLayout.styles'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const styles = useAppLayoutStyles()

  return (
    <div className={styles.root}>
      {/* <header className={styles.header}> */}
      {/*   App Header Placeholder - Will be developed later */}
      {/* </header> */}
      <main className={styles.main}>
        {children}
      </main>
      {/* <footer className={styles.footer}> */}
      {/*   App Footer Placeholder - Will be developed later */}
      {/* </footer> */}
    </div>
  )
}

export default AppLayout
