const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const connection = require("./../../db");
const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");

// Create a MongoDB client
const client = new MongoClient(process.env.DATABASE_URL+ process.env.DATABASE_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  });
const dbName = process.env.DATABASE_NAME;


async function createDynamicCollection(collectionName,schema) {
  try {
    const db = mongoose.connection;

    // Define a schema
    const itemSchema = new mongoose.Schema(schema || {
      name: String,
      description: String,
      createdBy: { type: String, default: '' },
      createdDate: { type: Date, default: Date.now },
      modifyBy: { type: String, default: '' },
      modifyDate: { type: Date, default: Date.now },
    });
    
    return mongoose.model(collectionName, itemSchema);
  } catch(error) {
    return error;
  } finally {
    // Close the client
    await client.close();
  }
}

// Create a new Todo
router.post('/', async (req, res) => {
  const { collectionName ,schema } = req.body;
  try {
    createDynamicCollection(collectionName,schema)
      .then((result) => {
        console.log('Process completed', result);
        res.status(200).json({message:'collection created successfully',collectionName : collectionName});
    })
    .catch(err => {
      console.error('Error:', err);
    });
  } catch (error) {
    res.status(400).json({ error: 'Could not create a new todo' });
  }
});

// Get all Todos
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  if (todos) {
    res.status(200).json(todos);
  } else {
    res.status(400).send('data not found');
  }
});

// Update a Todo
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: 'Could not update the todo' });
  }
});

// Delete a Todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).send('data deleted succesfully');
  } catch (error) {
    res.status(400).json({ error: 'Could not delete the todo' });
  }
});

module.exports = router;
