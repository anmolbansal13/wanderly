import React, { useState, useEffect } from "react";
import "./BudgetTracker.css";

const url = import.meta.env.VITE_BACKEND_URL;
const BudgetTracker = ({ tripId }) => {
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await fetch(`${url}/getTrip/${tripId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setBudget(
          data.tripBudget.reduce((total, expense) => {
            return total + expense.cost;
          }, 0)
        );
        setExpenses(data.tripBudget);
      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    };

    fetchTripDetails();
  }, [tripId]);

  const handleAddExpense = async () => {
    if (expenseName && expenseAmount) {
      const newExpense = {
        name: expenseName,
        cost: parseFloat(expenseAmount),
      };
      const updatedExpenses = [...expenses, newExpense];
      try {
        const response = await fetch(`${url}/editTrip/${tripId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            tripBudget: updatedExpenses,
          }),
        });
        const data = await response.json();
        setExpenses(data.tripBudget);
        setBudget(
          data.tripBudget.reduce((total, expense) => total + expense.cost, 0)
        );
        setExpenseName("");
        setExpenseAmount("");
        console.log(data);
      } catch (error) {
        alert("Error updating budget");
        console.error("Error fetching trip details:", error);
      }
    }
  };

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.cost,
    0
  );

  return (
    <div className="budget-tracker">
      <h3>Budget Tracker</h3>

      {/* <div className="budget-input">
        <input
          type="number"
          placeholder="Set Total Budget"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
        />
      </div> */}

      <div className="budget-summary">
        <div>Total Expenses: ₹{budget.toFixed(2)}</div>
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Expense Amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>

      {/* <ul className="expenses-list">
        {expenses.map((expense) => (
          <li key={expense.id}>
            <span>{expense.name}</span>
            <span>${expense.amount.toFixed(2)}</span>
            <button 
              className="remove-expense" 
              onClick={() => handleRemoveExpense(expense.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul> */}

      {/* <div className="total">
        <strong>Total Expenses:</strong> ₹{totalExpenses.toFixed(2)}
      </div> */}
    </div>
  );
};

export default BudgetTracker;
