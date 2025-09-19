import React from "react";

const SkeletonRow = () => (
  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
    <td style={{ padding: "16px 20px" }}>
      <div
        style={{
          height: "20px",
          backgroundColor: "#e2e8f0",
          borderRadius: "4px",
          animation: "pulse 1.5s ease-in-out infinite",
          width: "80%",
        }}
      />
    </td>
    <td style={{ padding: "16px 20px" }}>
      <div
        style={{
          height: "20px",
          backgroundColor: "#e2e8f0",
          borderRadius: "4px",
          animation: "pulse 1.5s ease-in-out infinite",
          width: "70%",
        }}
      />
    </td>
    <td style={{ padding: "16px 20px" }}>
      <div
        style={{
          height: "20px",
          backgroundColor: "#e2e8f0",
          borderRadius: "4px",
          animation: "pulse 1.5s ease-in-out infinite",
          width: "60%",
        }}
      />
    </td>
    <td style={{ padding: "16px 20px" }}>
      <div
        style={{
          height: "24px",
          backgroundColor: "#e2e8f0",
          borderRadius: "4px",
          animation: "pulse 1.5s ease-in-out infinite",
          width: "40px",
        }}
      />
    </td>
    <td style={{ padding: "16px 20px" }}>
      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
        <div
          style={{
            height: "20px",
            backgroundColor: "#e2e8f0",
            borderRadius: "12px",
            animation: "pulse 1.5s ease-in-out infinite",
            width: "60px",
          }}
        />
        <div
          style={{
            height: "20px",
            backgroundColor: "#e2e8f0",
            borderRadius: "12px",
            animation: "pulse 1.5s ease-in-out infinite",
            width: "80px",
          }}
        />
        <div
          style={{
            height: "20px",
            backgroundColor: "#e2e8f0",
            borderRadius: "12px",
            animation: "pulse 1.5s ease-in-out infinite",
            width: "70px",
          }}
        />
      </div>
    </td>
    <td style={{ padding: "16px 20px", textAlign: "center" }}>
      <div
        style={{
          height: "24px",
          backgroundColor: "#e2e8f0",
          borderRadius: "4px",
          animation: "pulse 1.5s ease-in-out infinite",
          width: "60px",
          margin: "0 auto",
        }}
      />
    </td>
    <td style={{ padding: "16px 20px" }}>
      <div
        style={{
          height: "20px",
          backgroundColor: "#e2e8f0",
          borderRadius: "4px",
          animation: "pulse 1.5s ease-in-out infinite",
          width: "120px",
        }}
      />
    </td>
  </tr>
);

export const LoadingSkeleton = () => (
  <>
    <style>
      {`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}
    </style>
    <tbody>
      {Array.from({ length: 5 }).map((_, index) => (
        <SkeletonRow key={index} />
      ))}
    </tbody>
  </>
);
