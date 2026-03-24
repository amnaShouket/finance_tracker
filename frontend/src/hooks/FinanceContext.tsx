import {createContext, useContext, useState, type ReactNode} from "react";

type FinanceContextType = {
    income: number;
    expenses: number;
    savingsGoal: number;
    setIncome: (income: number) => void;
    setExpenses: (expenses: number) => void;
    setSavingsGoal: (savingsGoal: number) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({children}:{children:ReactNode} ){
    const [income, setIncome] = useState(2500);
    const [expenses, setExpenses] = useState(1200);
    const [savingsGoal, setSavingsGoal] = useState(500);

    return (
        <FinanceContext.Provider
            value = {{
                income, 
                expenses,
                savingsGoal,
                setIncome,
                setExpenses,
                setSavingsGoal
            }}
        >
            {children}
        </FinanceContext.Provider>
    );
}

export function useFinance(){
    const context = useContext(FinanceContext);

    if (!context) {
        throw new Error("useFinance must be used within a FinanceProvider");
    }
    return context;
}