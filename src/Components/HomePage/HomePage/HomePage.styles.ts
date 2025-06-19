import { makeStyles, shorthands } from '@griffel/react'
import { breakpointTokens } from '../../../Theme/Tokens'

export const useHomePageStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'var(--fableforge-color-panel)',
  },
  // Hero section
  hero: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 'var(--fableforge-spacing-xl)',
    paddingTop: 'var(--fableforge-spacing-xl)',
    paddingBottom: 'var(--fableforge-spacing-l)',
    '& img': {
      width: '40%',
      height: 'auto',
      borderRadius: 'var(--fableforge-border-radii-l)',
    }
  },
  title: {
    fontFamily: 'var(--fableforge-typography-font-family-heading)',
    fontSize: 'var(--fableforge-typography-font-size-4xl)',
    fontWeight: 'var(--fableforge-typography-font-weight-bold)',
    color: 'var(--fableforge-color-brand-primary)',
    marginBottom: 'var(--fableforge-spacing-m)',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Subtle text shadow for depth
    [`@media (min-width: ${breakpointTokens.tablet})`]: {
      fontSize: 'calc(var(--fableforge-typography-font-size-4xl) * 1.5)',
    },
  },
  subtitle: {
    fontFamily: 'var(--fableforge-typography-font-family-body)',
    fontSize: 'var(--fableforge-typography-font-size-l)',
    color: 'var(--fableforge-color-text-secondary)',
    marginBottom: 'var(--fableforge-spacing-l)',
    maxWidth: '600px',
  },
  // Featured banner
  featuredBanner: {
    backgroundColor: 'var(--fableforge-color-brand-secondary)',
    color: 'var(--fableforge-color-black)',
    width: 'calc(100% - var(--fableforge-spacing-l))',
    maxWidth: '1000px',
    ...shorthands.padding('var(--fableforge-spacing-m)'),
    marginBottom: 'var(--fableforge-spacing-xl)',
    borderRadius: 'var(--fableforge-border-radii-m)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--fableforge-shadow-s)',
    fontSize: 'var(--fableforge-typography-font-size-m)',
    fontWeight: 'var(--fableforge-typography-font-weight-medium)',
  },
  bannerIcon: {
    fontSize: 'var(--fableforge-typography-font-size-xl)',
    marginRight: 'var(--fableforge-spacing-s)',
    color: 'var(--fableforge-color-brand-primary)',
  },
  // Options container
  optionsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 'var(--fableforge-spacing-xl)',
    width: '100%',
    maxWidth: '1200px',
    padding: 'var(--fableforge-spacing-m)',
    [`@media (min-width: ${breakpointTokens.tablet})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [`@media (min-width: ${breakpointTokens.laptop})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  // Option cards
  optionCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'var(--fableforge-color-panel-color)',
    borderRadius: 'var(--fableforge-border-radii-l)',
    ...shorthands.padding('var(--fableforge-spacing-xl)', 'var(--fableforge-spacing-l)'),
    minHeight: '300px',
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
    '& h2': {
      fontSize: 'var(--fableforge-typography-font-size-xl)',
      fontWeight: 'var(--fableforge-typography-font-weight-bold)',
      color: 'var(--fableforge-color-text-primary)',
      marginTop: 'var(--fableforge-spacing-m)',
      marginBottom: 'var(--fableforge-spacing-s)',
    },
  },
  cardIcon: {
    fontSize: '3rem',
    color: 'var(--fableforge-color-brand-secondary)',
    backgroundColor: 'var(--fableforge-color-background-body)',
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'start',
    marginBottom: 'var(--fableforge-spacing-m)',
    boxShadow: 'var(--fableforge-shadow-s)',
  },
  cardDescription: {
    color: 'var(--fableforge-color-text-secondary)',
    fontSize: 'var(--fableforge-typography-font-size-m)',
    lineHeight: '1.5',
    marginBottom: 'var(--fableforge-spacing-l)',
    textAlign: 'center',
    maxWidth: '90%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(38, 45, 53, 0.9)', // Semi-transparent panel color
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
  },
  manageDecks: {
    backgroundImage: 'url(/public/assets/images/manage-decks.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
})
