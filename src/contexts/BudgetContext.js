import React,{useContext } from "react"
import { v4 as uid } from "uuid"
import useLocalStorage from "../hooks/useLocalStorage"

//To create context
const BudgetContext = React.createContext()

export const UNCATERGOARIZED_BUDGET_ID = "Uncatergorized"

//To use the context across the app
export function useBudgets() {
    return useContext(BudgetContext)
}

//Defining the provider and values used in the context
export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }
    function addExpense({description, amount, budgetId}) {
        setExpenses(prevExpenses => {
            return[...prevExpenses, {id:uid(), description, amount, budgetId}]
        })
    }
    function addBudget({name, max}) {
        setBudgets(prevBudgets => {
            if(prevBudgets.find(budget => budget.name === name)){
                return prevBudgets
            }
            return[...prevBudgets, {id:uid(), name, max}]
        })

    }
    function deleteBudget({id}) {
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }
    function deleteExpense({id}) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(budget => budget.id !== id)
        })
    }

    //The values passed is made accessible to all the children
    return <BudgetContext.Provider value = {{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>{children}</BudgetContext.Provider>
}