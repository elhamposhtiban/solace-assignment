import React from "react";
import styles from "../app/page.module.css";

interface SearchSectionProps {
  searchInput: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  searchTerm: string;
  searchResultsCount: number;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  searchInput,
  onSearchChange,
  onClearSearch,
  searchTerm,
  searchResultsCount,
}) => {
  return (
    <div className={styles.searchContainer}>
      <label htmlFor="search-input" className={styles.searchLabel}>
        Search Advocates
      </label>
      <div className={styles.searchInputContainer}>
        <input
          id="search-input"
          type="text"
          placeholder="Search by name, city, degree, or specialty..."
          value={searchInput}
          onChange={onSearchChange}
          className={styles.searchInput}
          onFocus={(e) => {
            e.target.style.borderColor = "#667eea";
            e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e2e8f0";
            e.target.style.boxShadow = "none";
          }}
          aria-describedby="search-results-count"
        />
        <button
          onClick={onClearSearch}
          aria-label="Clear search"
          className={styles.clearButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#5a67d8";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#667eea";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Clear Search
        </button>
      </div>
      <div className={styles.searchResultsInfo}>
        <div id="search-results-count" className={styles.resultsCount}>
          {searchResultsCount} result{searchResultsCount !== 1 ? "s" : ""} found
        </div>
        {searchTerm && (
          <div className={styles.searchTermDisplay}>
            Searching for:{" "}
            <span
              id="search-term"
              aria-live="polite"
              className={styles.searchTerm}
            >
              {searchTerm}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
