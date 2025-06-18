import React from 'react'
import { useInputStyles } from './Input.styles'
import type { InputProps } from './Input.types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, iconLeft, ...rest }, ref) => {
    const styles = useInputStyles()

    return (
      <div className={styles.root}>
        {label && (
          <label htmlFor={rest.id} className={styles.label}>
            {iconLeft && <FontAwesomeIcon icon={iconLeft} className={styles.icon} />}
            {label}
          </label>
        )}
        <input {...rest} ref={ref} className={styles.input} />
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'
