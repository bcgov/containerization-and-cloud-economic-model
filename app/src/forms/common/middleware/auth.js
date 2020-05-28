const keycloak = require('../../../../src/components/keycloak');

const DEFAULT_USER = {username: 'public', name: 'public', email: undefined};
const DEFAULT_RESOURCES = [];

const IGNORE_RESOURCES = ['comfort', 'comfort-frontend', 'comfort-frontend-local'];

const getCurrentUserFromToken = token => {
  try {
    const {preferred_username: username, name, email } = token.content;
    return {username: username, name: name, email: email};
  } catch (err) {
    return DEFAULT_USER;
  }
};

const getComfortResourcesFromToken = token => {
  try {
    const forms = Object.keys(token.content.resource_access).filter(x => x.startsWith('comfort-') && !IGNORE_RESOURCES.includes(x));
    return forms;
  } catch (err) {
    return DEFAULT_RESOURCES;
  }
};

const getCurrentUserFromRequest = req => {
  try {
    return getCurrentUserFromToken(req.kauth.grant.access_token);
  } catch (err) {
    return DEFAULT_USER;
  }
};

const getComfortResourcesFromRequest = req => {
  try {
    return getComfortResourcesFromToken(req.kauth.grant.access_token);
  } catch (err) {
    return DEFAULT_RESOURCES;
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
  req.comfortResources = getComfortResourcesFromRequest(req);
  next();
};

/**
 * Return keycloak.protect middleware.
 * Keycloak will authorize if user has ONE of the specified roles in roles parameter.
 * Check against a specified resource_access (ex. comfort-minesattestations).
 * If user has a role, will add the currentUser to the request.
 *
 * @param resourceAccess: what resource_access to check roles against
 * @param roles: role name or array or role names
 */
const hasRole = (resourceAccess, roles) => {
  // for local development, set the following environment variables and ignore tokens.
  // useful for non-browser tools
  if (process.env.NODE_ENV === 'development' && process.env.IGNORE_RESOURCE_ACCESS === 'true') {
    return (req, res, next) => {
      req.currentUser = {username: 'development', name: 'development', email: 'development@local.dev'};
      req.comfortResources = ['comfort-minesoperatorscreening'];
      next();
    };
  }

  if (!Array.isArray(roles)) {
    roles = [roles];
  }

  const rolecheck = (token, request) => {
    const result = roles.some(r => token.hasRole(`${resourceAccess}:${r}`));
    if (result) {
      request.currentUser = getCurrentUserFromToken(token);
      request.comfortResources = getComfortResourcesFromToken(token);
    }
    return result;
  };
  // return the keycloak middleware that will check against these roles...
  return keycloak.protect(rolecheck);
};

module.exports.currentUser = currentUser;
module.exports.hasRole = hasRole;
