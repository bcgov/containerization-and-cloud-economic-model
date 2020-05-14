const routes = require('express').Router();

const controller = require('./controller');

routes.get('/', async (req, res, next) => {
  await controller.all(req, res, next);
});

routes.get('/:formId', async (req, res, next) => {
  await controller.read(req, res, next);
});

routes.post('/', async (req, res, next) => {
  await controller.create(req, res, next);
});

module.exports = routes;
