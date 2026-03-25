import SubscriptionList from "../components/SubscripitonList";
import TransactionList from "../components/TransactionList";
import { subscriptions, transactions } from "../data/mockData";
import { useFinance } from "../hooks/FinanceContext";
import { getBudgetStatuses } from "../utils/budgetInsights";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
};

export default function DashboardPage() {
  const { income, expenses, savingsGoal, budgets } = useFinance();
  const balance = income - expenses;
  const budgetWarnings = getBudgetStatuses(budgets, transactions).filter(
    (budget) => budget.status !== "ok",
  );

  return (
    <div>
      <h2 style={{ marginBottom: "24px" }}>Dashboard</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div style={cardStyle}>
          <h3>Income</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
            {formatCurrency(income)}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Expenses</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
            {formatCurrency(expenses)}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Balance</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
            {formatCurrency(balance)}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Savings Goal</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
            {formatCurrency(savingsGoal)}
          </p>
        </div>
      </div>

      <div
        style={{
          ...cardStyle,
          marginBottom: "24px",
          background: budgetWarnings.length > 0 ? "#fff7ed" : "#f0fdf4",
        }}
      >
        <h3 style={{ marginBottom: "12px" }}>Budget Warnings</h3>
        {budgetWarnings.length > 0 ? (
          <ul style={{ margin: 0, paddingLeft: "18px" }}>
            {budgetWarnings.map((budget) => (
              <li key={budget.category} style={{ marginBottom: "8px" }}>
                <strong style={{ textTransform: "capitalize" }}>
                  {budget.category}
                </strong>{" "}
                has reached {budget.progress.toFixed(0)}% of its monthly budget:{" "}
                {formatCurrency(budget.spent)} of{" "}
                {formatCurrency(budget.monthlyLimit)}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ margin: 0 }}>
            None of your tracked categories are close to their budget limits yet.
          </p>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3 style={{ marginBottom: "16px" }}>Transactions</h3>
          <TransactionList transactions={transactions} />
        </div>

        <div style={cardStyle}>
          <h3 style={{ marginBottom: "16px" }}>Subscriptions</h3>
          <SubscriptionList subscriptions={subscriptions} />
        </div>
      </div>
    </div>
  );
}
