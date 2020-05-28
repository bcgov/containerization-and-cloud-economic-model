const routes = require('express').Router();

const controller = require('./controller');
const middleware = require('./middleware');

routes.get('/users', middleware.checkRole(['viewer']), async (req, res, next) => {
  await controller.readUsers(req, res, next);
});

routes.get('/users/:userId', middleware.checkRole(['viewer']), async (req, res, next) => {
  await controller.readUser(req, res, next);
});

routes.get('/groups', middleware.checkRole(['viewer']), async (req, res, next) => {
  await controller.readGroups(req, res, next);
});

routes.get('/groups/:groupId', middleware.checkRole(['viewer']), async (req, res, next) => {
  await controller.readGroup(req, res, next);
});

module.exports = routes;
