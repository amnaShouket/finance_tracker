1. Real transaction management. Right now totals are typed manually in FinanceContext.tsx while transactions are hardcoded in mockData.ts. Let users add, edit, delete, and categorize transactions, then calculate income/expenses from those records instead of separate manual inputs.

2. Persistent storage. The current data resets on refresh because it lives in React state and mock files. Add localStorage first for a quick win, then later move to Firebase, Supabase, or your own backend so users can keep data across devices.

3. Better insights. InsightsPage.tsx currently shows one basic bar chart. You could add category breakdowns, monthly trends, spending vs budget, savings rate, and “highest spending category this month” summaries.

4. Budgeting features. Add monthly category budgets like groceries, transport, and entertainment, then show warnings when spending is close to the limit. That would fit naturally with your existing Category type in finance.ts.

5. Subscription tracking. You already list subscriptions in SubscripitonList.tsx. Build that out with renewal reminders, annual cost projections, and “unused subscription” flags.

6. Date filtering and history. Add week/month/year filters so users can view past periods instead of only one current snapshot. This would make the dashboard much more useful.

7. UX polish. A lot of styling is inline across pages like DashboardPage.tsx and InputsPage.tsx. Moving to reusable card/form components would make the UI easier to improve and maintain.

8. Validation and formatting. Add proper currency formatting, prevent negative/invalid values, and fix the broken pound symbol rendering (Â£) visible in several files. Using Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }) would clean that up.

9. Search, sort, and filters. Let users filter transactions by category, amount, date, or type, and search by merchant/title. That would make the transaction list feel like a real finance tool.

10. Authentication and user accounts. If you want this to become a portfolio-grade app, login plus personal saved data is a big upgrade.

---

AS:
- 1, 2

AM:
- 3, 4