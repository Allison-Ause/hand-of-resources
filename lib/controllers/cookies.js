const { Router } = require('express');
const { Cookies } = require('../models/Cookies');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Cookies.getById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await Cookies.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
