const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// GET all expenses
router.get('/', async (req, res) => {
  const expenses = await Expense.find().sort({ createdAt: -1 });
  res.json(expenses);
});

// POST new expense
router.post('/', async (req, res) => {
  const { title, amount } = req.body;
  const newExpense = new Expense({ title, amount });
  await newExpense.save();
  res.status(201).json(newExpense);
});

// DELETE expense
router.delete('/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: 'Expense deleted' });
});

module.exports = router;
