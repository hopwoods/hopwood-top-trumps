/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './Input'

describe('Input Component', () => {
  it('renders an input element', () => {
    render(<Input id="test-input" />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
  })

  it('applies the className to the input element', () => {
    render(<Input id="test-input" className="custom-class" />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveClass('custom-class')
  })

  it('renders a label when label prop is provided', () => {
    render(<Input id="test-input" label="Test Label" />)
    const labelElement = screen.getByTestId('test-label')
    expect(labelElement).toBeInTheDocument()
  })

  it('handles onChange event', () => {
    const onChange = vi.fn()
    render(<Input id="test-input" onChange={onChange} />)
    const inputElement = screen.getByRole('textbox')
    fireEvent.change(inputElement, { target: { value: 'test value' } })
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('sets the input type attribute', () => {
    render(<Input id="test-input" type="email" />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveAttribute('type', 'email')
  })

  it('passes other props to the input element', () => {
    render(<Input id="test-input" placeholder="Test Placeholder" required />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveAttribute('placeholder', 'Test Placeholder')
    expect(inputElement).toHaveAttribute('required')
  })
})
