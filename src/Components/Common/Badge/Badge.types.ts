export interface BadgeProps {
  /**
   * The content to display inside the badge.
   */
  children: React.ReactNode;
  /**
   * The variant of the badge, which determines its color scheme.
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}
