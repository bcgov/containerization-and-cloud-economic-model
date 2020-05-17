const keycloak = require('../../../../src/components/keycloak');

const RESOURCE_ACCESS = 'comfort';

const DEFAULT_USER = {username: 'public', name: 'public', email: undefined};

const getCurrentUserFromToken = token => {
  try {
    const {preferred_username: username, name, email } = token.content;
    return {username: username, name: name, email: email};
  } catch (err) {
    return DEFAULT_USER;
  }
};

const getCurrentUserFromRequest = req => {
  try {
    return getCurrentUserFromToken(req.kauth.grant.access_token);
  } catch (err) {
    return DEFAULT_USER;
  }
};


/**
 * Middleware that adds a currentUser object(name, username, email) to the request.
 *
 * If user is logged in, then it will contain the data from their token.
 * If not logged in, then a default "public" user (no email) will be set instead.
 *
 */

const currentUser = async (req, res, next) => {
  req.currentUser = getCurrentUserFromRequest(req);
  next();
};

/**
 * Return keycloak.protect middleware.
 * Keycloak will authorize if user has ONE of the specified roles in roles parameter.
 * Check against resource_access for comfort.
 * If user has a role, will add the currentUser to the request.
 *
 * @param roles: role name or array or role names
 */
const hasRole = (roles) => {
  // for local development, set the following environment variables and ignore tokens.
  // useful for non-browser tools
  if (process.env.NODE_ENV === 'development' && process.env.IGNORE_RESOURCE_ACCESS === 'true') {
    return (req, res, next) => {
      req.currentUser = {username: 'development', name: 'development', email: 'development@local.dev'};
      next();
    };
  }

  if (!Array.isArray(roles)) {
    roles = [roles];
  }

  const rolecheck = (token, request) => {
    const result = roles.some(r => token.hasRole(`${RESOURCE_ACCESS}:${r}`));
    if (result) request.currentUser = getCurrentUserFromToken(token);
    return result;
  };
  // return the keycloak middleware that will check against these roles...
  return keycloak.protect(rolecheck);
};

module.exports.currentUser = currentUser;
module.exports.hasRole = hasRole;
