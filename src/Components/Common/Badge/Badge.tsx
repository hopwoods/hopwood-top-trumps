import { mergeClasses } from '@griffel/react';
import type { BadgeProps } from './Badge.types';
import { useBadgeStyles } from './Badge.styles';

/**
 * A simple badge component to display status or counts.
 */
export const Badge = ({ children, variant = 'default' }: BadgeProps) => {
  const styles = useBadgeStyles();

  const badgeClasses = mergeClasses(styles.root, styles[variant]);

  return <span className={badgeClasses}>{children}</span>;
};
