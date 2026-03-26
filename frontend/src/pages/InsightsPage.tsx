import { subscriptions, transactions } from "../data/mockData";
import { useFinance } from "../hooks/FinanceContext";
import type { Category, Transaction } from "../types/finance";
import { getBudgetStatuses, getLatestMonthTransactions } from "../utils/budgetInsights";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);

const formatMonth = (value: string) =>
  new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}-01`));

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
};

const buildMonthlyTrendData = (allTransactions: Transaction[]) => {
  const monthlyMap = new Map<
    string,
    { month: string; income: number; expenses: number; balance: number }
  >();

  allTransactions.forEach((transaction) => {
    const monthKey = transaction.date.slice(0, 7);
    const monthEntry = monthlyMap.get(monthKey) ?? {
      month: monthKey,
      income: 0,
      expenses: 0,
      balance: 0,
    };

    if (transaction.type === "income") {
      monthEntry.income += transaction.amount;
    } else {
      monthEntry.expenses += transaction.amount;
    }

    monthEntry.balance = monthEntry.income - monthEntry.expenses;
    monthlyMap.set(monthKey, monthEntry);
  });

  return [...monthlyMap.values()]
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((entry) => ({
      ...entry,
      label: formatMonth(entry.month),
    }));
};

const buildCategorySpendingData = (monthlyTransactions: Transaction[]) => {
  const categoryTotals = new Map<Category, number>();

  monthlyTransactions
    .filter((transaction) => transaction.type === "expense")
    .forEach((transaction) => {
      categoryTotals.set(
        transaction.category,
        (categoryTotals.get(transaction.category) ?? 0) + transaction.amount,
      );
    });

  return [...categoryTotals.entries()]
    .map(([category, value]) => ({
      category,
      value,
    }))
    .sort((a, b) => b.value - a.value);
};

export default function InsightsPage() {
  const { income, expenses, savingsGoal, budgets } = useFinance();
  const balance = income - expenses;
  const savingsProgress =
    savingsGoal === 0 ? 0 : Math.min((balance / savingsGoal) * 100, 100);
  const savingsRate = income === 0 ? 0 : (balance / income) * 100;

  const monthlyTrendData = buildMonthlyTrendData(transactions);
  const latestMonthTransactions = getLatestMonthTransactions(transactions);
  const categorySpendingData = buildCategorySpendingData(latestMonthTransactions);
  const budgetProgress = getBudgetStatuses(budgets, transactions);
  const budgetWarnings = budgetProgress.filter((budget) => budget.status !== "ok");

  const latestMonthExpenses = latestMonthTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const subscriptionSpend = latestMonthTransactions
    .filter((transaction) => transaction.category === "subscriptions")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const highestSpendingCategory = categorySpendingData[0];
  const subscriptionsShare =
    latestMonthExpenses === 0 ? 0 : (subscriptionSpend / latestMonthExpenses) * 100;
  const latestMonthLabel =
    monthlyTrendData[monthlyTrendData.length - 1]?.label ?? "this month";

  return (
    <div>
      <h2 style={{ marginBottom: "24px" }}>Insights</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div style={cardStyle}>
          <h3>Current Balance</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
            {formatCurrency(balance)}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Savings Rate</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
            {savingsRate.toFixed(1)}%
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Top Spend Category</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
            {highestSpendingCategory
              ? highestSpendingCategory.category
              : "No expense data"}
          </p>
          {highestSpendingCategory ? (
            <p style={{ margin: "8px 0 0" }}>
              {formatCurrency(highestSpendingCategory.value)} in {latestMonthLabel}
            </p>
          ) : null}
        </div>

        <div style={cardStyle}>
          <h3>Subscriptions Share</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
            {subscriptionsShare.toFixed(1)}%
          </p>
          <p style={{ margin: "8px 0 0" }}>
            {subscriptions.length} active subscriptions tracked
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div style={cardStyle}>
          <h3>Savings Goal Progress</h3>
          <div
            style={{
              width: "100%",
              height: "20px",
              background: "#e5e7eb",
              borderRadius: "999px",
              overflow: "hidden",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                width: `${Math.max(0, Math.min(savingsProgress, 100))}%`,
                height: "100%",
                background: savingsProgress >= 100 ? "#16a34a" : "#2563eb",
              }}
            />
          </div>
          <p style={{ margin: 0 }}>
            You have reached <strong>{savingsProgress.toFixed(1)}%</strong> of your
            monthly savings goal of <strong>{formatCurrency(savingsGoal)}</strong>.
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Quick Summary</h3>
          <p style={{ margin: "0 0 8px" }}>
            You are currently saving <strong>{formatCurrency(balance)}</strong> each
            month.
          </p>
          <p style={{ margin: "0 0 8px" }}>
            {balance >= savingsGoal
              ? "You are meeting your savings target."
              : "You are below your savings target and may want to reduce spending."}
          </p>
          <p style={{ margin: 0 }}>
            In {latestMonthLabel}, subscriptions accounted for{" "}
            <strong>{subscriptionsShare.toFixed(1)}%</strong> of all expenses.
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Budget Watch</h3>
          <p style={{ margin: "0 0 8px" }}>
            {budgetWarnings.length > 0
              ? `${budgetWarnings.length} categories are close to or over budget.`
              : "No category is close to its budget limit right now."}
          </p>
          {budgetWarnings[0] ? (
            <p style={{ margin: 0 }}>
              <strong style={{ textTransform: "capitalize" }}>
                {budgetWarnings[0].category}
              </strong>{" "}
              is currently at {budgetWarnings[0].progress.toFixed(0)}% of budget.
            </p>
          ) : null}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        <div style={cardStyle}>
          <h3 style={{ marginBottom: "12px" }}>Monthly Trends</h3>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    formatCurrency(Number(value ?? 0)),
                    "Amount",
                  ]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#16a34a"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#dc2626"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ marginBottom: "12px" }}>Category Breakdown</h3>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <BarChart
                data={categorySpendingData}
                layout="vertical"
                margin={{ left: 16 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="category" type="category" width={100} />
                <Tooltip
                  formatter={(value) => [
                    formatCurrency(Number(value ?? 0)),
                    "Spent",
                  ]}
                />
                <Bar dataKey="value" fill="#0f766e" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ marginBottom: "16px" }}>Spending vs Budget</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          {budgetProgress.map((budget) => {
            const progressWidth = Math.min(budget.progress, 100);
            const progressColor =
              budget.progress > 100
                ? "#dc2626"
                : budget.progress > 85
                  ? "#d97706"
                  : "#2563eb";

            return (
              <div
                key={budget.category}
                style={{
                  padding: "16px",
                  borderRadius: "10px",
                  background: "#f8fafc",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    marginBottom: "10px",
                  }}
                >
                  <strong style={{ textTransform: "capitalize" }}>
                    {budget.category}
                  </strong>
                  <span>{budget.progress.toFixed(0)}%</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "12px",
                    background: "#e2e8f0",
                    borderRadius: "999px",
                    overflow: "hidden",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      width: `${progressWidth}%`,
                      height: "100%",
                      background: progressColor,
                    }}
                  />
                </div>
                <p style={{ margin: 0 }}>
                  {formatCurrency(budget.spent)} of {formatCurrency(budget.monthlyLimit)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
