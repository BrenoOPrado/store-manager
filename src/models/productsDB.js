const conn = require('./db/connection');

const findAll = () => conn.execute('SELECT * FROM products ORDER BY id');

const findById = (id) => conn.execute('SELECT * FROM products WHERE id = ?', [id]);

const insert = (name) => conn.execute('INSERT INTO products (name) VALUES (?)', [name]);

const update = ({ name, id }) => conn.execute(
  'UPDATE products SET name = ? WHERE id = ?',
  [name, id],
);

const remove = (id) => conn.execute('DELETE FROM products WHERE id = ?', [id]);

module.exports = {
  findAll,
  findById,
  remove,
  update,
  insert,
};