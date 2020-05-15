const routes = require('express').Router();

const controller = require('./controller');

routes.get('/', async (req, res, next) => {
  await controller.search(req, res, next);
});

routes.get('/:slug', async (req, res, next) => {
  await controller.fetch(req, res, next);
});

module.exports = routes;
