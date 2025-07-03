import { faGamepad, faHouseChimney, faPlus, faEdit, faTrashAlt, faTimes, faSave } from '@fortawesome/free-solid-svg-icons'
import { faInbox } from '@fortawesome/free-solid-svg-icons/faInbox'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makeStyles } from '@griffel/react'
import type React from 'react'

// Define and export the keys for type safety
export const iconKeys = {
  logout: 'logout',
  play: 'play',
  home: 'home',
  manageDecks: 'manageDecks',
  add: 'add',
  edit: 'edit',
  delete: 'delete',
  cancel: 'cancel',
  save: 'save',
} as const

export type IconName = keyof typeof iconKeys

// Define the return type of the useIcons hook for clarity
export type UseIconsResult = {
  icons: Record<IconName, React.ReactElement>
}

const useStyles = makeStyles({
  icon: {
    fontSize: '1.2em',
    marginRight: '0.5em',
    position: 'relative',
    top: '0.05em', // Adjust vertical alignment
  },
})

export const useIcons = (): UseIconsResult => {
  const styles = useStyles()
  const icons: Record<IconName, React.ReactElement> = {
    logout: <span className={styles.icon}><FontAwesomeIcon icon={faSignOutAlt} /></span>,
    play: <span className={styles.icon}><FontAwesomeIcon icon={faGamepad} /></span>,
    home: <span className={styles.icon}><FontAwesomeIcon icon={faHouseChimney} /></span>,
    manageDecks: <span className={styles.icon}><FontAwesomeIcon icon={faInbox} /></span>,
    add: <span className={styles.icon}><FontAwesomeIcon icon={faPlus} /></span>,
    edit: <span className={styles.icon}><FontAwesomeIcon icon={faEdit} /></span>,
    delete: <span className={styles.icon}><FontAwesomeIcon icon={faTrashAlt} /></span>,
    cancel: <span className={styles.icon}><FontAwesomeIcon icon={faTimes} /></span>,
    save: <span className={styles.icon}><FontAwesomeIcon icon={faSave} /></span>,
  }
  return { icons }
}
