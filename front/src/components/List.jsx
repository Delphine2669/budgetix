import "./List.css";
import PropTypes from "prop-types";
const TransactionList = ({ transactions }) => {
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
            {/* |<div className="li-type">{transaction.type}|</div>| */}
            <div className="li-date">{transaction.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
TransactionList.propTypes = {
  transactions: PropTypes.array,
};

export default TransactionList;
