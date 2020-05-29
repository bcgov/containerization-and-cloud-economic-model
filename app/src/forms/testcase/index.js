const Router = require('../teammanagement/router');
const teamRouter = new Router('testcase');

module.exports.mount = (app) => {
  const p = '/testcase';
  app.use(`${p}/team`, teamRouter.routes);
  return p;
};
