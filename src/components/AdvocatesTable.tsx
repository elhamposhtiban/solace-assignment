import React from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { EmptyState } from "./EmptyState";
import styles from "../app/page.module.css";

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

interface AdvocatesTableProps {
  advocates: Advocate[];
  isLoading: boolean;
  searchTerm: string;
  onClearSearch: () => void;
}

export const AdvocatesTable: React.FC<AdvocatesTableProps> = ({
  advocates,
  isLoading,
  searchTerm,
  onClearSearch,
}) => {
  return (
    <div className={styles.tableContainer}>
      <table role="table" aria-label="Advocates table" className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.tableHeaderCell}>First Name</th>
            <th className={styles.tableHeaderCell}>Last Name</th>
            <th className={styles.tableHeaderCell}>City</th>
            <th className={styles.tableHeaderCell}>Degree</th>
            <th className={styles.tableHeaderCell}>Specialties</th>
            <th className={styles.tableHeaderCell}>Experience</th>
            <th className={styles.tableHeaderCell}>Phone</th>
          </tr>
        </thead>
        {isLoading ? (
          <LoadingSkeleton />
        ) : advocates.length === 0 && searchTerm ? (
          <EmptyState searchTerm={searchTerm} onReset={onClearSearch} />
        ) : (
          <tbody>
            {advocates.map((advocate, index) => (
              <tr
                key={advocate.id}
                className={styles.tableRow}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#edf2f7";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    index % 2 === 0 ? "white" : "#f8fafc";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <td className={styles.tableCellName}>{advocate.firstName}</td>
                <td className={styles.tableCellName}>{advocate.lastName}</td>
                <td className={styles.tableCell}>{advocate.city}</td>
                <td className={styles.tableCell}>
                  <span className={styles.degreeBadge}>{advocate.degree}</span>
                </td>
                <td className={styles.tableCellSpecialties}>
                  <div className={styles.specialtiesContainer}>
                    {advocate.specialties.map((s) => (
                      <span
                        key={`${advocate.id}-${s}`}
                        className={styles.specialtyTag}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className={styles.tableCellExperience}>
                  <span className={styles.experienceBadge}>
                    {advocate.yearsOfExperience} years
                  </span>
                </td>
                <td className={styles.tableCellPhone}>
                  {advocate.phoneNumber}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};
