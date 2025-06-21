import { faGamepad, faHouseChimney, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faInbox } from '@fortawesome/free-solid-svg-icons/faInbox'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makeStyles } from '@griffel/react'


export const useIcons = () => {
    const styles = useStyles()
    const icons = {
        logout: <span className={styles.icon}><FontAwesomeIcon icon={faSignOutAlt} /></span>,
        play: <span className={styles.icon}><FontAwesomeIcon icon={faGamepad} /></span>,
        home: <span className={styles.icon}><FontAwesomeIcon icon={faHouseChimney} /></span>,
        manageDecks: <span className={styles.icon}><FontAwesomeIcon icon={faInbox} /></span>,
        add: <span className={styles.icon}><FontAwesomeIcon icon={faPlus} /></span>,
    }

    return { icons }
}

const useStyles = makeStyles({
    icon: {
        fontSize: '1.2em',
        marginRight: '0.5em',
        position: 'relative',
        top: '0.05em', // Adjust vertical alignment
    },
})