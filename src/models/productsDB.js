const conn = require('./db/connection');

const findAll = () => conn.execute('SELECT * FROM products ORDER BY id');

const findById = (id) => conn.execute('SELECT * FROM products WHERE id = ?', [id]);

const insert = (name) => conn.execute('INSERT INTO products (name) VALUES (?)', [name]);

module.exports = {
  findAll,
  findById,
  insert,
};