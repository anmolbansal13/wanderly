import React, { useState, useEffect } from "react";
import "./BudgetTracker.css";

const BudgetTracker = ({ tripId }) => {
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [budget, setBudget] = useState(0);

  // Load expenses from local storage or backend
  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem(`expenses_${tripId}`)) || [];
    setExpenses(savedExpenses);
  }, [tripId]);

  // Save expenses when they change
  useEffect(() => {
    localStorage.setItem(`expenses_${tripId}`, JSON.stringify(expenses));
  }, [expenses, tripId]);

  const handleAddExpense = () => {
    if (expenseName && expenseAmount) {
      const newExpense = { 
        id: Date.now(), 
        name: expenseName, 
        amount: parseFloat(expenseAmount) 
      };
      setExpenses([...expenses, newExpense]);
      setExpenseName("");
      setExpenseAmount("");
    }
  };

  const handleRemoveExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBudget = budget - totalExpenses;

  return (
    <div className="budget-tracker">
      <h3>Budget Tracker</h3>
      
      <div className="budget-input">
        <input
          type="number"
          placeholder="Set Total Budget"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
        />
      </div>

      <div className="budget-summary">
        <div>Total Budget: ${budget.toFixed(2)}</div>
        <div>Remaining: ${remainingBudget.toFixed(2)}</div>
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

      <div className="total">
        <strong>Total Expenses:</strong> ${totalExpenses.toFixed(2)}
      </div>
    </div>
  );
};

export default BudgetTracker;
