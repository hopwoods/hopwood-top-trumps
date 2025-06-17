import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import type React from 'react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  isLoading?: boolean
  iconLeft?: IconDefinition
  iconRight?: IconDefinition
  // type is already part of React.ButtonHTMLAttributes<HTMLButtonElement>
  // disabled is already part of React.ButtonHTMLAttributes<HTMLButtonElement>
}
