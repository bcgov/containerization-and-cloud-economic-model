const constants = require('./constants');
const routes = require('./routes');

module.exports.mount = (app) => {
  const p = `/${constants.SLUG}`;
  app.use(p, routes);
  return p;
};
