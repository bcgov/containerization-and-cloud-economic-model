const EventEmitter = require('events');

const Controller = require('./controller');
const events = require('./events');
const middleware = require('./middleware');

class Router extends EventEmitter {
  constructor(slug, dataService) {
    super();

    this._controller = new Controller(dataService);
    this._resourceAccess = `comfort-${slug}`;
    this._routes = require('express').Router();

    this._routes.get('/current', middleware.publicRateLimiter, async (req, res, next) => {
      await this._controller.current(req, res, next);
    });

    this._routes.get('/current/statusCodes', middleware.publicRateLimiter, async (req, res, next) => {
      await this._controller.readCurrentStatusCodes(req, res, next);
    });

    this._routes.put('/current/statusCodes', middleware.hasRole(this._resourceAccess, 'admin'), async (req, res, next) => {
      await this._controller.updateCurrentStatusCodes(req, res, next);
    });

    this._routes.post('/submissions/:submissionId/statuses', middleware.hasRole(this._resourceAccess, ['reviewer']), async (req, res, next) => {
      await this._controller.createSubmissionStatus(req, res, next);
    });

    this._routes.get('/submissions/:submissionId/statuses', middleware.hasRole(this._resourceAccess, ['viewer']), async (req, res, next) => {
      await this._controller.readSubmissionStatuses(req, res, next);
    });

    this._routes.post('/submissions/:submissionId/statuses/:statusId/notes', middleware.hasRole(this._resourceAccess, ['reviewer']), async (req, res, next) => {
      await this._controller.createSubmissionStatusNote(req, res, next);
    });

    this._routes.get('/submissions/:submissionId/statuses/:statusId/notes', middleware.hasRole(this._resourceAccess, ['viewer']), async (req, res, next) => {
      await this._controller.readSubmissionStatusNotes(req, res, next);
    });

    this._routes.post('/submissions/:submissionId/notes', middleware.hasRole(this._resourceAccess, ['reviewer']), async (req, res, next) => {
      await this._controller.createSubmissionNote(req, res, next);
    });

    this._routes.get('/submissions/:submissionId/notes', middleware.hasRole(this._resourceAccess, ['viewer']), async (req, res, next) => {
      await this._controller.readSubmissionNotes(req, res, next);
    });

    this._routes.get('/settings', middleware.hasRole(this._resourceAccess, ['viewer']), async (req, res, next) => {
      await this._controller.allSettings(req, res, next);
    });

    this._routes.post('/settings', middleware.hasRole(this._resourceAccess, ['admin']), async (req, res, next) => {
      await this._controller.createSettings(req, res, next);
    });

    this._routes.get('/settings/:name', middleware.hasRole(this._resourceAccess, ['viewer']), async (req, res, next) => {
      await this._controller.readSettings(req, res, next);
    });

    this._routes.put('/settings/:name', middleware.hasRole(this._resourceAccess, ['admin']), async (req, res, next) => {
      await this._controller.updateSettings(req, res, next);
    });

    // register and expose events.
    this._controller.on(events.STATUS_CREATED, (result) => {
      this.emit(events.STATUS_CREATED, result);
    });
  }

  get routes() {
    return this._routes;
  }
}

module.exports = Router;
