// import { useState } from "react";

// import Form from "../components/Form";
// import TransactionList from "../components/List";
import "../App.css";
// import Login from "./Login";
// import Register from "./register";
import Budget from "../components/Budget";

function Home() {
  // const [transactions, setTransactions] = useState([]);
  // const handleAddTransaction = (newTransaction) => {
  //   setTransactions([...transactions, newTransaction]);
  // };

  return (
    <>
      <Budget />

      {/* <Form onAddTransaction={handleAddTransaction} />
      <TransactionList transactions={transactions} /> */}
    </>
  );
}

export default Home;
