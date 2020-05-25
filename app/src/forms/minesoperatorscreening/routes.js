const routes = require('express').Router();

const controller = require('./controller');
const middleware = require('./middleware');

routes.get('/', middleware.publicRateLimiter, async (req, res, next) => {
  await controller.read(req, res, next);
});

routes.post('/', middleware.checkRole(['admin']), async (req, res, next) => {
  await controller.create(req, res, next);
});

routes.get('/current', middleware.publicRateLimiter, async (req, res, next) => {
  await controller.current(req, res, next);
});

routes.put('/current', middleware.checkRole(['admin']), async (req, res, next) => {
  await controller.update(req, res, next);
});

routes.get('/current/statusCodes', middleware.publicRateLimiter, async (req, res, next) => {
  await controller.readCurrentStatusCodes(req, res, next);
});

routes.put('/current/statusCodes', middleware.checkRole(['reviewer']), async (req, res, next) => {
  await controller.updateCurrentStatusCodes(req, res, next);
});

routes.get('/submissions', middleware.checkRole(['viewer']), middleware.submissionSearch, async (req, res, next) => {
  await controller.searchSubmissions(req, res, next);
});

routes.post('/submissions', middleware.publicRateLimiter, middleware.currentUser, async (req, res, next) => {
  await controller.createSubmission(req, res, next);
});

routes.put('/submissions/:submissionId', middleware.checkRole(['editor']), async (req, res, next) => {
  await controller.updateSubmission(req, res, next);
});

routes.get('/submissions/:submissionId', middleware.publicRateLimiter, async (req, res, next) => {
  await controller.readSubmissionPublic(req, res, next);
});

routes.get('/submissions/:submissionId/pdf', middleware.publicRateLimiter, async (req, res, next) => {
  await controller.generateSubmissionPdf(req, res, next);
});

routes.post('/submissions/email', middleware.publicRateLimiter, async (req, res, next) => {
  await controller.sendSubmissionEmail(req, res, next);
});

routes.post('/submissions/:submissionId/statuses', middleware.checkRole(['reviewer']), async (req, res, next) => {
  await controller.createSubmissionStatus(req, res, next);
});

routes.get('/submissions/:submissionId/statuses', middleware.checkRole(['viewer']), async (req, res, next) => {
  await controller.readSubmissionStatuses(req, res, next);
});

routes.post('/submissions/:submissionId/statuses/:statusId/notes', middleware.checkRole(['reviewer']), async (req, res, next) => {
  await controller.createSubmissionStatusNote(req, res, next);
});

routes.get('/submissions/:submissionId/statuses/:statusId/notes', middleware.checkRole(['viewer']), async (req, res, next) => {
  await controller.readSubmissionStatusNotes(req, res, next);
});

routes.post('/submissions/:submissionId/notes', middleware.checkRole(['reviewer']), async (req, res, next) => {
  await controller.createSubmissionNote(req, res, next);
});

routes.get('/submissions/:submissionId/notes', middleware.checkRole(['viewer']), async (req, res, next) => {
  await controller.readSubmissionNotes(req, res, next);
});

routes.get('/settings', middleware.checkRole(['viewer']), async (req, res, next) => {
  await controller.allSettings(req, res, next);
});

routes.post('/settings', middleware.checkRole(['admin']), async (req, res, next) => {
  await controller.createSettings(req, res, next);
});

routes.get('/settings/:name', middleware.checkRole(['viewer']), async (req, res, next) => {
  await controller.readSettings(req, res, next);
});

routes.put('/settings/:name', middleware.checkRole(['admin']), async (req, res, next) => {
  await controller.updateSettings(req, res, next);
});

module.exports = routes;
