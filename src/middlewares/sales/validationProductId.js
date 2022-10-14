const { findAll } = require('../../models/productsDB');

module.exports = async function validationProductId(req, res, next) {
  const { body } = req;

  body.forEach(async (sale) => {
    const { productId } = sale;
    console.log('id na validação:');
    console.log(productId);
    if (!productId || productId === undefined) {
      console.log('entrou no if');
      return res.status(400).json({
        message: '"productId" is required',
      });
    }

    const allProducts = await findAll();
    if (!allProducts[0].some((item) => item.id === productId)) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }
  });
  console.log('passou');
  console.log('---------');
  next();
};