import { makeStyles, shorthands } from '@griffel/react';

export const useBadgeStyles = makeStyles({
  root: {
    display: 'inline-block',
    padding: '0.25em 0.6em',
    fontSize: '75%',
    fontWeight: 700,
    lineHeight: 1,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    ...shorthands.borderRadius('var(--hopwood-border-radius-medium)'),
    color: 'var(--hopwood-color-text-on-primary)',
    backgroundColor: 'var(--hopwood-color-primary)',
  },
  primary: {
    backgroundColor: 'var(--hopwood-color-primary)',
  },
  secondary: {
    backgroundColor: 'var(--hopwood-color-secondary)',
  },
  success: {
    backgroundColor: 'var(--hopwood-color-success)',
  },
  warning: {
    backgroundColor: 'var(--hopwood-color-warning)',
    color: 'var(--hopwood-color-text-primary)',
  },
  danger: {
    backgroundColor: 'var(--hopwood-color-danger)',
  },
  default: {
    backgroundColor: 'var(--hopwood-color-background-surface-overlay)',
    color: 'var(--hopwood-color-text-primary)',
  },
});
