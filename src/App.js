import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetCard from "./components/BudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import {useBudgets } from "./contexts/BudgetContext";

function App() {
  // States for modal visibility
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  //Function to set budgetId and visibility of expense modal
  function openExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
  <Container className="my-4">
    <Stack direction="horizontal" gap = "2" className="mb-4">
      <h1 className="me-auto">Budget Tracker</h1>
      <Button variant = "success" onClick = {() => setShowAddBudgetModal(true)}>Add Budget</Button>
      <Button variant = "outline-success" onClick={openExpenseModal}>Add Expense</Button>
    </Stack>
    <div style={{ display:"grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
    gap:"1rem",
    alignItems: "flex-start"}}>
      {budgets.map(budget => {
        const amount = getBudgetExpenses(budget.id).reduce((total,expense) => total + expense.amount, 0)
        return(
        <BudgetCard 
          key = {budget.id} 
          name = {budget.name} 
          amount = {amount} 
          max = {budget.max} 
          onAddExpenseClick = {() => openExpenseModal(budget.id)}
        />
        )
      })}
      <UncategorizedBudgetCard  onAddExpenseClick = {openExpenseModal}/>
      <TotalBudgetCard />
    </div>
  </Container>
  <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)}/>
  <AddExpenseModal show={showAddExpenseModal} defaultBudgetId = {addExpenseModalBudgetId } handleClose={() => setShowAddExpenseModal(false)}/>
  </>
  )
}
export default App;
