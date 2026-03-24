import {useState} from "react"

export default function InputsPage(){
    const [income, setIncome] = useState(2500)
    const [expenses, setExpenses] = useState(1200)
    const [savingsGoal, setSavingsGoal] = useState(500);

    return (
        <div>
            <h2 style = {{marginBottom: "24px"}}>Inputs</h2>
            <div style = {{
                background: "white",
                padding: "24px",
                borderRadius: "12px", 
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.8)",
                maxWidth: "500px"
            }}>
                <div style = {{marginBottom: "16px"}}>
                    <label
                        htmlFor = "income"
                        style = {{display: "block", marginBottom: "8px", fontWeight: "600"}}
                    >
                        Monthly Income
                    </label>
                    <input
                        id = "income"
                        type = "number"
                        value = {income}
                        onChange = {(e) => setIncome(Number(e.target.value))}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            fontSize: "16px"
                        }}
                    />
                </div>
                <div style = {{marginBottom:"16px"}}>
                    <label
                        htmlFor = "expenses"
                        style = {{display:"block", marginBottom:"8px", fontWeight:"600"}}>
                            Monthly Expenses
                    </label>
                    <input 
                        id = "expenses"
                        type = "number"
                        value = {expenses}
                        onChange = {(e) => setExpenses(Number(e.target.value))}
                        style = {{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            fontSize: "16px"
                        }}
                    />
                </div>

                <div style = {{marginBottom:"16px"}}>
                    <label
                        htmlFor = "savings"
                        style = {{display:"block", marginBottom:"8px", fontWeight:"600"}}>
                            Monthly Savings
                    </label>
                    <input
                        id = "savings"
                        type = "number"
                        value = {savingsGoal}
                        onChange = {(e) => setSavingsGoal(Number(e.target.value))}
                        style = {{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            fontSize: "16px"
                        }}
                    />
                </div>

                <div
                    style = {{
                        marginTop: "24px",
                        padding: "16px",
                        background: "#f8fafc",
                        borderRadius: "6px",
                    }}>

                    <p style = {{margin : "0 0 8px 0"}}>
                        <strong>Summary:</strong> £{income}
                    </p>
                    <p style = {{margin: "0 0 8px 0"}}>
                        <strong>Expenses:</strong> £{expenses}
                    </p>
                    <p style = {{margin: "0"}}>
                        <strong>Savings Goal:</strong> £{savingsGoal}
                    </p>

                </div>

                
        
                </div>
            </div>
        

    )

}