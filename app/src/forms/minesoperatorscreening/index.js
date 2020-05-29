const constants = require('./constants');
const middleware = require('./middleware');
const routes = require('./routes');

const emailService = require('./emailService');

const Router = require('../teammanagement/router');
const teamRouter = new Router(constants.SLUG);

teamRouter.on('onAccessRequest', () => {
  emailService.sendAccessRequestedEmail();
});

// slug will be the paths.
module.exports.mount = (app) => {
  const p = `/${constants.SLUG}`;
  app.use(p, routes);
  app.use(`${p}/team`, teamRouter.routes);
  app.use(middleware.dataErrors);
  return p;
};
