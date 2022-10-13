const { findAll } = require('../models/productsDB');

module.exports = async function validationProductId(req, res, next) {
  const { id } = req.params;
  const allProducts = await findAll();

  if (!allProducts[0].some((item) => item.id === Number(id))) {
    return res.status(404).json({
      message: 'Product not found',
    });
  }

  next();
};