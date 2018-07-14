const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// server
const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(express.static('public'));

// database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/CrowdSheets');

// routing
app.use(require('./routes/home'))
app.use(require('./routes/api'))

// start server
app.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT)
})
