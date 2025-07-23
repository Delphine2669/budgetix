import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

// import Budget from "../components/Budget";
import Header from "../components/Header";

export default function Connected() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      console.log("Fetched userId:", userId);
      if (!token || !userId) {
        console.warn("Missing token or userId");
        return;
      }
      const res = await fetch(
        `http://localhost:5000/users/${userId}/incomes-expenses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched userId:", userId);
      if (res.headers.get("content-type")?.includes("application/json")) {
        if (res.ok) {
          const result = await res.json();
          console.log("Raw fetched data:", result);
          console.log("userId:", userId);
          console.log("token:", token);
          setData(result);
          setIsAuthenticated(true);
        } else {
          const text = await res.text();
          console.error("Expected JSON, got:", text);
        }
      }
    };

    fetchUserData();
  }, []);

  // const [transactions, setTransactions] = useState([]);

  // const onAddTransaction = (transaction) => {
  //   setTransactions([...transactions, transaction]);
  //   console.log("Adding transaction:", transaction);
  // };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };
  return (
    <>
      <Header />
      <button onClick={handleLogout}>Logout</button>
      {/* <Budget onAddTransaction={onAddTransaction} />
       */}
      {/* <div>
        <h2>User Financial Data</h2>

        {data.length === 0 ? (
          <p>No data</p>
        ) : (
          data.map((entry, index) => (
            <div key={index}>
              <h3>{entry.username}</h3>
              {entry.expense_id && (
                <p>
                  <strong>Expense:</strong> {entry.expense_amount} on{" "}
                  {entry.expense_date} ({entry.expense_description})
                </p>
              )}
              {entry.income_id && (
                <p>
                  <strong>Income:</strong> {entry.income_amount} on{" "}
                  {entry.income_date} ({entry.income_description})
                </p>
              )}

              <hr />
            </div>
          ))
        )}
      </div> */}
      <h2>User Financial Data</h2>

      {!data || (!data.expenses?.length && !data.incomes?.length) ? (
        <p>No</p>
      ) : (
        <>
          <h3>Expenses</h3>
          {data.expenses.map((expense) => (
            <div key={expense.id}>
              <p>
                <strong>Expense:</strong> ${expense.amount} on{" "}
                {new Date(expense.date).toLocaleDateString()} (
                {expense.description})
              </p>
            </div>
          ))}

          <h3>Incomes</h3>
          {data.incomes.map((income) => (
            <div key={income.id}>
              <p>
                <strong>Income:</strong> ${income.amount} on{" "}
                {new Date(income.date).toLocaleDateString()} (
                {income.description})
              </p>
            </div>
          ))}
        </>
      )}
    </>
  );
}
