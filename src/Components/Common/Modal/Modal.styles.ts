import { makeStyles } from '@griffel/react'

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
        backgroundColor: 'var(--fableforge-color-background-subtle)',
        borderRadius: 'var(--fableforge-border-radii-l)',
        padding: 'var(--fableforge-spacing-l)',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--fableforge-spacing-m)',
        maxHeight: '25px',
    },
    title: {
        margin: 0,
        fontSize: 'var(--fableforge-typography-font-size-xl)',
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: 'var(--fableforge-color-text-secondary)',
        padding: 'var(--fableforge-spacing-xxs)',
    },
})
