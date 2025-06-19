import { makeStyles } from '@griffel/react'

export const useAppLayoutStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Ensure it takes full viewport height
    backgroundColor: 'var(--hopwood-color-background-body)', // Explicitly set background
  },
  header: {
    // Styles are now handled by the Header component itself
    // This rule is kept for structural clarity if needed for AppLayout's own layout
  },
  main: {
    flexGrow: 1,
    display: 'flex', // Allow children to use flex/grid for their own layout
    flexDirection: 'column', // Default to column for main content
    alignItems: 'stretch', // Stretch content to fill available width
    justifyContent: 'flex-start', // Align content to the top
    width: '100%', // Ensure main takes full width
    // Padding for main content can be applied here or within individual pages
  },
  footer: {
    backgroundColor: 'var(--hopwood-color-panel-color)',
    padding: 'var(--hopwood-spacing-m)',
    textAlign: 'center',
    color: 'var(--hopwood-color-text-secondary)',
    fontSize: 'var(--hopwood-typography-font-size-s)',
    borderTop: '1px solid var(--hopwood-color-border-subtle)',
  },
})
