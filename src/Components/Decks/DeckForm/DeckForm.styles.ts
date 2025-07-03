import { makeStyles } from '@griffel/react';

export const useDeckFormStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--fableforge-spacing-l)',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--fableforge-spacing-s)',
  },
  label: {
    fontWeight: 'bold',
    color: 'var(--fableforge-color-text-primary)',
  },
  input: {

  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 'var(--fableforge-spacing-m)',
  },
});
