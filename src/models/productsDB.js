const conn = require('./db/connection');

const findAll = async () => conn.execute('SELECT * FROM StoreManager.products ORDER BY id');

const findById = async (id) => conn.execute('SELECT * FROM products WHERE id = ?', [id]);

const insert = async (name) => conn.execute('INSERT INTO products (name) VALUES (?)', [name]);

const update = async ({ name, id }) => conn.execute(
  'UPDATE products SET name = ? WHERE id = ?',
  [name, id],
);

const remove = async (id) => conn.execute('DELETE FROM products WHERE id = ?', [id]);

module.exports = {
  findAll,
  findById,
  remove,
  update,
  insert,
};