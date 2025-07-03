import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * A simple inline spinner component.
 */
export const Spinner = () => {
  return <FontAwesomeIcon icon={faSpinner} spin />;
};
