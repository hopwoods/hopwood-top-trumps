import { makeStyles } from '@griffel/react'

export const useBadgeStyles = makeStyles({
    root: {
        display: 'inline-block',
        padding: '0.35em 0.6em',
        fontSize: '0.9em',
        borderRadius: 'var(--fableforge-border-radii-m)',
        fontWeight: 700,
        lineHeight: 1,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'baseline',
        color: 'var(--fableforge-color-text-on-primary)',
        backgroundColor: 'var(--fableforge-color-text-primary)',
    },
    primary: {
        backgroundColor: 'var(--fableforge-color-brand-primary)',
    },
    secondary: {
        backgroundColor: 'var(--fableforge-color-brand-secondary)',
    },
    success: {
        backgroundColor: 'var(--fableforge-color-brand-success)',
    },
    warning: {
        backgroundColor: 'var(--fableforge-color-brand-warning)',
        color: 'var(--fableforge-color-text-primary)',
    },
    danger: {
        backgroundColor: 'var(--fableforge-color-danger)',
    },
    default: {
        backgroundColor: 'var(--fableforge-color-background-surface-overlay)',
        color: 'var(--fableforge-color-text-primary)',
    },
})
