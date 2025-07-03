import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DeckForm } from './DeckForm';
import type { DeckFormProps } from './DeckForm.types';

describe('DeckForm Component', () => {
  const defaultProps: DeckFormProps = {
    formData: { name: '', description: '' },
    onChange: vi.fn(),
    onSubmit: vi.fn(),
    onCancel: vi.fn(),
    isSubmitting: false,
  };

  it('renders the form with empty fields for creation', () => {
    render(<DeckForm {...defaultProps} />);
    expect(screen.getByLabelText(/Deck Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Description/i)).toHaveValue('');
  });

  it('pre-fills the form with formData', () => {
    const formData = {
      name: 'My Test Deck',
      description: 'A deck for testing.',
    };
    render(<DeckForm {...defaultProps} formData={formData} />);
    expect(screen.getByLabelText(/Deck Name/i)).toHaveValue('My Test Deck');
    expect(screen.getByLabelText(/Description/i)).toHaveValue('A deck for testing.');
  });

  it('calls onCancel when the cancel button is clicked', () => {
    const onCancel = vi.fn();
    render(<DeckForm {...defaultProps} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit when the form is submitted', () => {
    const onSubmit = vi.fn();
    render(<DeckForm {...defaultProps} onSubmit={onSubmit} />);
    fireEvent.submit(screen.getByRole('button', { name: /Save Deck/i }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('disables buttons and shows "Saving..." text when isSubmitting is true', () => {
    render(<DeckForm {...defaultProps} isSubmitting={true} />);
    expect(screen.getByRole('button', { name: /Saving.../i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeDisabled();
  });
});
