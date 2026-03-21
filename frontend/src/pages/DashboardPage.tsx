import { monthlySummary, subscriptions, transactions } from "../data/mockData";

export default function DashboardPage() {
  return (
    <div>
      <h2 style={{ marginBottom: "24px" }}>Dashboard</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
          }}
        >
          <h3>Income</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
            £{monthlySummary.income.toFixed(2)}
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
          }}
        >
          <h3>Expenses</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
            £{monthlySummary.expenses.toFixed(2)}
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
          }}
        >
          <h3>Balance</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
            £{monthlySummary.balance.toFixed(2)}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
          }}
        >
          <h3 style={{ marginBottom: "16px" }}>Transactions</h3>
          <ul style={{ paddingLeft: "20px" }}>
            {transactions.map((transaction) => (
              <li key={transaction.id} style={{ marginBottom: "10px" }}>
                <strong>{transaction.title}</strong> — £{transaction.amount} —{" "}
                {transaction.type} — {transaction.category}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
          }}
        >
          <h3 style={{ marginBottom: "16px" }}>Subscriptions</h3>
          <ul style={{ paddingLeft: "20px" }}>
            {subscriptions.map((subscription) => (
              <li key={subscription.id} style={{ marginBottom: "12px" }}>
                <strong>{subscription.name}</strong> — £
                {subscription.monthlyCost.toFixed(2)} — renews on{" "}
                {subscription.renewalDate}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}