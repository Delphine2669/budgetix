import "../App.css";

import { useState } from "react";
export default function Home() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("expense");
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
    console.log({ amount, description, type, date });
    const newTransaction = {
      id: Date.now(), // simple unique ID
      description,
      amount: parseFloat(amount),
      date,
      type,
    };

    setTransactions([newTransaction, ...transactions]);
    setAmount("");
    setDescription("");
    setType("expense");
    setDate("");
    setShowForm(false);
  };
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString();
  };
  const handleDeleteTransaction = (transactionId) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== transactionId
    );
    setTransactions(updatedTransactions);
  };
  const totalIncome = transactions
    ? transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((acc, transaction) => acc + transaction.amount, 0)
    : 0;

  const totalExpenses = transactions
    ? transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((acc, transaction) => acc + transaction.amount, 0)
    : 0;

  const balance = totalIncome - totalExpenses;
  return (
    <>
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
                <label htmlFor="description">Description:</label>
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
          <h3>transactions</h3>
          <table className="table-budget">
            <thead>
              <tr>
                <th className="td-amount">Amount</th>
                <th className="td-desct">Description</th>
                <th className="td-date">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="div-transaction">
                  <td
                    className={`"li-amount ${
                      transaction.type === "income"
                        ? "income-text"
                        : "expense-text"
                    }`}
                  >
                    {transaction.amount}€
                  </td>
                  <td
                    className={`"li-desc ${
                      transaction.type === "income"
                        ? "income-text"
                        : "expense-text"
                    }`}
                  >
                    {transaction.description}
                  </td>
                  <td className="li-date">{formatDate(transaction.date)}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleDeleteTransaction(transaction.id, transaction)
                      }
                      className="delete-button red-button"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
