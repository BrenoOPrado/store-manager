const express = require('express');

const validationProductId = require('../services/middlewares/sales/validationProductId');
const validationQuantity = require('../services/middlewares/sales/validationQuantity');
const validationSalesId = require('../services/middlewares/sales/validationSalesId');
const {
  getAll,
  getById,
  insertSale,
} = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.post('/', validationProductId, validationQuantity, insertSale);

salesRouter.get('/', getAll);

salesRouter.get('/:id', validationSalesId, getById);

module.exports = salesRouter;