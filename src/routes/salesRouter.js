const express = require('express');

const salesRouter = express.Router();

const {
  findAll,
  findById,
  insertSaleDate,
  insertSaleProduct,
} = require('../models/salesDB');

const validationProductId = require('../middlewares/sales/validationProductId');
const validationQuantity = require('../middlewares/sales/validationQuantity');
const validationSalesId = require('../middlewares/sales/validationSalesId');

salesRouter.post('/', validationProductId, validationQuantity, async (req, res) => {
  const saleDate = await insertSaleDate();
  console.log(req.body);
  const saleInfo = {
    saleId: saleDate[0].insertId,
    itemsSold: []
  };
  req.body.forEach(async ({ productId, quantity }) => {
    const newProduct = { productId, quantity }
    saleInfo.itemsSold.push(newProduct);
  });
  console.log(saleInfo);
  await insertSaleProduct(saleInfo);
  const result = {
    id: saleDate[0].insertId,
    itemsSold: saleDate,
  };
  res.status(201).json(result);
});

salesRouter.get('/', async (_req, res) => {
  const allSales = await findAll();
  res.status(200).json(allSales[0]);
});

salesRouter.get('/:id', validationSalesId, async (req, res) => {
  const { id } = req.params;
  const salesById = await findById(id);
  res.status(200).json(salesById[0]);
});

module.exports = salesRouter;