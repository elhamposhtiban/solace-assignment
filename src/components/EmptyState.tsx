import React from "react";

interface EmptyStateProps {
  searchTerm: string;
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  searchTerm,
  onReset,
}) => (
  <tbody>
    <tr>
      <td colSpan={7} style={{ textAlign: "center", padding: "60px 40px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              opacity: "0.6",
            }}
          >
            🔍
          </div>
          <h3
            style={{
              margin: 0,
              color: "#2d3748",
              fontSize: "1.5rem",
              fontWeight: "600",
            }}
          >
            No advocates found
          </h3>
          <p
            style={{
              margin: 0,
              color: "#718096",
              fontSize: "1rem",
              maxWidth: "400px",
              lineHeight: "1.5",
            }}
          >
            No results found for <strong>"{searchTerm}"</strong>. Try a
            different search term or check your spelling.
          </p>
          <button
            onClick={onReset}
            style={{
              padding: "12px 24px",
              backgroundColor: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 4px rgba(102, 126, 234, 0.2)",
            }}
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
      </td>
    </tr>
  </tbody>
);
