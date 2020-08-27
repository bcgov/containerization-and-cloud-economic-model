const middleware = require('../common/middleware');

class Router {
  constructor(slug, controller, models) {
    this._resourceAccess = `comfort-${slug}`;
    this._controller = controller;
    this._models = models;
    this._routes = require('express').Router();

    this._routes.get('/', middleware.publicRateLimiter, async (req, res, next) => {
      await this._controller.read(req, res, next);
    });

    this._routes.post('/', middleware.hasRole(this._resourceAccess, ['admin']), async (req, res, next) => {
      await this._controller.create(req, res, next);
    });

    this._routes.put('/current', middleware.hasRole(this._resourceAccess, ['admin']), async (req, res, next) => {
      await this._controller.update(req, res, next);
    });

    this._routes.get('/submissions', middleware.hasRole(this._resourceAccess, ['viewer']), async (req, res, next) => {
      await this._controller.searchSubmissions(req, res, next);
    });

    this._routes.post('/submissions', middleware.publicRateLimiter, middleware.currentUser, async (req, res, next) => {
      await this._controller.createSubmission(req, res, next);
    });

    this._routes.put('/submissions/:submissionId', middleware.hasRole(this._resourceAccess, ['editor']), async (req, res, next) => {
      await this._controller.updateSubmission(req, res, next);
    });

    this._routes.delete('/submissions/:submissionId', middleware.hasRole(this._resourceAccess, ['editor']), async (req, res, next) => {
      await this._controller.deleteSubmission(req, res, next);
    });

    this._routes.get('/submissions/:submissionId', middleware.publicRateLimiter, async (req, res, next) => {
      await this._controller.readSubmissionPublic(req, res, next);
    });
  }

  get routes() {
    return this._routes;
  }
}

module.exports.Router = Router;
