import { useRef } from "react";
import { Form, Modal , Button } from "react-bootstrap";
import { useBudgets } from "../contexts/BudgetContext";

export default function AddBudgetModal({show, handleClose}) {
    //Creating refs so that the values persist between states
    const nameRef = useRef()
    const maxRef = useRef()
    const { addBudget } = useBudgets()
    
    function handleSubmit(e) {
        e.preventDefault()
        addBudget(
        {
            name: nameRef.current.value,
            max:  parseFloat(maxRef.current.value)
        })
        handleClose()
    }

  return (
    //Creating a modal
    <Modal show = {show} onHide = {handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>New Budget</Modal.Title>
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
        </Form>
    </Modal>
  )
}
