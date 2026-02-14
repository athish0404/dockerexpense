import { useEffect, useState } from "react";
import Expenseform from "./Expenseform";
import History from "./History";
import BalanceContainer from "./Balancecontainer";

const Expensetracker = () => {
  const [expenseList, setExpenseList] = useState([]);

  // 🔁 Load from backend when app starts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch("http://192.168.44.128:5000/api/expenses");
        const data = await res.json();
        setExpenseList(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  // ✅ Add to backend
  const addExpense = async (newExpense) => {
    try {
      const response = await fetch("http://192.168.44.128:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newExpense)
      });

      const saved = await response.json();
      setExpenseList((prev) => [...prev, saved]);
      console.log("After Adding:", saved);
    } catch (err) {
      console.error("Add Error:", err);
    }
  };

  // ❌ Delete from backend
  const deleteExpense = async (id) => {
    try {
      const res = await fetch(`http://192.168.44.128:5000/api/expenses/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setExpenseList((prev) => prev.filter((item) => item._id !== id));
        console.log("Deleted:", id);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ✏️ Update in backend
  const editExpense = async (id, updatedData) => {
    try {
      const res = await fetch(`http://192.168.44.128:5000/api/expenses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
      });

      const updated = await res.json();
      setExpenseList((prev) =>
        prev.map((item) => (item._id === id ? updated : item))
      );
      console.log("Edited:", updated);
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  // 🧹 Clear All
  const clearAllExpenses = async () => {
    if (window.confirm("Are you sure you want to clear all expenses?")) {
      for (let expense of expenseList) {
        await fetch(`http://192.168.44.128:5000/api/expenses/${expense._id}`, {
          method: "DELETE"
        });
      }
      setExpenseList([]);
      console.log("All Cleared");
    }
  };

  return (
    <div className="expense-container">
      <h1>Expense Tracker</h1>
      <BalanceContainer transactions={expenseList} />
      <Expenseform onAddExpense={addExpense} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 0" }}>
        <h2>History</h2>
        <button
          onClick={clearAllExpenses}
          style={{
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Clear All
        </button>
      </div>

      <History EXPENSE={expenseList} onDelete={deleteExpense} onEdit={editExpense} />
    </div>
  );
};

export default Expensetracker;
