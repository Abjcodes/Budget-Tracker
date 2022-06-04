import { Modal , Button, Stack } from "react-bootstrap";
import { UNCATERGOARIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";

export default function ViewExpensesModal({budgetId, handleClose}) {
    const { getBudgetExpenses, budgets, deletBudget, deleteExpense } = useBudgets()

    const budget = UNCATERGOARIZED_BUDGET_ID === budgetId ? {name : "Uncategorized", id: UNCATERGOARIZED_BUDGET_ID} : budgets.find(b => b.id === budgetId)
  return (
    //Creating a modal
    <Modal show = {budgetId != null} onHide = {handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction = "horizontal" gap="2">
                        <div>
                            {/*Only gets the budget is defined*/}
                            Expenses - {budget?.name}
                        </div>
                        {budgetId !== UNCATERGOARIZED_BUDGET_ID}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className = "mb-3" controlId="name">
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control ref={nameRef} type="text" required>
                    </Form.Control>
                </Form.Group>
                <Form.Group className = "mb-3" controlId="max">
                    <Form.Label>
                        Maximum Spending
                    </Form.Label>
                    <Form.Control ref = {maxRef} type="number" required min = {0} step={0.01}>
                    </Form.Control>
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button variant="success" type="submit">Add budget</Button>
                </div>
            </Modal.Body>
    </Modal>
  )
}
