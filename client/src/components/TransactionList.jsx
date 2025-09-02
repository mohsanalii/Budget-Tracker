export default function TransactionList({ transactions, onDelete }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="card">
        <p>No transactions yet. Add your first one!</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Transactions</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.category}</td>
                <td
                  className={t.type === "income" ? "pill income" : "pill expense"}
                >
                  {t.type}
                </td>
                <td>
                  {t.amount.toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td>{new Date(t.date).toLocaleString()}</td>
                <td>
                  <button className="danger" onClick={() => onDelete(t.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
