const express = require('express');
const {
  findAll,
  findById,
} = require('../models/productsDB');

const productsRouter = express.Router();

productsRouter.get('/', (_req, res) => {
  res.status(200).json(findAll());
});

productsRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json(findById(id));
});

productsRouter.post('/', (req, res) => {
  const { name } = req.body;
  res.status(200).json(update(name));
});

module.exports = productsRouter;