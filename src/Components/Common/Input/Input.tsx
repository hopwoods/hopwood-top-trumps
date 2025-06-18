import React from 'react'
import { useInputStyles } from './Input.styles'
import type { InputProps } from './Input.types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { mergeClasses } from '@griffel/react'

export const Input = ({ ref, label, error, iconLeft, className, ...rest }: InputProps & { ref?: React.RefObject<HTMLInputElement | null>, className?: string }) => {
    const styles = useInputStyles()

    return (
      <div className={styles.root}>
        {label && (
          <label htmlFor={rest.id} className={styles.label} data-testid="test-label">
            {iconLeft && <FontAwesomeIcon icon={iconLeft} className={styles.icon} />}
            {label}
          </label>
        )}
        <input {...rest} ref={ref} className={mergeClasses(styles.input, className)} data-testid="test-input" />
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    )
  }

Input.displayName = 'Input'
