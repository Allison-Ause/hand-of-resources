const { Router } = require('express');
const { Yarn } = require('../models/Yarn');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const yarn = await Yarn.getAll();
    console.log('yarn from getAll', yarn);
    return res.json(yarn);
  } catch (e) {
    next(e);
  }
});
