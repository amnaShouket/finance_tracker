import { useFinance } from "../hooks/FinanceContext";   
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

export default function  InsightsPage(){
    const {income, expenses, savingsGoal} = useFinance();
    const balance = income - expenses;
    const savingsProgress = savingsGoal === 0 ? 0 : Math.min((balance / savingsGoal)*100, 100);
    const chartData = [
        {name: "Income", value: income},
        {name: "Expenses", value: expenses},
        {name: "Balance", value: balance},
    ];
    



    return(
        <div>
            <h2 style = {{marginBottom: "24px"}}>Insights</h2>

            <div style = {{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
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
                    <div style = {{
                        width: "100%",
                        height: "20px",
                        background: "#eee",
                        borderRadius: "999px",
                        marginBottom:"12px",
                    }}>
                        <div style = {{
                            width: `${savingsProgress}%`,
                            height: "80%",
                            background: savingsProgress >= 100 ? "#4caf50" : "#2196f3",
                            borderRadius: "999px",
                        }}>
                        </div>
                        <p style = {{margin: "12px 0"}}>
                            You have reached <strong>{savingsProgress.toFixed(1)}%</strong> of your monthly savings goal. 
                        </p>
                    </div>
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

                <div style ={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    marginBottom: "24px",
             
                }}>
                    <h3 style = {{marginBottom: "12px"}}>
                        Income vs Expenses
                    </h3>
                    <div style = {{width:"100%", height: 300}}>
                        <ResponsiveContainer>
                            <BarChart data = {chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey = "name"/>
                                <YAxis/>
                                <Tooltip cursor = {false}
                                formatter={(value) => [`$${value}`, "Amount"]}
                                labelFormatter={(label) => `Category: ${label}`}
                                />
                                <Bar dataKey = "value"
                                activeBar = {{fill: "#3a3a3a"}}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}