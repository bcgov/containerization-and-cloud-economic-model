const path = require('path');

const constants = require('./constants');

const CommonDataService = require('../common/dataService');
const commonDataService = new CommonDataService(require('./models').commonModels);

const commonEvents = require('../common/events');

const CommonRouter = require('../common/router');
const commonRouter = new CommonRouter(constants.SLUG, commonDataService);

const teamEvents = require('../teammanagement/events');
const TeamRouter = require('../teammanagement/router');
const teamRouter = new TeamRouter(constants.SLUG);

const dataService = require('./dataService');

const EmailService = require('./emailService');
const emailService = new EmailService(commonDataService, dataService, path.join(__dirname, 'assets'));

const PdfService = require('./pdfService');
const pdfService = new PdfService(commonDataService, path.join(__dirname, 'assets'));

const FormController = require('./controller');
const controller = new FormController(commonDataService, dataService, emailService, pdfService);

const FormRouter = require('./router');
const formRouter = new FormRouter(constants.SLUG, controller);

const middleware = require('./middleware');

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
  app.use(middleware.dataErrors);
  return p;
};
