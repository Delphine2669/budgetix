import { useState } from "react";
import PropTypes from "prop-types";
import "./BudgetDashboard.css";

function BudgetDashboard({ transactions, onAddTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState("");
  const [showForm, setShowForm] = useState(false);

  function getBalanceColorClass(balance) {
    if (balance > 50) {
      return "green-balance";
    } else if (balance >= 0) {
      return "orange-balance";
    } else {
      return "red-balance";
    }
  }

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
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div>
      <div className="balance-container">
        <h3>Balance:</h3>
        <div className="balance-box">
          <h2 className={`h2-balance ${getBalanceColorClass(balance)}`}>
            {balance} €
          </h2>
        </div>
      </div>
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
      <h3>Transaction List</h3>
      <ul>
        {transactions &&
          transactions.map((transaction, index) => (
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
    </div>
  );
}

BudgetDashboard.propTypes = {
  transactions: PropTypes.array,
  onAddTransaction: PropTypes.func,
};

export default BudgetDashboard;
