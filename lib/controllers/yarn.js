const { Router } = require('express');
const { Yarn } = require('../models/Yarn');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const singleYarn = await Yarn.getById(req.params.id);
      if (!singleYarn) {
        next();
      }
      res.json(singleYarn);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const yarn = await Yarn.getAll();
      res.json(yarn);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Yarn.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const updatedYarn = await Yarn.updateById(req.params.id, req.body);
      res.json(updatedYarn);
    } catch (e) {
      next(e);
    }
  });
