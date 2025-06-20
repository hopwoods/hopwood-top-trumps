import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useButtonStyles, mergeClasses } from './Button.styles'
import type { ButtonProps } from './Button.types'

export const Button = ({
  variant = 'primary',
  children,
  isLoading = false,
  iconLeft,
  iconRight,
  className,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) => {
  const styles = useButtonStyles()

  const buttonClasses = mergeClasses(
    styles.base,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    (disabled || isLoading) && styles.disabled,
    isLoading && styles.loading,
    className, // Allow for external classes to be passed
  )

  return (
    <button className={buttonClasses} disabled={disabled || isLoading} type={type} {...rest}>
      {isLoading && <FontAwesomeIcon icon={faSpinner} spin className={styles.spinner} data-testid="button-spinner" />}
      {!isLoading && (
        <span className={styles.buttonContent}>
          {iconLeft && <span className={styles.iconStyles}><FontAwesomeIcon icon={iconLeft} /></span>}
          {children}
          {iconRight && <span className={styles.iconStyles}><FontAwesomeIcon icon={iconRight} /></span>}
        </span>
      )}
    </button>
  )
}
