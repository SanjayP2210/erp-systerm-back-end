const express = require('express');
const router = express.Router();
const Branch = require('../models/Branch');


// Create a new Branch
router.post('/', async (req, res) => {
  try {
    console.log('req.body', req.body);
    const todo = new Branch({ ...req.body });
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: 'Could not create a new todo' });
  }
});

// Get all Branch
router.get('/', async (req, res) => {
  const purchaseOrder = await Branch.find();
  if (purchaseOrder) {
    res.status(200).json(purchaseOrder);
  } else {
    res.status(400).send('data not found');
  }
});

// Update a Branch
router.put('/:id', async (req, res) => {
  try {
    const todo = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) {
      return res.status(404).json({ error: 'Branch not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: 'Could not update the todo' });
  }
});

// Delete a Branch
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Branch.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Branch not found' });
    }
    res.status(200).send('data deleted succesfully');
  } catch (error) {
    res.status(400).json({ error: 'Could not delete the todo' });
  }
});

module.exports = router;
