const Controller = require('./controller');

const middleware = require('../common/middleware');

class Router {
  constructor(resourceAccess) {
    this._controller = new Controller(resourceAccess);
    this._clientName = `comfort-${resourceAccess}`;
    this._routes = require('express').Router();

    this._routes.post('/access', middleware.currentUser, async (req, res, next) => {
      await this._controller.processAccessRequest(req, res, next);
    });

    this._routes.get('/users', middleware.hasRole(this._clientName, 'admin'), async (req, res, next) => {
      await this._controller.readUsers(req, res, next);
    });

    this._routes.get('/users/:userId', middleware.hasRole(this._clientName, 'admin'), async (req, res, next) => {
      await this._controller.readUser(req, res, next);
    });

    this._routes.get('/users/:userId/roles', middleware.hasRole(this._clientName, 'admin'), async (req, res, next) => {
      await this._controller.readUserRoles(req, res, next);
    });

    this._routes.put('/users/:userId/roles', middleware.hasRole(this._clientName, 'admin'), async (req, res, next) => {
      await this._controller.updateUserRoles(req, res, next);
    });

    this._routes.get('/roles', middleware.hasRole(this._clientName, 'admin'), async (req, res, next) => {
      await this._controller.readRoles(req, res, next);
    });

    this._routes.get('/roles/:roleId', middleware.hasRole(this._clientName, 'admin'), async (req, res, next) => {
      await this._controller.readRole(req, res, next);
    });

    this._routes.get('/roles/:roleId/users', middleware.hasRole(this._clientName, 'admin'), async (req, res, next) => {
      await this._controller.readRoleUsers(req, res, next);
    });

    this._routes.put('/roles/:roleId/users', middleware.hasRole(this._clientName, 'admin'), async (req, res, next) => {
      await this._controller.updateRoleUsers(req, res, next);
    });
  }

  get routes() {
    return this._routes;
  }
}

module.exports = Router;
