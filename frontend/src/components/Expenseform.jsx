import React, { useState } from 'react';

const Expenseform = (props) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    const finalAmount = type === "expense" ? -Math.abs(parsedAmount) : Math.abs(parsedAmount);

    const newExpense = {
      title: title,
      amount: finalAmount,
    };

    try {
      const response = await fetch("http://192.168.44.128:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newExpense)
      });

      if (response.ok) {
        const savedExpense = await response.json();
        if (props.onAddExpense) {
          props.onAddExpense(savedExpense); // Update frontend state
        }
        console.log("Saved to MongoDB:", savedExpense);
      } else {
        console.error("Failed to save expense");
      }
    } catch (error) {
      console.error("Error while saving:", error);
    }

    // Reset form
    setTitle("");
    setAmount("");
    setType("income");
  };

  return (
    <div className="expense-form">
      <h1>ADD EXXPENSE</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter expense title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amountttttttt</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default Expenseform;


