const keycloakAdminService = require('../../components').keycloakAdminService;

const DEFAULT_REQUEST_ROLE = require('../common/constants').DEFAULT_REQUEST_ROLE;

const notFoundProblem = keycloakAdminService._notFoundProblem;
const throwProblem = keycloakAdminService._problem;

class Service {
  constructor(resourceAccess) {
    this._resourceAccess = resourceAccess;
    this._clientName = `comfort-${this._resourceAccess}`;
    this._clientId = null;
  }

  async processAccessRequest(accessRequest, user) {
    if (!user || !user.email) {
      throwProblem(401,'Unauthorized','No current user in request.');
    }
    const requestAccessRole = accessRequest ? (accessRequest.role || DEFAULT_REQUEST_ROLE)  : DEFAULT_REQUEST_ROLE;
    const users = await keycloakAdminService.findUsers(user.email);
    // let's just make sure we work on the right user...
    if (!users.length) {
      throwProblem(404,'Not found',`User not found with email ${user.email}.`);
    }
    if (users.length > 0) {
      throwProblem(500,'Unique email not found',`Unique user not found with email ${user.email}, cannot proceed.`);
    }
    if (users[0].email !== user.email) {
      throwProblem(500,'Unexpected Result',`Error found with email search of ${user.email}, but returned user with email ${users[0].email}.`);
    }
    // ok, get this client and the role we want to place user in.
    const client = await this.getClient();
    const role = await keycloakAdminService.getClientRoleByName(client.id, requestAccessRole);
    // put them in the role!
    await keycloakAdminService.addClientRoleMappings(this._clientId, users, [role]);
    return await this.getUser(users[0].id);
  }


  async getClient(includeRoles = false, includeUsers = false, includeUserRoles = false) {
    if (!this._clientId) {
      const clients = await keycloakAdminService.findClients(this._clientName);
      if (!clients || !clients.length) {
        notFoundProblem('client', this._clientName);
      }
      this._clientId = clients[0].id;
    }
    const client = await keycloakAdminService.getClient(this._clientId, includeRoles, includeUsers, includeUserRoles);
    // from roles... only return the roles that we use for assignment.
    client.roles = client.roles.filter(x => x.composite);
    return client;
  }

  async getUsers(includeRoles = false) {
    const client = await this.getClient(true, true, includeRoles );
    const users = new Map();
    client.roles.forEach(r => {
      r.users.forEach(u => users.set(u.id, u));
    });
    return [...users.values()];
  }

  async getUser(id) {
    const client = await this.getClient();
    const user = await keycloakAdminService.getClientUser(client.id, id, true);
    if (!user) {
      notFoundProblem('user', id);
    }
    return user;
  }

  async getUserRoles(id) {
    const user = await this.getUser(id);
    return user.roles;
  }

  async updateUserRoles(id, roles) {
    const user = await this.getUser(id);

    if (!Array.isArray(roles)) {
      roles = [roles];
    }
    if (roles.length > 1) {
      throwProblem(422, 'Validation Error', 'User can only be in a single role.');
    }

    // since a user can be in only one role, we remove them from their current roles
    await keycloakAdminService.removeClientRoleMappings(this._clientId, [user], user.roles);

    // now we put them in the new role (if specified)
    let assignedRoles = [];
    if (roles.length) {
      assignedRoles = [await this.getRole(roles[0].id)];
    }
    await keycloakAdminService.addClientRoleMappings(this._clientId, [user], assignedRoles);

    // return their current set of roles...
    return await this.getUserRoles(id);
  }

  async getRoles(includeUsers = false) {
    const client = await this.getClient(true, includeUsers);
    return client.roles;
  }

  async getRole(id) {
    const roles = await this.getRoles(true);
    const role = roles.find(x => x.id === id);
    if (!role) {
      notFoundProblem('role', id);
    }
    return role;
  }

  async getRoleUsers(id) {
    const role = await this.getRole(id);
    return role.users;
  }

  async updateRoleUsers(id, users) {
    // here we limit the users to a single role...
    const allRoles = await this.getRoles(false);
    const role = await this.getRole(id);

    // remove all the current users from this role...
    const currentRoleUsers = await this.getRoleUsers(id);
    await keycloakAdminService.removeClientRoleMappings(this._clientId, currentRoleUsers, [role]);

    // remove these users from all other roles (they can have only one role)
    await keycloakAdminService.removeClientRoleMappings(this._clientId, users, allRoles);

    // now, add the specified users to this role
    await keycloakAdminService.addClientRoleMappings(this._clientId, users, [role]);

    // return the current set of users in this role.
    return await this.getRoleUsers(id);
  }

}

module.exports = Service;
