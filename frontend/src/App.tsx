import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import InputsPage from "./pages/InputsPage";
import DashboardPage from "./pages/DashboardPage";
import InsightsPage from "./pages/InsightsPage";

export default function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "32px 20px",
        }}
      >
        <h1 style={{ marginBottom: "24px" }}>Personal Finance Tracker</h1>

        <nav
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "32px",
            paddingBottom: "12px",
            borderBottom: "1px solid #dbe3f0",
          }}
        >
          <NavLink to="/">Inputs</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/insights">Insights</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<InputsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}