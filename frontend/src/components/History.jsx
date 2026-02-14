import { useState } from "react";

const History = ({ EXPENSE, onDelete, onEdit }) => {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");

  const startEdit = (expense) => {
    setEditId(expense._id);
    setEditTitle(expense.title);
    setEditAmount(expense.amount);
  };

  const handleSave = () => {
    const parsedAmount = parseFloat(editAmount);
    if (!editTitle || isNaN(parsedAmount)) return;

    onEdit(editId, { title: editTitle, amount: parsedAmount });
    setEditId(null);
    setEditTitle("");
    setEditAmount("");
  };

  return (
    <div className="history">
      {EXPENSE.map((expense) => (
        <div key={expense._id} className="expense-item">
          {editId === expense._id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{ width: "40%" }}
              />
              <input
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                style={{ width: "20%", marginLeft: "10px" }}
              />
              <button onClick={handleSave} style={{ marginLeft: "10px" }}>
                Save
              </button>
            </>
          ) : (
            <>
              <div className="expense-title">{expense.title}</div>
              <div className="expense-amount">
                ₹{expense.amount}
                <button
                  onClick={() => startEdit(expense)}
                  style={{
                    marginLeft: "10px",
                    background: "#2196f3",
                    color: "white",
                    border: "none",
                    padding: "2px 6px",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(expense._id)}
                  style={{
                    marginLeft: "6px",
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "2px 6px",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  DELETE
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default History;
