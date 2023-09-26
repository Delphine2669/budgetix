import { useState } from "react";
import Form from "../components/Form";
import TransactionList from "../components/List";
import "../App.css";
import Login from "./Login";
import Register from "./register";

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
      <Login />
      <Register />
    </>
  );
}

export default Home;
