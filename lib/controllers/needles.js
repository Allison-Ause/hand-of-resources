const { Router } = require('express');
const { Needles } = require('../models/Needles');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await Needles.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
