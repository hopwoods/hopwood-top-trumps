import { makeStyles } from '@griffel/react'
import { breakpointTokens } from '../../Theme/Tokens' // Import breakpointTokens

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
    backgroundColor: 'var(--fableforge-color-background-body)',
    // Ensure no horizontal scroll even from padding issues on small screens
    [`@media (max-width: ${breakpointTokens.tablet})`]: {
      paddingLeft: '2.5vw', // Ensure padding allows 95vw child to center
      paddingRight: '2.5vw',
      paddingTop: 'var(--fableforge-spacing-l)', // Maybe less top/bottom padding on mobile
      paddingBottom: 'var(--fableforge-spacing-l)',
    },
    // border: '1px solid var(--fableforge-color-brand-secondary)',
    // borderRadius: 'var(--fableforge-border-l)', // Border radius removed from root
    // boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)', // Shadow removed from root
    position: 'relative', // Keep for potential future absolute positioned children if any
    overflow: 'hidden', // Prevent scrollbars on the root itself
    boxSizing: 'border-box',
    // '::before': { // Removed from root, will be added to formContainer
    // },
  },
  formContainer: {
    position: 'relative', // For the ::before pseudo-element positioning
    overflow: 'hidden',   // To clip the ::before pseudo-element
    backgroundColor: 'rgba(38, 45, 53, 0.85)', // Dark semi-transparent background for the "card"
    padding: '2em', // Use em units for padding (approx var(--fableforge-spacing-xl))
    borderRadius: 'var(--fableforge-border-l)', // Card's border radius
    boxShadow: '0 0.5em 1.5em rgba(0, 0, 0, 0.6)', // More pronounced shadow for the card itself (em units)
    width: 'auto', // Let content or max-width define width initially
    maxWidth: '31.25em', // Approx 500px (500/16)
    minHeight: '37.5em', // Approx 600px (600/16)
    border: '2px solid var(--fableforge-color-brand-secondary)', // Gold border for the card
    zIndex: 2,
    boxSizing: 'border-box',
    display: 'flex', // To help center content within the card
    flexDirection: 'column',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally

    // Glossy Sheen for the card
    '::before': {
      content: '""',
      position: 'absolute',
      top: '-50%', // Adjust to position the sheen
      left: '-50%',
      width: '200%', // Make it large enough to cover with rotation
      height: '200%',
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
      padding: '1.5em', // Approx var(--fableforge-spacing-l)
      borderTopWidth: '1px',
      borderRightWidth: '1px',
      borderBottomWidth: '1px',
      borderLeftWidth: '1px',
    },
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
