import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express(); 
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let transactions = [];

const isValidType = (t) => t === 'income' || t === 'expense';

app.get('/api/transactions', (req, res) => {
  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(sorted);
});

app.post('/api/transactions', (req, res) => {
  const { title, amount, category, type } = req.body || {};

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required.' });
  }
  const numAmount = Number(amount);
  if (!Number.isFinite(numAmount) || numAmount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number.' });
  }
  if (!isValidType(type)) {
    return res.status(400).json({ error: "Type must be 'income' or 'expense'." });
  }
  if (!category || !category.trim()) {
    return res.status(400).json({ error: 'Category is required.' });
  }

  const newTx = {
    id: uuidv4(),
    title: title.trim(),
    amount: numAmount,
    category: category.trim(),
    type,
    date: new Date().toISOString(),
  };

  transactions.push(newTx);
  return res.status(201).json(newTx);
});

app.delete('/api/transactions/:id', (req, res) => {
  const { id } = req.params;
  const idx = transactions.findIndex((t) => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Transaction not found.' });
  const [removed] = transactions.splice(idx, 1);
  return res.json({ ok: true, removed });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
