const express = require('express');
const {
  findAll,
  findById,
  insert,
} = require('../models/productsDB');

const validationId = require('../middlewares/validationProductId');

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

productsRouter.post('/', async (req, res) => {
  const { name } = req.body;
  await insert(name);
  const allProducts = await (await findAll());
  res.status(200).json(await findById(allProducts.length));
});

module.exports = productsRouter;