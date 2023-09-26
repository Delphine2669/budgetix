import { useState } from "react";

import PropTypes from "prop-types";
import "./Form.css";
const BudgetForm = ({ onAddTransaction }) => {
  const [description, setDescription] = useState("");

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  // const [category, setCategory] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const transaction = {
      amount: parseFloat(amount),
      description,
      type,
      date,
      //   category,
    };

    // Pass the transaction object to the parent component
    onAddTransaction(transaction);

    // Clear form fields after submission
    setDescription("");
    setAmount("");
    setType("income");
    setDate("");
    // setCategory("");
    setShowForm(false);
  };

  return (
    <div className="form-component-box">
      <button
        className={`"adding-button ${showForm ? "red-button" : "green-button"}`}
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
            {/* <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      /> */}

            <button type="submit" className="button-submit">
              Add
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
BudgetForm.propTypes = {
  onAddTransaction: PropTypes.func,
};
export default BudgetForm;
