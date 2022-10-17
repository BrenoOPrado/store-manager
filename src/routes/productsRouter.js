const express = require('express');

const validationId = require('../services/middlewares/products/validationProductId');
const validationName = require('../services/middlewares/products/validationName');
const {
  getAll,
  getById,
  insertProduct,
  updateProduct,
  removeProduct,
} = require('../controllers/productController')

const productsRouter = express.Router();

productsRouter.get('/', getAll);

productsRouter.get('/:id', validationId, getById);

productsRouter.post('/', validationName, insertProduct);

productsRouter.put('/:id', validationName, validationId, updateProduct);

productsRouter.delete('/:id', validationId, removeProduct);

module.exports = productsRouter;