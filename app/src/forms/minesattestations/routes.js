const routes = require('express').Router();

const controller = require('./controller');
const middleware = require('./middleware');

routes.get('/', async (req, res, next) => {
  await controller.read(req, res, next);
});

routes.post('/', middleware.hasRole(['admin']), async (req, res, next) => {
  await controller.create(req, res, next);
});

routes.get('/current', async (req, res, next) => {
  await controller.current(req, res, next);
});

routes.get('/current/statusCodes', async (req, res, next) => {
  await controller.readCurrentStatusCodes(req, res, next);
});

routes.put('/current/statusCodes', middleware.hasRole(['editor']), async (req, res, next) => {
  await controller.updateCurrentStatusCodes(req, res, next);
});

routes.get('/submissions', middleware.hasRole(['viewer']), middleware.submissionSearch, async (req, res, next) => {
  await controller.searchSubmissions(req, res, next);
});

routes.post('/submissions', middleware.currentUser, async (req, res, next) => {
  await controller.createSubmission(req, res, next);
});

routes.put('/submissions/:submissionId', middleware.hasRole(['editor']), async (req, res, next) => {
  await controller.updateSubmission(req, res, next);
});

routes.get('/submissions/:submissionId', async (req, res, next) => {
  await controller.readSubmission(req, res, next);
});

routes.post('/submissions/:submissionId/statuses', middleware.hasRole(['editor']), async (req, res, next) => {
  await controller.createSubmissionStatus(req, res, next);
});

routes.get('/submissions/:submissionId/statuses', middleware.hasRole(['editor']), async (req, res, next) => {
  await controller.readSubmissionStatuses(req, res, next);
});

routes.post('/submissions/:submissionId/statuses/:statusId/notes', middleware.hasRole(['editor', 'reviewer']), async (req, res, next) => {
  await controller.createSubmissionStatusNote(req, res, next);
});

routes.get('/submissions/:submissionId/statuses/:statusId/notes', middleware.hasRole(['viewer']), async (req, res, next) => {
  await controller.readSubmissionStatusNotes(req, res, next);
});

routes.post('/submissions/:submissionId/notes', middleware.hasRole(['editor', 'reviewer']), async (req, res, next) => {
  await controller.createSubmissionNote(req, res, next);
});

routes.get('/submissions/:submissionId/notes', middleware.hasRole(['viewer']), async (req, res, next) => {
  await controller.readSubmissionNotes(req, res, next);
});


module.exports = routes;
