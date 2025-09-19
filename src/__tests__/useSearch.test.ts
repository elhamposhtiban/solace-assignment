import { renderHook } from '@testing-library/react';
import { useSearch } from '../hooks/useSearch';

const mockAdvocates = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    city: 'New York',
    degree: 'MD',
    specialties: ['Anxiety', 'Depression'],
    yearsOfExperience: 10,
    phoneNumber: 5551234567,
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    city: 'Los Angeles',
    degree: 'PhD',
    specialties: ['Trauma', 'PTSD'],
    yearsOfExperience: 8,
    phoneNumber: 5559876543,
  },
];

describe('useSearch', () => {
  it('should return all advocates when search term is empty', () => {
    const { result } = renderHook(() => useSearch(mockAdvocates, ''));
    
    expect(result.current.filteredAdvocates).toHaveLength(2);
    expect(result.current.filteredAdvocates).toEqual(mockAdvocates);
  });

  it('should filter advocates by first name', () => {
    const { result } = renderHook(() => useSearch(mockAdvocates, 'John'));
    
    expect(result.current.filteredAdvocates).toHaveLength(1);
    expect(result.current.filteredAdvocates[0].firstName).toBe('John');
  });

  it('should filter advocates by specialty', () => {
    const { result } = renderHook(() => useSearch(mockAdvocates, 'Anxiety'));
    
    expect(result.current.filteredAdvocates).toHaveLength(1);
    expect(result.current.filteredAdvocates[0].specialties).toContain('Anxiety');
  });

  it('should be case insensitive', () => {
    const { result } = renderHook(() => useSearch(mockAdvocates, 'jane'));
    
    expect(result.current.filteredAdvocates).toHaveLength(1);
    expect(result.current.filteredAdvocates[0].firstName).toBe('Jane');
  });

  it('should return empty array when no matches found', () => {
    const { result } = renderHook(() => useSearch(mockAdvocates, 'NonExistent'));
    
    expect(result.current.filteredAdvocates).toHaveLength(0);
  });
});
