import { useTextAreaStyles } from './TextArea.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { mergeClasses } from '@griffel/react'
import type { TextAreaProps } from './TextArea.types'

export const TextArea = (props: TextAreaProps) => {
    const { label, error, iconLeft, className, ref, ...textAreaHtmlAttributes } = props
    const styles = useTextAreaStyles()

    if (error) {
      console.error(`[TextAreaComponent] Error for textarea "${props.name || props.id}":`, error);
    }

    return (
      <div className={styles.root}>
        {label && (
          <label htmlFor={textAreaHtmlAttributes.id} className={styles.label} data-testid="test-label">
            {iconLeft && <FontAwesomeIcon icon={iconLeft} className={styles.icon} />}
            {label}
          </label>
        )}
        <textarea
          {...textAreaHtmlAttributes}
          ref={ref}
          className={mergeClasses(styles.textarea, className)}
          data-testid="test-textarea"
        />
        {error && (
          <p data-testid="textarea-error-message" className={styles.errorMessage} >
            {error || ''}
          </p>
        )}
      </div>
    )
  }

TextArea.displayName = 'TextArea'
