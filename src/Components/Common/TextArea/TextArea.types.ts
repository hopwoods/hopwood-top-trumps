import type React from 'react'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  iconLeft?: IconDefinition
  ref?: React.Ref<HTMLTextAreaElement>
}
