const routes = require('express').Router();

const controller = require('./controller');
const middleware = require('./middleware');

routes.get('/', middleware.publicRateLimiter, middleware.formSearch, async (req, res, next) => {
  await controller.search(req, res, next);
});

routes.get('/:slug', middleware.publicRateLimiter, async (req, res, next) => {
  await controller.fetch(req, res, next);
});

module.exports = routes;
