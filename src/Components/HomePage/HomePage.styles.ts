import { makeStyles, shorthands } from '@griffel/react'
import { breakpointTokens } from '../../Theme/Tokens' // Adjusted path

export const useHomePageStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: '7em min-content min-content 1fr',
    gridTemplateColumns: '1fr',
    alignItems: 'center',
    justifyItems: 'center',
    textAlign: 'center',
    width: '100%',
    minHeight: '100vh',
  },
  // Hero section
  hero: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBlock: 'var(--fableforge-spacing-m)',

    '& img': {
      width: '40%',
      height: 'auto',
      borderRadius: 'var(--fableforge-border-radii-l)',
    }
  },
  title: {
    marginBottom: 'var(--fableforge-spacing-m)',
  },
  subtitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 'var(--fableforge-spacing-l)',
    fontFamily: 'var(--fableforge-typography-font-family-body)',
    fontSize: 'var(--fableforge-typography-font-size-l)',
    color: 'var(--fableforge-color-text-secondary)',
    marginBottom: 'var(--fableforge-spacing-xl)',
    justifyContent: 'center',
    textAlign: 'justify',
    paddingRight: 'var(--fableforge-spacing-l)',

    '& img': {
      width: '15em',
      aspectRatio: 1 / 1,
    }
  },
  welcomeText: {
    color: 'var(--fableforge-color-brand-secondary)',
    marginRight: 'var(--fableforge-spacing-s)',
  },

  // Featured banner
  featuredBanner: {
    backgroundColor: 'var(--fableforge-color-brand-primary)',
    color: 'var(--fableforge-color-white)',
    width: 'calc(100% - var(--fableforge-spacing-l))',
    padding: 'var(--fableforge-spacing-m)',
    borderRadius: 'var(--fableforge-border-radii-m)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--fableforge-shadow-l)',
    fontSize: 'var(--fableforge-typography-font-size-m)',
    fontWeight: 'var(--fableforge-typography-font-weight-medium)',
    fontFamily: 'var(--fableforge-typography-font-family-heading)',
  },
  bannerIcon: {
    fontSize: 'var(--fableforge-typography-font-size-xl)',
    marginRight: 'var(--fableforge-spacing-s)',
  },
  // Options container
  optionsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 'var(--fableforge-spacing-l)',
    width: '100%',
    height: '100%',
    justifyItems: 'center',
    alignItems: 'start',
    padding: 'var(--fableforge-spacing-m)',
    marginTop: 'var(--fableforge-spacing-xl)',

    [`@media (min-width: ${breakpointTokens.tablet})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  // Option cards
  optionCard: {
    aspectRatio: 1 / 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'var(--fableforge-color-panel-color)',
    borderRadius: 'var(--fableforge-border-radii-l)',
    ...shorthands.padding('var(--fableforge-spacing-xl)', 'var(--fableforge-spacing-l)'),
    width: '100%',
    maxHeight: '400px',
    maxWidth: '400px',
    boxShadow: 'var(--fableforge-shadow-s)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      '& > [class*=cardOverlay]': {
        opacity: 1,
      },
    },
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(176, 183, 192, 0.9)', // Semi-transparent panel color
    ...shorthands.padding('var(--fableforge-spacing-l)'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    transition: 'opacity 0.2s ease',
  },
  // Button styling
  optionButton: {
    width: '100%',
    textAlign: 'center',
    height: '20em',
  },
  manageDecks: {
    backgroundImage: 'url(./assets/images/fable-forge-manage-decks.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  findMatch: {
    backgroundImage: 'url(./assets/images/fable-forge-find-match.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
})
