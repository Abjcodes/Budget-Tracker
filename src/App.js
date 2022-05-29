import { Button, Container, Stack } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";

function App() {
  return <Container className="my-4">
    <Stack direction="horizontal" gap = "2" className="mb-4">
      <h1 className="me-auto">Budget Tracker</h1>
      <Button variant = "success">Add Budget</Button>
      <Button variant = "outline-success">Add Expense</Button>
    </Stack>
    <div style={{ display:"grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
    gap:"1rem",
    alignItems: "flex-start"}}>
      <BudgetCard name={"Food"} amount= {500} max={1000} grey></BudgetCard>
    </div>
  </Container>
}
export default App;
