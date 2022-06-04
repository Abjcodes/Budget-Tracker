import { useBudgets } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

export default function UncategorizedBudgetCard(props) {
    const {getBudgetExpenses} = useBudgets()
    const amount = getBudgetExpenses("Uncategorized").reduce((total,expense) => total + expense.amount, 0)
    if(amount === 0) return null
    return (
    <BudgetCard amount = { amount } name="Uncategorized" grey {...props}/>
  )
}
