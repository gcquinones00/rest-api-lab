const express = require('express');
const app = express();

app.use(express.json());

// Allows items to be listed when running the code.
let items = [
  { id: 1, name: 'Keyboard' },
  { id: 2, name: 'Mouse' }
];

// It allows GET /items to return all items after executing the code.
app.get('/items', (req, res) => {
  res.status(200).json(items);
});

// It allows GET /items/:id to return item by ID.
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);

 // It allows the message to appear on the terminal if the item is not listed including id.
  if (!item) {
    return res.status(404).json({ message: 'Item does not exist' });
  }

  res.status(200).json(item);
});

// It allows the POST /items to create a new item.
app.post('/items', (req, res) => {
  const { name } = req.body;
 
  // It allows the message to appear on the terminal if the name does not exist. 
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const newItem = {
    id: items.length + 1,
    name
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// This is the export for Cloud Functions once I run the code.
exports.api = app;