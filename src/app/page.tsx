"use client";

import {
  useEffect,
  useState,
  lazy,
  Suspense,
  useMemo,
  useCallback,
} from "react";
import { useSearch } from "../hooks/useSearch";
import { useDebounce } from "../hooks/useDebounce";
import { Header } from "../components/Header";
import { SearchSection } from "../components/SearchSection";
import { AdvocatesTable } from "../components/AdvocatesTable";
import { ErrorState } from "../components/ErrorState";
import styles from "./page.module.css";

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

const LoadingComponent = lazy(() =>
  Promise.resolve({
    default: () => (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Loading advocates...</p>
      </div>
    ),
  })
);

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchInput, 300);

  const { searchTerm, filteredAdvocates, resetSearch } = useSearch(
    advocates,
    debouncedSearchTerm
  );

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/advocates");

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `HTTP error! status: ${response.status}`
          );
        }

        const jsonResponse = await response.json();
        setAdvocates(jsonResponse.data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch advocates"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdvocates();
  }, []);

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchInput(value);

      const searchTermElement = document.getElementById("search-term");
      if (searchTermElement) {
        searchTermElement.innerHTML = value;
      }
    },
    []
  );

  useEffect(() => {}, [debouncedSearchTerm]);

  const searchResultsCount = useMemo(
    () => filteredAdvocates.length,
    [filteredAdvocates]
  );

  const retryFetch = async () => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await fetch("/api/advocates");

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const jsonResponse = await response.json();
      setAdvocates(jsonResponse.data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch advocates"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <ErrorState error={error} onRetry={retryFetch} />;
  }

  return (
    <main className={styles.main}>
      <Header />

      <SearchSection
        searchInput={searchInput}
        onSearchChange={handleSearchInputChange}
        onClearSearch={() => {
          setSearchInput("");
          resetSearch();
        }}
        searchTerm={searchTerm}
        searchResultsCount={searchResultsCount}
      />

      <AdvocatesTable
        advocates={filteredAdvocates}
        isLoading={isLoading}
        searchTerm={searchTerm}
        onClearSearch={() => setSearchInput("")}
      />
    </main>
  );
}
