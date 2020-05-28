const Controller = require('./controller');

class Router {
  constructor(resourceAccess) {
    this._controller = new Controller(resourceAccess);
    this._routes = require('express').Router();

    this._routes.get('/users', async (req, res, next) => {
      await this._controller.readUsers(req, res, next);
    });

    this._routes.get('/users/:userId', async (req, res, next) => {
      await this._controller.readUser(req, res, next);
    });

    this._routes.get('/groups', async (req, res, next) => {
      await this._controller.readGroups(req, res, next);
    });

    this._routes.get('/groups/:groupId', async (req, res, next) => {
      await this._controller.readGroup(req, res, next);
    });
  }

  get routes() {
    return this._routes;
  }
}

module.exports = Router;
