const {
  findAll,
  findById,
  insertSaleDate,
  insertSaleProduct,
} = require('../models/salesDB');

const getAll = async (_req, res) => {
  const allSales = await findAll();
  res.status(200).json(allSales[0]);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const salesById = await findById(id);
  res.status(200).json(salesById[0]);
};
  
const insertSale = async (req, res) => {
  const saleDate = await insertSaleDate();

  const items = req.body;
  const saleInfo = {
    id: saleDate[0].insertId,
    itemsSold: items,
  };

  await insertSaleProduct(saleInfo);

  res.status(201).json(saleInfo);
};

module.exports = {
  getAll,
  getById,
  insertSale,
};