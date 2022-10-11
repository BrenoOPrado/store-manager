const express = require('express');
const {
  findAll,
  findById,
} = require('../models/productsDB');

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(findAll());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json(findById(id));
});

module.exports = router;