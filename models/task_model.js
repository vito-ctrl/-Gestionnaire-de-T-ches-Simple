const mongoose = require('mongoose');
const status = require('statuses');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;