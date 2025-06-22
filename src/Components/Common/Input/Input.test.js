import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';
describe('Input Component', function () {
    it('renders an input element', function () {
        render(_jsx(Input, { id: "test-input" }));
        var inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();
    });
    it('applies the className to the input element', function () {
        render(_jsx(Input, { id: "test-input", className: "custom-class" }));
        var inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveClass('custom-class');
    });
    it('renders a label when label prop is provided', function () {
        render(_jsx(Input, { id: "test-input", label: "Test Label" }));
        var labelElement = screen.getByTestId('test-label');
        expect(labelElement).toBeInTheDocument();
    });
    it('handles onChange event', function () {
        var onChange = vi.fn();
        render(_jsx(Input, { id: "test-input", onChange: onChange }));
        var inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, { target: { value: 'test value' } });
        expect(onChange).toHaveBeenCalledTimes(1);
    });
    it('sets the input type attribute', function () {
        render(_jsx(Input, { id: "test-input", type: "email" }));
        var inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveAttribute('type', 'email');
    });
    it('passes other props to the input element', function () {
        render(_jsx(Input, { id: "test-input", placeholder: "Test Placeholder", required: true }));
        var inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveAttribute('placeholder', 'Test Placeholder');
        expect(inputElement).toHaveAttribute('required');
    });
});
