import { makeStyles } from '@griffel/react'
import { breakpointTokens } from '../../../Theme/Tokens' // Import breakpointTokens

export const useAuthPageStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center the card horizontally
    justifyContent: 'flex-start', // Align card to the top
    width: '100vw', // Ensure root takes full viewport width
    minHeight: '100vh', // Ensure it takes full viewport height
    paddingTop: 'var(--fableforge-spacing-xl)',
    paddingLeft: 'var(--fableforge-spacing-m)',
    paddingRight: 'var(--fableforge-spacing-m)',
    paddingBottom: 'var(--fableforge-spacing-xl)',

    // Ensure no horizontal scroll even from padding issues on small screens
    [`@media (max-width: ${breakpointTokens.tablet})`]: {
      paddingLeft: '2.5vw', // Ensure padding allows 95vw child to center
      paddingRight: '2.5vw',
      paddingTop: 'var(--fableforge-spacing-l)', // Maybe less top/bottom padding on mobile
      paddingBottom: 'var(--fableforge-spacing-l)',
    },
    position: 'relative', // Keep for potential future absolute positioned children if any
    overflow: 'hidden', // Prevent scrollbars on the root itself
    boxSizing: 'border-box',
  },
  formContainer: {
    display: 'flex', // Ensures child cardBorder can use height: 100%
    flexDirection: 'column', // Ensures child cardBorder can use height: 100%
    position: 'relative', // For the ::before pseudo-element positioning
    overflow: 'hidden',   // To clip the ::before pseudo-element
    backgroundColor: 'rgba(38, 45, 53, 0.85)', // Dark semi-transparent background for the "card"
    borderRadius: 'var(--fableforge-border-radii-l)', // Card's border radius
    boxShadow: '0 0.5em 1.5em rgba(0, 0, 0, 0.6)', // More pronounced shadow for the card itself (em units)
    width: 'auto', // Let content or max-width define width
    maxWidth: '31.25em', // Approx 500px (500/16)
    minHeight: '37.5em', // Approx 600px (600/16)
    border: '2px solid var(--fableforge-color-brand-secondary)', // Gold border for the card
    zIndex: 2,
    boxSizing: 'border-box',
    // height: '100%', // Removed, height is auto/minHeight based
    // justifyContent: 'center', // Removed, as child (cardBorder) will fill this container
    // alignItems: 'center', // Removed, as child (cardBorder) will fill this container

    // Glossy Sheen for the card
    '::before': {
      content: '""',
      position: 'absolute',
      top: '-50%', // Adjust to position the sheen
      left: '-50%',
      width: '150%', // Make it large enough to cover with rotation
      height: '150%',
      background:
        'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.0) 50%, rgba(255, 255, 255, 0.1) 100%)', // Ensured sheen gradient is active
      opacity: '0.6', // Adjust opacity of sheen
      transform: 'rotate(25deg)', // Diagonal sheen
      zIndex: 1, // Behind the form content but above card background
      pointerEvents: 'none', // Allow clicks to pass through
    },

    // Responsive adjustments for tablet and below
    [`@media (max-width: ${breakpointTokens.tablet})`]: {
      width: '95vw', // Use 95% of viewport width
      maxWidth: 'none', // Remove desktop max-width
      minHeight: 'auto', // Let content define height
      // padding: '1.5em', // Removed, cardBorder will handle padding for the actual content
      borderTopWidth: '1px',
      borderRightWidth: '1px',
      borderBottomWidth: '1px',
      borderLeftWidth: '1px',
    },
  },

  cardBorder: {
    width: '100%', // Fill parent formContainer
    height: 'auto', // Height will be determined by content and flex-grow
    flexGrow: 1,    // Allows cardBorder to take up available space in formContainer
    boxSizing: 'border-box', // Crucial for width/height 100% with padding/border
    border: '12px solid var(--fableforge-color-black)', // Black border for the card
    borderRadius: 'var(--fableforge-border-radii-l)', // Consistent border radius with formContainer
    // minHeight: '37.5em', // Removed, effective height comes from formContainer
    padding: 'var(--fableforge-spacing-l)', // Padding for the actual content (logo, button)
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Center content (logo, button) vertically
    alignItems: 'center', // Center content (logo, button) horizontally
  },
  // Tertiary actions like toggle links should be styled as links, not buttons
  toggleLink: {
    // Ensure toggle link is not covered by the sheen
    position: 'relative',
    zIndex: 3,
    display: 'block',
    marginTop: 'var(--fableforge-spacing-l)',
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'var(--fableforge-color-brand-secondary)',
    borderTopStyle: 'none',
    borderRightStyle: 'none',
    borderBottomStyle: 'none',
    borderLeftStyle: 'none',
    // Or alternatively, ensure border width is 0 if style 'none' is problematic
    // borderWidth: 0,
    textDecoration: 'underline', // Set to underline by default to match image
    cursor: 'pointer',
    fontSize: 'var(--fableforge-typography-font-size-s)',
    fontFamily: 'var(--fableforge-typography-font-family-body)',
    transition: 'color 0.2s ease-in-out',
    // Removed hover effect as per user request for a simple hyperlink
  },
})
