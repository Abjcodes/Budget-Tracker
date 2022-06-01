import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import BudgetCard from "./components/BudgetCard";
import {useBudgets } from "./contexts/BudgetContext";

function App() {
  // State for modal visibility
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const { budgets, getBudgetExpenses } = useBudgets()

  return (
    <>
  <Container className="my-4">
    <Stack direction="horizontal" gap = "2" className="mb-4">
      <h1 className="me-auto">Budget Tracker</h1>
      <Button variant = "success" onClick = {() => setShowAddBudgetModal(true)}>Add Budget</Button>
      <Button variant = "outline-success">Add Expense</Button>
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
        />
        )
      })}
    </div>
  </Container>
  <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)}/>
  </>
  )
}
export default App;
