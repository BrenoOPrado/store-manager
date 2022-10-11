const conn = require('../db/connection');

const findAll = () => conn.execute('SELECT * FROM products ORDER BY id DESC');

const findById = (id) => conn.execute('SELECT * FROM products WHERE id = ?', [id]);

module.exports = {
  findAll,
  findById,
};