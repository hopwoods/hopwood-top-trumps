import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // React removed
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useLoadingIndicatorStyles } from './LoadingIndicator.styles'

const LoadingIndicator = () => {
  const styles = useLoadingIndicatorStyles()

  return (
    <div className={styles.root}>
      <FontAwesomeIcon icon={faSpinner} spin size="2x" className={styles.icon} />
      <p className={styles.text}>Loading...</p>
    </div>
  )
}

export default LoadingIndicator
