import { makeStyles /* shorthands removed if not used elsewhere */ } from '@griffel/react'
// Tokens are used via CSS variables
import { shorthands } from '@griffel/react' // Import shorthands
import { breakpointTokens } from '../../Theme/Tokens'

export const useHomePageStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 'var(--fableforge-spacing-xl)',
    paddingBottom: 'var(--fableforge-spacing-xl)',
    paddingLeft: 'var(--fableforge-spacing-m)',
    paddingRight: 'var(--fableforge-spacing-m)',
    width: '100%',
    boxSizing: 'border-box',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 'var(--fableforge-spacing-xxl)',
  },
  title: {
    fontFamily: 'var(--fableforge-typography-font-family-heading)',
    fontSize: 'var(--fableforge-typography-font-size-display)',
    color: 'var(--fableforge-color-text-primary)',
    marginBottom: 'var(--fableforge-spacing-m)',
    [`@media (min-width: ${breakpointTokens.tablet})`]: {
      fontSize: 'var(--fableforge-typography-font-size-hero)',
    },
  },
  userInfo: {
    fontFamily: 'var(--fableforge-typography-font-family-body)',
    fontSize: 'var(--fableforge-typography-font-size-m)',
    color: 'var(--fableforge-color-text-secondary)',
    marginBottom: 'var(--fableforge-spacing-l)',
  },
  logoutButton: {
    // Styles for the logout button if needed, or rely on Button component's variants
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--fableforge-spacing-xl)',
    width: '100%',
    maxWidth: '900px', // Max width for larger screens
    [`@media (min-width: ${breakpointTokens.tablet})`]: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  },
  optionCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'var(--fableforge-color-background-surface-hover)', // Slightly different background for cards
    ...shorthands.borderRadius('var(--fableforge-border-radius-medium)'),
    ...shorthands.padding('var(--fableforge-spacing-l)'),
    flex: `1 1 0%`, // Allow cards to grow and shrink
    // Ensure Play Game is first on mobile by default (order in JSX)
    // For tablet and above, they are side-by-side, so order is visual
  },
  imagePlaceholder: {
    width: '100%',
    height: '200px', // Or a suitable aspect ratio
    backgroundColor: 'var(--fableforge-color-background-surface)', // Placeholder color
    ...shorthands.borderRadius('var(--fableforge-border-radius-small)'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--fableforge-color-text-disabled)',
    marginBottom: 'var(--fableforge-spacing-m)',
    fontFamily: 'var(--fableforge-typography-font-family-body)',
  },
  optionButton: {
    width: '100%', // Make buttons take full width of the card
  },
  // icon class was removed as it's not used directly here, icons are part of Button
})
