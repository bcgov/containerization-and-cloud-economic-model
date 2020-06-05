const path = require('path');

const constants = require('./constants');
const Models = require('./models');

const CommonDataService = require('../../common/dataService');
const commonDataService = new CommonDataService(Models.models);

const commonEvents = require('../../common/events');

const commonMiddleware = require('../../common/middleware');

const CommonRouter = require('../../common/router');
const commonRouter = new CommonRouter(constants.SLUG, commonDataService);

const teamEvents = require('../../teammanagement/events');
const TeamRouter = require('../../teammanagement/router');
const teamRouter = new TeamRouter(constants.SLUG);

const AttestationController  = require('../controller').OperationTypesController;
const AttestationDataService  = require('../dataService').OperationTypesDataService;
const AttestationEmailService  = require('../emailService').OperationTypesEmailService;
const AttestationPdfService  = require('../pdfService').PdfService;
const AttestationRouter = require('../router').OperationTypesRouter;

const dataService = new AttestationDataService(Models.models, constants);
const emailService = new AttestationEmailService(dataService, path.join(__dirname, 'assets'));
const pdfService = new AttestationPdfService(dataService, path.join(__dirname, 'assets'));
const formController = new AttestationController(dataService, emailService, pdfService);
const formRouter = new AttestationRouter(constants.SLUG, formController, Models.models);

commonRouter.on(commonEvents.STATUS_CREATED, async (statusUpdate) => {
  emailService.sendStatusAssignmentEmail(statusUpdate);
});

teamRouter.on(teamEvents.ACCESS_REQUESTED, async (accessRequest) => {
  emailService.sendAccessRequestedEmail(accessRequest);
});

// slug will be the paths.
module.exports.mount = (app) => {
  const p = `/${constants.SLUG}`;
  // load the form routes first, allows us to "override" common if we need
  app.use(p, formRouter.routes);
  app.use(p, commonRouter.routes);
  app.use(`${p}/team`, teamRouter.routes);
  app.use(commonMiddleware.dataErrors);
  return p;
};
