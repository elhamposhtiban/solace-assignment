import React from "react";
import styles from "../app/page.module.css";

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Solace Advocates</h1>
      <p className={styles.subtitle}>
        Find the right mental health advocate for your needs
      </p>
    </div>
  );
};
