import { useState, useEffect } from "react";

export default function B2() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const baseURL =
          import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5001";

        const incomesResponse = await fetch(`${baseURL}/incomes`);
        const expensesResponse = await fetch(`${baseURL}/expenses`);

        if (!incomesResponse.ok) {
          throw new Error("Failed to fetch income data");
        }
        if (!expensesResponse.ok) {
          throw new Error("Failed to fetch expense data");
        }

        // Use .json() instead of .text() for parsing JSON data
        const incomesData = await incomesResponse.json(); // Automatically parses JSON
        const expensesData = await expensesResponse.json(); // Automatically parses JSON

        console.log("Incomes Data:", incomesData);
        console.log("Expenses Data:", expensesData);

        if (Array.isArray(incomesData)) {
          setIncomes(incomesData);
        } else {
          console.error("Incomes data is not an array:", incomesData);
        }

        if (Array.isArray(expensesData)) {
          setExpenses(expensesData);
        } else {
          console.error("Expenses data is not an array:", expensesData);
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Unknown error occurred"
        );
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Incomes</h2>
      <pre>{JSON.stringify(incomes, null, 2)}</pre>

      <h2>Expenses</h2>
      <pre>{JSON.stringify(expenses, null, 2)}</pre>
    </div>
  );
}
