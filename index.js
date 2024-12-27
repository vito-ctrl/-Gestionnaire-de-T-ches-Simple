const mongoose = require('mongoose');
const taskRoutes = require('./routes/routes');



// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/taskmanager', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));




