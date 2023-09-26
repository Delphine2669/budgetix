import { useState } from "react";
import "./BudgetDashboard.css";
function BudgetDashboard() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="budget-preview">
        <h2>{count}</h2>
      </div>
    </>
  );
}
export default BudgetDashboard;
