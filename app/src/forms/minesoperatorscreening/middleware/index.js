module.exports = {
  ...require('../../common/middleware'),
  ...require('./checkRole'),
  ...require('./searchParameters')
};
