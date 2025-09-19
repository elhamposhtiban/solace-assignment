import { useState, useMemo, useCallback } from "react";

interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

export const useSearch = (advocates: Advocate[], debouncedSearchTerm: string) => {
  const filteredAdvocates = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return advocates;
    }

    const lowerSearchTerm = debouncedSearchTerm.toLowerCase();
    return advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(lowerSearchTerm) ||
        advocate.lastName.toLowerCase().includes(lowerSearchTerm) ||
        advocate.city.toLowerCase().includes(lowerSearchTerm) ||
        advocate.degree.toLowerCase().includes(lowerSearchTerm) ||
        advocate.specialties.some((specialty) =>
          specialty.toLowerCase().includes(lowerSearchTerm)
        ) ||
        advocate.yearsOfExperience.toString().includes(debouncedSearchTerm)
      );
    });
  }, [advocates, debouncedSearchTerm]);

  const resetSearch = useCallback(() => {
  }, []);

  return {
    searchTerm: debouncedSearchTerm,
    filteredAdvocates,
    resetSearch,
  };
};
