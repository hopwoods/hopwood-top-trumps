import { makeStyles, shorthands } from '@griffel/react';

export const useModalStyles = makeStyles({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'var(--hopwood-color-background-surface)',
    ...shorthands.borderRadius('var(--hopwood-border-radius-large)'),
    ...shorthands.padding('var(--hopwood-spacing-xl)'),
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--hopwood-spacing-l)',
  },
  title: {
    margin: 0,
    fontSize: 'var(--hopwood-typography-font-size-xl)',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: 'transparent',
    ...shorthands.border('none'),
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: 'var(--hopwood-color-text-secondary)',
  },
});
