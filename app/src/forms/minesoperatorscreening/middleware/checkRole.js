const auth = require('../../common/middleware/auth');

const RESOURCE_ACCESS = `comfort-${require('../constants').SLUG}`;

module.exports.checkRole = (roles) => {
  return auth.hasRole(RESOURCE_ACCESS, roles);
};
