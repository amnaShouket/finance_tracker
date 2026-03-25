import { useFinance } from "../hooks/FinanceContext";   

export default function  InsightsPage(){
    const {income, expenses, savingsGoal} = useFinance();
    const balance = income - expenses;
    const savingsProgress = savingsGoal === 0 ? 0 : Math.min((balance / savingsGoal)*100, 100);
    return(
        <div>
            <h2 style = {{marginBottom: "24px"}}>Insights</h2>

            <div style = {{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px",
                marginBottom: "32px"
            }}>
                <div style = {{
                    background: "white",
                    padding:"20px",
                    borderRadius:"12px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
                }}>
                    <h3>Current Balance</h3>
                    <p style = {{fontSize : "24px", fontWeight: "bold", margin: 0}}>
                        £{balance.toFixed(2)}
                    </p>
                </div>

                <div style = {{
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
                }}>
                    <h3>Savings Goal</h3>
                    <p style = {{fontSize: "24px", fontWeight: "bold", margin: 0}}>
                        £{savingsGoal.toFixed(2)}
                    </p>
                </div>

                <div style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
                }}>
                    <h3>Savings Progress</h3>
                    <p style = {{fontSize: "24px", fontWeight: "bold", margin: 0}}>
                        {savingsProgress.toFixed(2)}%
                    </p>
                </div>

                <div style = {{
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
                }}>
                    <h3 style = {{marginBottom: "12px"}}>Summary</h3>
                    <p style = {{margin: "4px 0"}}>
                        Your current monthly balance is <strong>£{balance.toFixed(2)}</strong>
                    </p>
                    <p style = {{margin:"4px 0"}}>
                        {balance >= savingsGoal ? "You are meeting your savings goal!" : "You are below your savings goal. Try reducing expenses or increasing income"}
                    </p>
                </div>
            </div>
        </div>
    );
}