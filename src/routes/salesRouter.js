const express = require('express');

const salesRouter = express.Router();

const {
  insertSaleDate,
  insertSaleProduct,
} = require('../models/salesDB');

const validationProductId = require('../middlewares/sales/validationProductId');
const validationQuantity = require('../middlewares/sales/validationQuantity');

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

module.exports = salesRouter;