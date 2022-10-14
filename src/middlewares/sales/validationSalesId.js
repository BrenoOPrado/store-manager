const { findAll } = require('../../models/salesDB');

module.exports = async function validationSalesId(req, res, next) {
  const id = parseInt(req.params.id);
  const allSales = await findAll();

  if (!allSales[0].some((item) => item.saleId === id)) {
    return res.status(404).json({
      message: 'Sale not found',
    });
  }

  next();
};