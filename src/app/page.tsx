"use client";

import { useEffect, useState, lazy, Suspense } from "react";

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
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        setFilteredAdvocates(jsonResponse.data);
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    const searchTermElement = document.getElementById("search-term");
    if (searchTermElement) {
      searchTermElement.innerHTML = searchTerm;
    }
    const filteredAdvocates = advocates.filter((advocate) => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      return (
        advocate.firstName.toLowerCase().includes(lowerSearchTerm) ||
        advocate.lastName.toLowerCase().includes(lowerSearchTerm) ||
        advocate.city.toLowerCase().includes(lowerSearchTerm) ||
        advocate.degree.toLowerCase().includes(lowerSearchTerm) ||
        advocate.specialties.some((specialty) =>
          specialty.toLowerCase().includes(lowerSearchTerm)
        ) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    setFilteredAdvocates(advocates);
  };

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
      setFilteredAdvocates(jsonResponse.data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch advocates"
      );
    } finally {
      setIsLoading(false);
    }
  };

  isLoading && (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LoadingComponent />
      </Suspense>
    </main>
  );

  error && (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          padding: "20px",
          border: "1px solid #ff6b6b",
          borderRadius: "8px",
          backgroundColor: "#ffe0e0",
        }}
      >
        <h3 style={{ color: "#d63031", margin: "0 0 10px 0" }}>
          Error Loading Advocates
        </h3>
        <p style={{ color: "#636e72", margin: "0 0 20px 0" }}>{error}</p>
        <button
          onClick={retryFetch}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0984e3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </div>
    </main>
  );

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.id}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div key={`${advocate.id}-${s}`}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
