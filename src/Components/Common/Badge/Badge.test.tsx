import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';
import type { BadgeProps } from './Badge.types';

describe('Badge Component', () => {
  const renderBadge = (props: Partial<BadgeProps> = {}) => {
    const defaultProps: BadgeProps = {
      children: 'Test Badge',
      variant: 'default',
    };
    return render(<Badge {...defaultProps} {...props} />);
  };

  it('renders with default props', () => {
    renderBadge();
    const badgeElement = screen.getByText('Test Badge');
    expect(badgeElement).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    renderBadge({ children: 'Hello World' });
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders correctly for the primary variant', () => {
    renderBadge({ variant: 'primary' });
    const badgeElement = screen.getByText('Test Badge');
    expect(badgeElement).toBeInTheDocument();
  });

  it('renders correctly for the secondary variant', () => {
    renderBadge({ variant: 'secondary' });
    const badgeElement = screen.getByText('Test Badge');
    expect(badgeElement).toBeInTheDocument();
  });

  it('renders correctly for the success variant', () => {
    renderBadge({ variant: 'success' });
    const badgeElement = screen.getByText('Test Badge');
    expect(badgeElement).toBeInTheDocument();
  });

  it('renders correctly for the warning variant', () => {
    renderBadge({ variant: 'warning' });
    const badgeElement = screen.getByText('Test Badge');
    expect(badgeElement).toBeInTheDocument();
  });

  it('renders correctly for the danger variant', () => {
    renderBadge({ variant: 'danger' });
    const badgeElement = screen.getByText('Test Badge');
    expect(badgeElement).toBeInTheDocument();
  });
});
