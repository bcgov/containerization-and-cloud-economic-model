const constants = require('./constants');
const Models = require('./models');

const CommonDataService = require('../common/dataService');
const commonDataService = new CommonDataService(Models.models);

const commonEvents = require('../common/events');

const commonMiddleware = require('../common/middleware');

const CommonRouter = require('../common/router');
const commonRouter = new CommonRouter(constants.SLUG, commonDataService);

const teamEvents = require('../teammanagement/events');
const TeamRouter = require('../teammanagement/router');
const teamRouter = new TeamRouter(constants.SLUG);

const MyController  = require('./controller').Controller;
const MyDataService  = require('./dataService').FormDataService;
const MyRouter = require('./router').Router;

const dataService = new MyDataService(Models.models, constants);
const formController = new MyController(dataService);
const formRouter = new MyRouter(constants.SLUG, formController, Models.models);

// eslint-disable-next-line no-unused-vars
commonRouter.on(commonEvents.STATUS_CREATED, async (statusUpdate) => {
  // status record created
  // could do something here... like notify assignedTo user.
});

// eslint-disable-next-line no-unused-vars
teamRouter.on(teamEvents.ACCESS_REQUESTED, async (accessRequest) => {
  // someone has asked for access
  // could do something here... like send email to form admin.
});

// slug will be the paths.
//
//  In routes/v1.js, you need to import this module and mount the routes.
//  const cloudeconomicmodel = require('../forms/cloudeconomicmodel');
//  const CloudEconomicModelPath = cloudeconomicmodel.mount(router);
//
//  you can add the path to base v1 response
//
// router.get('/', (_req, res) => {
//   res.status(200).json({
//     endpoints: [
//       '/docs',
//       CloudEconomicModelPath
//     ]
//   });
// });

module.exports.mount = (app) => {
  const p = `/${constants.SLUG}`;
  // load the form routes first, allows us to "override" common if we need
  app.use(p, formRouter.routes);
  app.use(p, commonRouter.routes);
  app.use(`${p}/team`, teamRouter.routes);
  app.use(commonMiddleware.dataErrors);
  return p;
};
