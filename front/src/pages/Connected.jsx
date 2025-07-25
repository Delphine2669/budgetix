import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../components/budgetDashboard.css";
import Header from "../components/Header";

export default function Connected() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState("€");
  const [username, setUsername] = useState("");
  // const [showForm, setShowForm] = useState(false);
  // const [description, setDescription] = useState("");
  // const [amount, setAmount] = useState("");
  // const [type, setType] = useState("expense");
  // const [date, setDate] = useState("");

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
        {username ? `${username}'s Recent transactions` : "User Financial Data"}
      </h2>
      {/* <div className="form-component-box">
        <button
          className={`"adding-button ${
            showForm ? "red-button" : "green-button"
          }`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "x" : "+"}
        </button>
        {showForm && (
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <label htmlFor="Description">Description:</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <label htmlFor="type">Type:</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <button type="submit" className="button-submit">
                Add
              </button>
            </div>
          </form>
        )}
      </div> */}
      {!data.length ? (
        <p>No data</p>
      ) : (
        <div>
          <div className="div-budget-table">
            <div>
              <label htmlFor="currency">Currency: </label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="$">$ USD</option>
                <option value="€">€ EUR</option>
              </select>
            </div>
            <table className="table-budget">
              <thead>
                <tr>
                  <th className="td-amount">Amount</th>
                  <th className="td-desct">Description</th>
                  <th className="td-date">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry, index) => (
                  <tr
                    key={`${entry.type}-${entry.id}`}
                    className={
                      entry.type === "income" ? "income-text" : "expense-text"
                    }
                  >
                    <td className="td-amount">
                      {entry.amount} {currency}
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
