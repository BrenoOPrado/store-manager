const { findAll } = require('../../models/salesDB');

module.exports = async function validationSalesId(req, res, next) {
  const { id } = req.params;
  const numberId = parseFloat(id);
  const allSales = await findAll();

  if (!allSales[0].some((item) => item.saleId === numberId)) {
    return res.status(404).json({
      message: 'Sale not found',
    });
  }

  next();
};