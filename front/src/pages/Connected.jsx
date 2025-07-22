import { useState } from "react";
import "../App.css";

import Budget from "../components/Budget";
import Header from "../components/Header";

function Connected() {
  const [transactions, setTransactions] = useState([]);

  const onAddTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
    console.log("Adding transaction:", transaction);
  };

  return (
    <>
      <Header />
      <Budget onAddTransaction={onAddTransaction} />
    </>
  );
}

export default Connected;
