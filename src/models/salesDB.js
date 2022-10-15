const conn = require('./db/connection');

const findAll = () => conn
  .execute(
    `SELECT sp.sale_id AS saleId,
    sp.product_id AS productId,
    sp.quantity, s.date
    FROM sales_products sp
    INNER JOIN sales s
    ON sp.sale_id = s.id
    ORDER BY sale_id, product_id`,
  );

const findById = (id) => conn
  .execute(
    `SELECT sp.product_id AS productId,
    sp.quantity, s.date
    FROM sales_products sp
    INNER JOIN sales s
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ?
    ORDER BY sale_id, product_id`,
    [id],
  );

const insertSaleDate = async () => conn.execute('INSERT INTO sales (date) VALUES (NOW())');
  
const insertSaleProduct = async (saleInfo) => {
  const promises = saleInfo.itemsSold.map((item) => {
    return conn.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleInfo.id, item.productId, item.quantity],
    );
  });
  await Promise.all(promises);
};

module.exports = {
  findAll,
  findById,
  insertSaleDate,
  insertSaleProduct,
};