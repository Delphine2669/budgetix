import { useState } from "react";
import "../App.css";

import Budget from "../components/Budget";

function Home() {
  const [transactions, setTransactions] = useState([]);

  const onAddTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
    console.log("Adding transaction:", transaction);
  };

  return (
    <>
      <Budget onAddTransaction={onAddTransaction} />
    </>
  );
}

export default Home;
