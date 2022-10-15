const express = require('express');
const {
  findAll,
  findById,
  remove,
  update,
  insert,
} = require('../models/productsDB');

const validationId = require('../middlewares/products/validationProductId');
const validationName = require('../middlewares/products/validationName');

const productsRouter = express.Router();

productsRouter.get('/', async (_req, res) => {
  const allProducts = await findAll();
  res.status(200).json(allProducts[0]);
});

productsRouter.get('/:id', validationId, async (req, res) => {
  const { id } = req.params;
  const productById = await findById(id);
  res.status(200).json(...productById[0]);
});

productsRouter.post('/', validationName, async (req, res) => {
  const { name } = req.body;
  await insert(name);
  const allProducts = await (await findAll());
  const productById = await findById(allProducts[0].length);
  res.status(201).json(...productById[0]);
});

productsRouter.put('/:id', validationName, validationId, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = { id, name };
  await update(result);
  res.status(200).json(result);
});

productsRouter.delete('/:id', validationId, async (req, res) => {
  const { id } = req.params;
  await remove(id);
  return res.status(204).json();
});

module.exports = productsRouter;