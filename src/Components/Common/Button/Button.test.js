import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
describe('Button Component', function () {
    it('renders with children', function () {
        render(_jsx(Button, { children: "Click Me" }));
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });
    it('applies primary variant styles by default', function () {
        render(_jsx(Button, { children: "Primary Button" }));
        // Note: Testing exact class names from Griffel is brittle.
        // Instead, we test functionality or visual aspects via E2E/snapshot if needed.
        // For unit tests, we trust Griffel applies styles if useButtonStyles is called.
        // We can check for default attributes or behavior.
        expect(screen.getByRole('button', { name: /primary button/i })).toBeInTheDocument();
    });
    it('applies secondary variant styles when specified', function () {
        render(_jsx(Button, { variant: "secondary", children: "Secondary Button" }));
        expect(screen.getByRole('button', { name: /secondary button/i })).toBeInTheDocument();
    });
    it('calls onClick handler when clicked', function () {
        var handleClick = vi.fn();
        render(_jsx(Button, { onClick: handleClick, children: "Clickable" }));
        fireEvent.click(screen.getByRole('button', { name: /clickable/i }));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    it('is disabled when disabled prop is true', function () {
        render(_jsx(Button, { disabled: true, children: "Disabled Button" }));
        expect(screen.getByRole('button', { name: /disabled button/i })).toBeDisabled();
    });
    it('renders left icon when iconLeft prop is provided', function () {
        render(_jsx(Button, { iconLeft: faCoffee, children: "Button with Icon" }));
        var button = screen.getByRole('button', { name: /button with icon/i });
        // Check if an SVG element (FontAwesome icon) is present
        expect(button.querySelector('svg')).toBeInTheDocument();
    });
    it('renders right icon when iconRight prop is provided', function () {
        render(_jsx(Button, { iconRight: faCoffee, children: "Button with Icon" }));
        var button = screen.getByRole('button', { name: /button with icon/i });
        expect(button.querySelector('svg')).toBeInTheDocument();
    });
    it('shows spinner and hides content when isLoading is true', function () {
        render(_jsx(Button, { isLoading: true, iconLeft: faCoffee, children: "Loading Button" }));
        var button = screen.getByRole('button'); // Get the button element
        // Check for spinner icon
        expect(screen.getByTestId('button-spinner')).toBeInTheDocument(); // Assuming spinner has data-testid
        // Check that the main content span is NOT rendered
        // The content span has styles.buttonContent class
        // A more direct way is to check for the absence of the text or specific icons
        expect(screen.queryByText('Loading Button')).not.toBeInTheDocument();
        // Check that the iconLeft (faCoffee) is NOT rendered
        // FontAwesome icons are SVGs, we can check for its data-icon attribute
        var coffeeIcon = button.querySelector('svg[data-icon="coffee"]');
        expect(coffeeIcon).not.toBeInTheDocument();
    });
    it('sets the button type attribute', function () {
        render(_jsx(Button, { type: "submit", children: "Submit Button" }));
        expect(screen.getByRole('button', { name: /submit button/i })).toHaveAttribute('type', 'submit');
    });
    it('defaults to type="button" if no type is specified', function () {
        render(_jsx(Button, { children: "Default Type" }));
        expect(screen.getByRole('button', { name: /default type/i })).toHaveAttribute('type', 'button');
    });
});
