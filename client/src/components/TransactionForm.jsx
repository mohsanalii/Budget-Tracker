import { useState } from "react";
import axios from "axios";
axios.get("http://localhost:4000/api/transactions");


export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    type: "expense",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await onAdd(form);
    setForm({ title: "", amount: "", category: "Other", type: "expense" });
    setError("");
  } catch (err) {
    setError("Failed to add transaction");
  }
};


  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <label>
        Title
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Grocery Shopping"
          required
        />
      </label>

      <label>
        Amount
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="50.00"
          required
        />
      </label>

      <label>
        Category
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option>Food</option>
          <option>Rent</option>
          <option>Shopping</option>
          <option>Transport</option>
          <option>Health</option>
          <option>Entertainment</option>
          <option>Income</option>
          <option>Other</option>
        </select>
      </label>

      <fieldset>
        <legend>Type</legend>
        <label>
          <input
            type="radio"
            name="type"
            value="income"
            checked={form.type === "income"}
            onChange={handleChange}
          />
          Income
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="expense"
            checked={form.type === "expense"}
            onChange={handleChange}
          />
          Expense
        </label>
      </fieldset>

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Adding…" : "Add"}
      </button>
    </form>
  );
}
