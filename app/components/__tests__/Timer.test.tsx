import { render, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Timer from '../Timer';

describe('Timer Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders initial time correctly', () => {
    const { getByText } = render(
      <Timer duration={65} onTimeUp={() => {}} />
    );
    
    expect(getByText('01:05')).toBeInTheDocument();
  });

  it('updates time every second', () => {
    const { getByText } = render(
      <Timer duration={65} onTimeUp={() => {}} />
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(getByText('01:04')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(getByText('01:03')).toBeInTheDocument();
  });

  it('calls onTimeUp when time reaches zero', () => {
    const onTimeUp = vi.fn();
    render(<Timer duration={2} onTimeUp={onTimeUp} />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(onTimeUp).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Timer duration={60} onTimeUp={() => {}} className="test-class" />
    );
    
    expect(container.firstChild).toHaveClass('test-class');
  });
});