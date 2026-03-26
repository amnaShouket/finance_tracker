import type { Budget, Category, Transaction } from "../types/finance";

export type BudgetStatus = {
  category: Category;
  monthlyLimit: number;
  spent: number;
  progress: number;
  status: "ok" | "warning" | "over";
};

export function getLatestMonthTransactions(transactions: Transaction[]) {
  const latestMonth = transactions.reduce(
    (latest, transaction) =>
      transaction.date.slice(0, 7) > latest ? transaction.date.slice(0, 7) : latest,
    "",
  );

  return transactions.filter(
    (transaction) => transaction.date.slice(0, 7) === latestMonth,
  );
}

export function getBudgetStatuses(
  budgets: Budget[],
  transactions: Transaction[],
  warningThreshold = 85,
) {
  const monthlyTransactions = getLatestMonthTransactions(transactions);
  const expenseTotals = new Map<Category, number>();

  monthlyTransactions
    .filter((transaction) => transaction.type === "expense")
    .forEach((transaction) => {
      expenseTotals.set(
        transaction.category,
        (expenseTotals.get(transaction.category) ?? 0) + transaction.amount,
      );
    });

  return budgets
    .map((budget) => {
      const spent = expenseTotals.get(budget.category) ?? 0;
      const progress = budget.monthlyLimit === 0 ? 0 : (spent / budget.monthlyLimit) * 100;
      const status =
        progress > 100 ? "over" : progress >= warningThreshold ? "warning" : "ok";

      return {
        ...budget,
        spent,
        progress,
        status,
      } satisfies BudgetStatus;
    })
    .sort((a, b) => b.progress - a.progress);
}
