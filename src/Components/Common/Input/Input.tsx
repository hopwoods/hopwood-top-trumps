
import { useInputStyles } from './Input.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { mergeClasses } from '@griffel/react'
import type { InputProps } from './Input.types'

export const Input = (props: InputProps) => { // Reverted to Props
    // Destructure our custom props and ref; the rest are for the native <input>
    const { label, error, iconLeft, className, ref, ...inputHtmlAttributes } = props // Added ref back
    const styles = useInputStyles()

    console.log(`[InputComponent] Received error prop for input "${props.name || props.id}":`, error) // Added console log

    return (
      <div className={styles.root}>
        {label && (
          <label htmlFor={inputHtmlAttributes.id} className={styles.label} data-testid="test-label">
            {iconLeft && <FontAwesomeIcon icon={iconLeft} className={styles.icon} />}
            {label}
          </label>
        )}
        <input
          {...inputHtmlAttributes} // Spread only the valid HTML attributes
          ref={ref} // Added ref back
          className={mergeClasses(styles.input, className)} // Apply styles including passed className
          data-testid="test-input"
        />
        <p
          data-testid="input-error-message"
          className={styles.errorMessage}
        >
          {error || ''}
        </p>
      </div>
    )
  }

Input.displayName = 'Input'
