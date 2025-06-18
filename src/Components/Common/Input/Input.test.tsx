import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './Input'

describe('Input Component', () => {
  it('renders an input element', () => {
    render(<Input id="test-input" />)
    const inputElement = screen.getByRole('textbox', { hidden: false })
    expect(inputElement).toBeInTheDocument()
  })

  it('applies the className to the input element', () => {
    render(<Input id="test-input" className="custom-class" />)
    const inputElement = screen.getByRole('textbox', { hidden: false })
    expect(inputElement).toHaveClass('custom-class')
  })

  it('renders a label when label prop is provided', () => {
    render(<Input id="test-input" label="Test Label" />)
    const labelElement = screen.getByText(/test label/i)
    expect(labelElement).toBeInTheDocument()
  })

  it('associates the label with the input using htmlFor', () => {
    render(<Input id="test-input" label="Test Label" />)
    const labelElement = screen.getByText(/test label/i)
    expect(labelElement).toHaveAttribute('htmlFor', 'test-input')
  })

  it('displays an error message when error prop is provided', () => {
    render(<Input id="test-input" error="Test Error Message" />)
    const errorMessage = screen.getByText(/test error message/i)
    expect(errorMessage).toBeInTheDocument()
  })

  it('forwards ref to the input element', () => {
    const ref = React.useRef<HTMLInputElement>(null)
    render(<Input id="test-input" ref={ref} />)
    expect(ref.current).toBeInTheDocument()
  })

  it('handles onChange event', () => {
    const onChange = vi.fn()
    render(<Input id="test-input" onChange={onChange} />)
    const inputElement = screen.getByRole('textbox', { hidden: false })
    fireEvent.change(inputElement, { target: { value: 'test value' } })
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('sets the input type attribute', () => {
    render(<Input id="test-input" type="email" />)
    const inputElement = screen.getByRole('textbox', { hidden: false })
    expect(inputElement).toHaveAttribute('type', 'email')
  })

  it('passes other props to the input element', () => {
    render(<Input id="test-input" placeholder="Test Placeholder" required />)
    const inputElement = screen.getByRole('textbox', { hidden: false })
    expect(inputElement).toHaveAttribute('placeholder', 'Test Placeholder')
    expect(inputElement).toHaveAttribute('required')
  })
})
