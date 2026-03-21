import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";


import InputsPage from "./pages/InputsPage";
import DashboardPage from "./pages/DashboardPage";
import InsightsPage from "./pages/InsightsPage";


export default function App() {
  return (
  <BrowserRouter>

    <div style = {{padding: "24px", fontFamily: "Arial, sans-serif"}}>
      <h1>Personal Finance Tracker</h1>

      <nav style = {{display: "flex", gap: "16px", marginBottom: "24px"}}>
        <NavLink to = "/">Inputs</NavLink>
        <NavLink to = "/dashboard">Dashboard</NavLink>
        <NavLink to = "/insights">Insights</NavLink>
      </nav>

      <Routes>
        <Route path ="/" element = {<InputsPage/>} />
        <Route path = "/dashboard" element = {<DashboardPage/>} />
        <Route path = '/insights' element = {<InsightsPage/>} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}