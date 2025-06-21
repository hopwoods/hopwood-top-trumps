import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import type React from 'react'
import type { IconName } from '../../../Theme/useIcons' // Import IconName

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  children: React.ReactNode
  isLoading?: boolean
  iconName?: IconName // Use imported IconName
  iconLeft?: IconDefinition // For FontAwesome icons
  iconRight?: IconDefinition // For FontAwesome icons
  // type is already part of React.ButtonHTMLAttributes<HTMLButtonElement>
  // disabled is already part of React.ButtonHTMLAttributes<HTMLButtonElement>
}
