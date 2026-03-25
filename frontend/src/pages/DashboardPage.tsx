import {subscriptions, transactions } from "../data/mockData";
import {useFinance} from "../hooks/FinanceContext";
import TransactionList from "../components/TransactionList";
import SubscriptionList from "../components/SubscripitonList";

export default function DashboardPage() {

  const {income, expenses, savingsGoal} = useFinance();
  const balance = income - expenses;

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
            £{income.toFixed(2)}
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
            £{expenses.toFixed(2)}
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
            £{balance.toFixed(2)}
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
          <h3>Savings Goal</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
            £{savingsGoal.toFixed(2)}
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
          <TransactionList transactions = {transactions}/>
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
          <SubscriptionList subscriptions = {subscriptions}/>
        </div>
      </div>
    </div>
  );
}