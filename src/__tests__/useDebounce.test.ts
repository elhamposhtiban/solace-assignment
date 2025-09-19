import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../hooks/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 100));
    
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current).toBe('initial');

    // Change value
    rerender({ value: 'updated' });
    expect(result.current).toBe('initial'); // Should still be old value

    // Fast-forward time by 50ms
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current).toBe('initial'); // Should still be old value

    // Fast-forward time by another 50ms (total 100ms)
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current).toBe('updated'); // Now should be updated
  });

  it('should reset timer on new value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      { initialProps: { value: 'initial' } }
    );

    // Change value
    rerender({ value: 'first' });
    
    // Fast-forward 50ms
    act(() => {
      jest.advanceTimersByTime(50);
    });
    
    // Change value again before debounce completes
    rerender({ value: 'second' });
    
    // Fast-forward 50ms (total 100ms from first change, but only 50ms from second)
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current).toBe('initial'); // Should still be initial

    // Fast-forward another 50ms (total 100ms from second change)
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current).toBe('second'); // Now should be second value
  });
});
