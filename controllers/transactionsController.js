// routes/transactions.js

const express = require('express');
const router = express.Router();
const transactionArray = require('../models/transaction');

// GET ALL TRANSACTIONS
router.get('/', (req, res) => {
  res.status(200).send(transactionArray);
});

// GET A SINGLE TRANSACTION
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const transaction = transactionArray.find(el => el.id === +id);
  if (transaction) {
    res.status(200).send(transaction);
  } else {
    res.status(404).json({ error: `Transaction with id: ${id} not found!` });
  }
});

// CREATE A NEW TRANSACTION
router.post('/', (req, res) => {
  const currentTransaction = { id: transactionArray.length + 1, ...req.body };
  transactionArray.push(currentTransaction);
  res.status(201).send(transactionArray[transactionArray.length - 1]);
});

// DELETE A TRANSACTION BY SPECIFIED ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const transactionToDeleteIndex = transactionArray.findIndex(transaction => transaction.id === +id);
  if (transactionToDeleteIndex !== -1) {
    transactionArray.splice(transactionToDeleteIndex, 1);
    res.status(200).send({ message: `Transaction with id: ${id} deleted!` });
  } else {
    res.status(404).json({ error: `Transaction with id: ${id} not found!` });
  }
});

// UPDATE A TRANSACTION BY SPECIFIED ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const transactionToUpdateIndex = transactionArray.findIndex(transaction => transaction.id === +id);

  if (transactionToUpdateIndex !== -1) {
    transactionArray[transactionToUpdateIndex] = { id: +id, ...req.body };
    res.status(200).json(transactionArray[transactionToUpdateIndex]);
  } else {
    res.status(404).send({ error: `Transaction with id: ${id} not found!` });
  }
});

module.exports = router;
