import { useState } from "react";
import Form from "../components/Form";
import TransactionList from "../components/List";
import "../App.css";
function Home() {
  const [transactions, setTransactions] = useState([]);
  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <>
      <h1 className="title">Budget App</h1>
      <Form onAddTransaction={handleAddTransaction} />
      <TransactionList transactions={transactions} />
    </>
  );
}

export default Home;
