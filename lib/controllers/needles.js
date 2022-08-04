const { Router } = require('express');
const { Needles } = require('../models/Needles');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Needles.getById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await Needles.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Needles.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
