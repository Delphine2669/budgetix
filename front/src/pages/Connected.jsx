import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../components/budgetDashboard.css";
import Header from "../components/Header";

export default function Connected() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");

      if (storedUsername) setUsername(storedUsername);
      const userId = localStorage.getItem("userId");
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
      if (res.headers.get("content-type")?.includes("application/json")) {
        if (res.ok) {
          const result = await res.json();
          console.log("dataResult:", result);
          const combined = [
            ...result.expenses.map((e) => ({ ...e, type: "expense" })),
            ...result.incomes.map((i) => ({ ...i, type: "income" })),
          ];

          const sorted = combined.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setData(sorted);
          setIsAuthenticated(true);
        } else {
          const text = await res.text();
          console.error("Fetch error:", text);
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
    <div>
      <Header />
      <button onClick={handleLogout}>Logout</button>
      <h2>
        {username ? `${username}'s Financial Data` : "User Financial Data"}
      </h2>
      {!data.length ? (
        <p>No data</p>
      ) : (
        <div>
          <h3>Recent Transactions</h3>
          <div className="div-budget-table">
            <table className="table-budget">
              <thead>
                <tr>
                  <th className="td-amount">Amount</th>
                  <th className="td-desct">Description</th>
                  <th className="td-date">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry) => (
                  <tr
                    key={`${entry.type}-${entry.id}`}
                    className={
                      entry.type === "income" ? "income-row" : "expense-row"
                    }
                  >
                    <td className="td-amount">
                      {entry.type === "income" ? "+" : "-"}${entry.amount}
                    </td>
                    <td className="td-desc">{entry.description}</td>
                    <td className="td-date">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
