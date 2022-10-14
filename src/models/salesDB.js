const conn = require('./db/connection');

const insertSaleDate = () => conn.execute('INSERT INTO sales (date) VALUES (NOW())');

const insertSaleProduct = (saleInfo) => conn
  .execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleInfo.saleId, saleInfo.productId, saleInfo.quantity],
  );

module.exports = {
  insertSaleDate,
  insertSaleProduct,
};