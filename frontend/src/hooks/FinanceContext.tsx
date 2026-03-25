import { createContext, useContext, useState, type ReactNode } from "react";
import { budgets as initialBudgets } from "../data/mockData";
import type { Budget, Category } from "../types/finance";

type FinanceContextType = {
  income: number;
  expenses: number;
  savingsGoal: number;
  budgets: Budget[];
  setIncome: (income: number) => void;
  setExpenses: (expenses: number) => void;
  setSavingsGoal: (savingsGoal: number) => void;
  updateBudget: (category: Category, monthlyLimit: number) => void;
};

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [income, setIncome] = useState(2500);
  const [expenses, setExpenses] = useState(1200);
  const [savingsGoal, setSavingsGoal] = useState(500);
  const [budgets, setBudgets] = useState(initialBudgets);

  const updateBudget = (category: Category, monthlyLimit: number) => {
    setBudgets((currentBudgets) =>
      currentBudgets.map((budget) =>
        budget.category === category ? { ...budget, monthlyLimit } : budget,
      ),
    );
  };

  return (
    <FinanceContext.Provider
      value={{
        income,
        expenses,
        savingsGoal,
        budgets,
        setIncome,
        setExpenses,
        setSavingsGoal,
        updateBudget,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
}
