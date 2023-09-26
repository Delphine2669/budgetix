import { useState } from "react";
import PropTypes from "prop-types";
import "./List.css";
import "./Form.css";

const BudgetDashboard ({ transactions, onAddTransaction })  {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const transaction = {
      amount: parseFloat(amount),
      description,
      type,
      date,
    };

    onAddTransaction(transaction);

    setDescription("");
    setAmount("");
    setType("income");
    setDate("");
    setShowForm(false);
  };

  return (
    <div>
      <h2>Transaction List</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index} className="li-transaction">
            <div
              className={`"li-desc ${
                transaction.type === "income" ? "income-text" : "expense-text"
              }`}
            >
              {transaction.description}
            </div>
            |
            <div
              className={`"li-amount ${
                transaction.type === "income" ? "income-text" : "expense-text"
              }`}
            >
              {transaction.amount}€
            </div>
            <div className="li-date">{transaction.date}</div>
          </li>
        ))}
      </ul>

      <div className="form-component-box">
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
      </div>
    </div>
  );
};

BudgetApp.propTypes = {
  transactions: PropTypes.array,
  onAddTransaction: PropTypes.func,
};

export default BudgetDashboard;
