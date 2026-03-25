import type {Transaction} from "../types/finance";

type TransactionListProps = {
    transactions: Transaction[];
}

export default function TransactionList({transactions}: TransactionListProps){

    return(
        <ul style = {{paddingLeft: "20px", margin: 0}}>
            {transactions.map((transaction) => (
                <li key = {transaction.id} style = {{marginBottom: "10px"}}>
                    <strong>{transaction.title}</strong> - £{transaction.amount.toFixed(2)} - {transaction.type} - {transaction.category}
                </li>
            ))}
        </ul>
    )

}
