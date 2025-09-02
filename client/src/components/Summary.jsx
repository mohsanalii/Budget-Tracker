export default function Summary({ transactions }) {
const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
const balance = income - expense;


const fmt = (n) => n.toLocaleString(undefined, { style: 'currency', currency: 'USD' });


return (
<div className="grid">
<div className="card stat">
<h3>Total Income</h3>
<p className="big green">{fmt(income)}</p>
</div>
<div className="card stat">
<h3>Total Expenses</h3>
<p className="big red">{fmt(expense)}</p>
</div>
<div className="card stat">
<h3>Balance</h3>
<p className="big">{fmt(balance)}</p>
</div>
</div>
);
}