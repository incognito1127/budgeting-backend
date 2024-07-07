// app.js

const express = require('express');
const bodyParser = require('body-parser');
const transactionsController = require('./controllers/transactionsController'); // Corrected path

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/transactions', transactionsController);

app.get('/', (req, res) => {
  res.send('Welcome to my budgeting app!');
});

module.exports = app;

