import type React from 'react'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  iconLeft?: IconDefinition
  iconRight?: IconDefinition
}
