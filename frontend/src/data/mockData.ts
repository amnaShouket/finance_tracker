import type {MonthlySummary, Subscription, Transaction} from '../types/finance';


export const transactions: Transaction[] = [
  {
    id: "t1",
    title: "Salary",
    amount: 2500,
    type: "income",
    category: "salary",
    date: "2026-03-01",
  },
  {
    id: "t2",
    title: "Freelance Project",
    amount: 400,
    type: "income",
    category: "freelance",
    date: "2026-03-10",
  },
  {
    id: "t3",
    title: "Rent",
    amount: 900,
    type: "expense",
    category: "rent",
    date: "2026-03-02",
  },
  {
    id: "t4",
    title: "Tesco",
    amount: 85,
    type: "expense",
    category: "groceries",
    date: "2026-03-05",
  },
  {
    id: "t5",
    title: "Train Ticket",
    amount: 40,
    type: "expense",
    category: "transport",
    date: "2026-03-07",
  },
];
export const subscriptions: Subscription[] = [
{
    id: "s1",
    name: "Netflix",
    monthlyCost: 10.99,
    category: "subscriptions",
    renewalDate: "2026-03-25",
  },
  {
    id: "s2",
    name: "Spotify",
    monthlyCost: 11.99,
    category: "subscriptions",
    renewalDate: "2026-03-18",
  },
]

export const monthlySummary: MonthlySummary = 
  {
    income: 2900,
    expenses: 1025,
    balance: 1875,
  }

