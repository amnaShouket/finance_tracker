import { transactions } from "../data/mockData";
import { useFinance } from "../hooks/FinanceContext";
import { getBudgetStatuses } from "../utils/budgetInsights";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);

export default function InputsPage() {
  const {
    income,
    expenses,
    savingsGoal,
    budgets,
    setIncome,
    setExpenses,
    setSavingsGoal,
    updateBudget,
  } = useFinance();

  const budgetWarnings = getBudgetStatuses(budgets, transactions).filter(
    (budget) => budget.status !== "ok",
  );

  return (
    <div>
      <h2 style={{ marginBottom: "24px" }}>Inputs</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="income"
              style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}
            >
              Monthly Income
            </label>
            <input
              id="income"
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="expenses"
              style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}
            >
              Monthly Expenses
            </label>
            <input
              id="expenses"
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="savings"
              style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}
            >
              Monthly Savings
            </label>
            <input
              id="savings"
              type="number"
              value={savingsGoal}
              onChange={(e) => setSavingsGoal(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
          </div>

          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              background: "#f8fafc",
              borderRadius: "6px",
            }}
          >
            <p style={{ margin: "0 0 8px 0" }}>
              <strong>Summary:</strong> {formatCurrency(income)}
            </p>
            <p style={{ margin: "0 0 8px 0" }}>
              <strong>Expenses:</strong> {formatCurrency(expenses)}
            </p>
            <p style={{ margin: "0" }}>
              <strong>Savings Goal:</strong> {formatCurrency(savingsGoal)}
            </p>
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <h3 style={{ margin: 0 }}>Monthly Category Budgets</h3>
            <span style={{ color: "#64748b", fontSize: "14px" }}>
              Alerts at 85%+
            </span>
          </div>

          <div style={{ display: "grid", gap: "14px" }}>
            {budgets.map((budget) => (
              <div key={budget.category}>
                <label
                  htmlFor={`budget-${budget.category}`}
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {budget.category}
                </label>
                <input
                  id={`budget-${budget.category}`}
                  type="number"
                  value={budget.monthlyLimit}
                  onChange={(e) =>
                    updateBudget(budget.category, Number(e.target.value))
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                  }}
                />
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              borderRadius: "8px",
              background: budgetWarnings.length > 0 ? "#fff7ed" : "#f0fdf4",
            }}
          >
            <h4 style={{ margin: "0 0 10px" }}>Budget Alerts</h4>
            {budgetWarnings.length > 0 ? (
              <ul style={{ margin: 0, paddingLeft: "18px" }}>
                {budgetWarnings.map((budget) => (
                  <li key={budget.category} style={{ marginBottom: "8px" }}>
                    <strong style={{ textTransform: "capitalize" }}>
                      {budget.category}
                    </strong>{" "}
                    is at {budget.progress.toFixed(0)}% of its limit:{" "}
                    {formatCurrency(budget.spent)} of{" "}
                    {formatCurrency(budget.monthlyLimit)}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ margin: 0 }}>All tracked categories are comfortably on budget.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
