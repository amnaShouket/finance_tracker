export type TransactionType = "income" | "expense";
export type Category = 
  | "salary"
  | "freelance"
  | "rent"
  | "groceries"
  | "transport"
  | "entertainment"
  | "utilities"
  | "subscriptions"
  | "other";


export type Transaction = {
    id: string;
    title: string;
    amount: number;
    type: TransactionType;
    category: Category;
    date: string;

}

export type Subscription = {
    id: string;
    name:string;
    monthlyCost: number;
    category: Category;
    renewalDate: string;
};

export type MonthlySummary = {
    income: number;
    expenses: number;
    balance: number;
}