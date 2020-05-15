const routes = require('express').Router();

const controller = require('./controller');

routes.get('/', async (req, res, next) => {
  await controller.read(req, res, next);
});

routes.get('/current', async (req, res, next) => {
  await controller.current(req, res, next);
});

routes.post('/', async (req, res, next) => {
  await controller.create(req, res, next);
});

module.exports = routes;
