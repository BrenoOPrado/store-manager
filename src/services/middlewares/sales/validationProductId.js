const { findById } = require('../../../models/productsDB');

module.exports = async function validationProductId(req, res, next) {
  const { body } = req;

  const empty = body.some((item) => !item.productId || !item.productId === undefined);
  if (empty) {
    return res.status(400).json({
      message: '"productId" is required',
    });
  }

  const promises = body.map((sale) => findById(sale.productId));
  const result = await Promise.all(promises);
  const notFound = result.some(([[item]]) => !item);

  if (notFound) {
    return res.status(404).json({
      message: 'Product not found',
    });
  }

  next();
};