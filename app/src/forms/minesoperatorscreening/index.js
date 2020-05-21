const constants = require('./constants');
const middleware = require('./middleware');
const routes = require('./routes');
// slug will be the paths.
module.exports.mount = (app) => {
  const p = `/${constants.SLUG}`;
  app.use(p, routes);
  app.use(middleware.dataErrors);
  return p;
};
