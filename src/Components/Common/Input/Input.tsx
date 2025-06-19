import React from 'react'
import { useInputStyles } from './Input.styles'
import type { InputProps as OriginalInputProps } from './Input.types' // Renamed to avoid conflict
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { mergeClasses } from '@griffel/react'

// Props specific to this component's logic/rendering, not for the native input element
interface CustomInputProps {
  label?: string
  error?: string
  iconLeft?: OriginalInputProps['iconLeft'] // Use the type from the original InputProps
  // className is handled by mergeClasses, so it's a custom prop here too
  className?: string
}

// Combine custom props with standard HTML input attributes.
// Omit any custom prop names from the standard HTML attributes to prevent conflicts
// and ensure only valid HTML attributes are in `inputHtmlAttributes`.
// For React 19, ref can be a direct prop.
type Props = CustomInputProps &
             Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof CustomInputProps | 'ref'> &
             { ref?: React.Ref<HTMLInputElement> }


export const Input = (props: Props) => {
    // Destructure our custom props and ref; the rest are for the native <input>
    const { label, error, iconLeft, className, ref, ...inputHtmlAttributes } = props
    const styles = useInputStyles()

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
          ref={ref}
          className={mergeClasses(styles.input, className)} // Apply styles including passed className
          data-testid="test-input"
        />
        <p
          data-testid="input-error-message"
          className={styles.errorMessage}
          style={{ visibility: error ? 'visible' : 'hidden' }}
        >
          {error || ''} {/* Ensure there's always a child, even if empty string */}
        </p>
      </div>
    )
  }

Input.displayName = 'Input'
