import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function CategoryChart({ transactions }) {
const expenses = transactions.filter(t => t.type === 'expense');
const byCat = expenses.reduce((acc, t) => {
acc[t.category] = (acc[t.category] || 0) + t.amount;
return acc;
}, {});


const data = Object.entries(byCat).map(([name, value]) => ({ name, value }));


if (!data.length) return <div className="card"><p>No expense data for chart yet.</p></div>;

const COLORS = new Array(data.length).fill(null);


return (
<div className="card">
<h2>Expenses by Category</h2>
<div style={{ width: '100%', height: 320 }}>
<ResponsiveContainer>
<PieChart>
<Pie data={data} dataKey="value" nameKey="name" outerRadius={110} label>
{data.map((_, i) => (<Cell key={i} />))}
</Pie>
<Tooltip />
<Legend />
</PieChart>
</ResponsiveContainer>
</div>
</div>
);
}