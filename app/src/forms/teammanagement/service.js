const keycloakAdminService = require('../../components').keycloakAdminService;
const ROLES = require('../common/constants').ROLES;

const notFoundProblem = keycloakAdminService._notFoundProblem;

class Service {
  constructor(resourceAccess) {
    this._resourceAccess = resourceAccess;
    this._prefix = `comfort-${this._resourceAccess}-`;
    this._groupNames = ROLES.map(r => `${this._prefix}${r}`);
  }

  async getUsers(search) {
    const users = await keycloakAdminService.findUsers(search, true);
    // remove groups that are not for the given resource...
    users.forEach(u => {
      u.groups = u.groups.filter(x => this._groupNames.includes(x.name));
    });
    // remove any users that do not have one of the groups...
    return users.filter(x => x.groups && x.groups.length);
  }

  async getUser(id) {
    const user = await keycloakAdminService.getUser(id, true);
    user.groups = user.groups.filter(x => this._groupNames.includes(x.name));
    if (!user.groups.length) {
      notFoundProblem('user', id);
    }
    return user;
  }

  async getGroups(includeUsers = false) {
    const groups = await keycloakAdminService.findGroups(`${this._prefix}`, includeUsers);
    // just in case some oddly named group comes back...
    // limit to our known groups.
    return groups.filter(x => this._groupNames.includes(x.name));
  }

  async getGroup(id, includeUsers = false) {
    const group = await keycloakAdminService.getGroup(id, includeUsers);
    // check if group is allowed
    if (!this._groupNames.includes(group.name)) {
      notFoundProblem('group', id);
    }
    return group;
  }
}

module.exports = Service;
