import { makeStyles, shorthands } from '@griffel/react';

export const useDeckFormStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--hopwood-spacing-l)',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--hopwood-spacing-s)',
  },
  label: {
    fontWeight: 'bold',
    color: 'var(--hopwood-color-text-primary)',
  },
  input: {
    ...shorthands.padding('var(--hopwood-spacing-s)'),
    ...shorthands.border('1px', 'solid', 'var(--hopwood-color-border-default)'),
    ...shorthands.borderRadius('var(--hopwood-border-radius-medium)'),
    backgroundColor: 'var(--hopwood-color-background-surface)',
    color: 'var(--hopwood-color-text-primary)',
    fontSize: 'var(--hopwood-typography-font-size-medium)',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 'var(--hopwood-spacing-m)',
    marginTop: 'var(--hopwood-spacing-l)',
  },
});
