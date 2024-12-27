const express = require('./../node_modules/express');
const Task = require('./../models/task_model');
const bodyParser = require('./../node_modules/body-parser');

// Start the Server
const PORT = 3000;
const app = express();

// Middleware
app.use(bodyParser.json());

// Create a Task
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).send({ message: 'Title and Description are required.' });
    }
    const task = new Task({ title, description });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get All Tasks
app.get('/api/tasks', async (req, res) => {
  console.log('request comme from postman')
  console.log(req.body);
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Update a Task
app.put('/api/tasks/:id', async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  try {
    const newTask = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, newTask);
    console.log(task);
    res.status(200).send({ message: 'Task found.' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Delete a Task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).send({ message: 'Task not found.' });
    }
    res.send({ message: 'Task deleted successfully.' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


module.exports = app;
