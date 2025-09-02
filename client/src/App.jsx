import { useEffect, useState } from "react";
import api from "./api";
import TransactionForm from "./components/TransactionForm.jsx"
import TransactionList from "./components/TransactionList.jsx";
import Summary from "./components/Summary.jsx";
import "./App.css";


export default function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api.get("/transactions").then((res) => setTransactions(res.data));
  }, []);

  const addTransaction = async (transaction) => {
    const res = await api.post("/transactions", transaction);
    setTransactions([...transactions, res.data]);
  };

  const deleteTransaction = async (id) => {
    await api.delete(`/transactions/${id}`);
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <h1>Budget Tracker</h1>
      <TransactionForm onAdd={addTransaction} />
      <Summary transactions={transactions} />
      <TransactionList transactions={transactions} onDelete={deleteTransaction} />
    </div>
  );
}
