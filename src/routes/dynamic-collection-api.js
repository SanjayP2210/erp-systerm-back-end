const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const connection = require("./../../db");
const mongoose = require("mongoose");

async function createDynamicCollection(collectionName) {
    try {
        
        // Select the database
        mongoose
		.connect(process.env.DATABASE_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		  })
		.then((result) => {
			console.log("Connected to database");
            const database = result?.db('sanjay_test');

            // Create the collection dynamically;
            console.log('connection', connection);
        const collection = database?.collection(collectionName);
    
            console.log(`Collection '${collectionName}' created successfully`);
            return collectionName;
		} )
		.catch((err) => {
			console.log("could not connect to database")
		});
    } catch (error) {
        
    res.status(400).json({ error: 'Could not create a new todo' });
  }
}
  
// Create a new Todo
router.post('/', async (req, res) => {
  try {
      const { collectionName } = req.body;
      // Usage example
        createDynamicCollection(collectionName)
            .then(() => {
                
            console.log('Process completed');
            res.status(200).json({message:'collection created successfully',collectionName : collectionName});
        })
        .catch(err => {
            console.error('Error:', err);
            res.status(400).json({ error: 'Could not create a new collection' });
        });
        // const currentDate = new Date();
        // data.createdDate = currentDate;
        // data.modifyDate = currentDate;
    // const todo = new Todo({
    //   title: title,
    //   completed: false,
    // });
    // await todo.save();
    // res.status(200).json(todo);
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
