import React from "react";
import styles from "../app/page.module.css";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <main className={styles.errorContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Solace Advocates</h1>
        <p className={styles.subtitle}>
          Find the right mental health advocate for your needs
        </p>
      </div>
      <div className={styles.errorCard}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3 className={styles.errorTitle}>Error Loading Advocates</h3>
        <p className={styles.errorMessage}>{error}</p>
        <button onClick={onRetry} className={styles.retryButton}>
          Try Again
        </button>
      </div>
    </main>
  );
};
