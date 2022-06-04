import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";

export default function BudgetCard({name, max, amount, grey, onAddExpenseClick, hideButtons }) {

    // For setting the background color of the cards 
    const classNames = []
    if(amount>max) {
        //To clear the array for better memory utilization
        classNames.length = 0
        classNames.push("bg-danger", "bg-opacity-10")
    } else if(grey) {
        classNames.length = 0
        classNames.push("bg-light")
    }

  return (
        <Card className= {classNames.join(" ")}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                    <div className="me-2">{name}</div>
                    <div className="d-flex align-items-baseline">
                        {currencyFormatter.format(amount)}
                        {max && <span className="text-muted fs-6 ms-1">/{currencyFormatter.format(max)}</span>}</div>
                </Card.Title>
                {max && (<ProgressBar className="rounded-pill" variant={setVariant(amount, max)}
                min = {0}
                max = {max}
                now = {amount}/>
                )}
                {!hideButtons && (<Stack direction="horizontal" gap = "2" className="mt-4">
                <Button variant = "success" className="ms-auto" onClick={onAddExpenseClick}>Add Expense</Button>
                <Button variant = "outline-primary">View Expenses</Button>
                </Stack>)}
            </Card.Body>
        </Card>
  )
}

// For setting the colors of progress bar
function setVariant(amount, max) {
    const ratio = amount/max
    if(ratio < .5 ) return "primary"
    if(ratio < .75 ) return "warning"
    return "danger"
    

}
