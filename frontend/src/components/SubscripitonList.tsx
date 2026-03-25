import type {Subscription} from "../types/finance";

type SubscriptionListProps = {
    subscriptions: Subscription[];
}

export default function SubscriptionList({subscriptions}: SubscriptionListProps){
    return (
        <ul style = {{paddingLeft:"20px", margin:0}}>
            {subscriptions.map((subscription) => (
                <li key = {subscription.id} style = {{marginBottom:"10px"}}>
                    <strong>{subscription.name}</strong> - £{subscription.monthlyCost.toFixed(2)} - {subscription.renewalDate}
                </li>
            ))}
        </ul>
    )
}