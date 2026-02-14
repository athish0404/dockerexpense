const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Expense = require('./models/Expense'); // Make sure this file exists

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (NEW DB: expenseTrackerDB)
mongoose.connect('mongodb+srv://ashokj23cse:ashok1952006@cluster0.rv5qdq1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log("Connected to MongoDB: expenseTrackerDB"))
  .catch(err => console.error("MongoDB connection error:", err));


// Routes

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new expense
app.post('/api/expenses', async (req, res) => {
  try {
    const { title, amount } = req.body;
    const newExpense = new Expense({ title, amount });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete an expense
app.delete('/api/expenses/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/expenses/:id', async (req, res) => {
  try {
    const { title, amount } = req.body;
    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
