const { Issuer } = require('openid-client');
const KeycloakAdminClient = require('keycloak-admin').default;
const log = require('npmlog');
const Problem = require('api-problem');

const errorToProblem = require('./errorToProblem');

const refreshToken = (svc) => setInterval(async () => {
  // just in case we didn't go through the initialization phase.
  if (!svc._initialized) {
    await svc.initialize();
  }
  const refreshToken = svc._tokenSet.refresh_token;
  svc._tokenSet = await svc._client.refresh(refreshToken);
  svc._kcAdminClient.setAccessToken(svc._tokenSet.access_token);
}, 58 * 1000); // 58 seconds

const trimUserData = (data, nullDataValue = []) => {
  if (!data) return nullDataValue;

  const trim = u => {
    // only return id, username, firstName, lastName, email
    return (({ id, username, firstName, lastName, email }) => ({ id, username, firstName, lastName, email }))(u);
  };
  if (Array.isArray(data)) {
    return data.map(u => trim(u));
  }
  return trim(data);
};

const trimClientData = (data, nullDataValue = []) => {
  if (!data) return nullDataValue;

  const trim = u => {
    return (({ id, clientId, name, description }) => ({ id, clientId, name, description }))(u);
  };
  if (Array.isArray(data)) {
    return data.map(u => trim(u));
  }
  return trim(data);
};

const SERVICE = 'Keycloak';

class KeycloakAdminService {
  constructor({ baseUrl, realm, clientId, clientSecret }) {
    log.verbose('KeycloakAdminService', `Constructed with ${baseUrl}, ${realm}, ${clientId}, clientSecret`);
    if (!baseUrl || !realm || !clientId || !clientSecret) {
      log.error('KeycloakAdminService', 'Invalid configuration.');
      throw new Error('KeycloakAdminService is not configured. Check configuration.');
    }

    this._baseUrl = baseUrl;
    this._realm = realm;
    this._clientId = clientId;
    this._clientSecret = clientSecret;
    this._issuerUrl = `${this._baseUrl}/realms/${this._realm}`;
    this._grantType = 'client_credentials';

    this._initialized = false;
    this._keycloakIssuer = null;
    this._client = null;
    this._tokenSet = null;

    this._kcAdminClient = new KeycloakAdminClient({
      baseUrl: this._baseUrl,
      realmName: this._realm
    });
    this.initialize();
  }

  async initialize() {
    if (!this._initialized) {
      // try to do a straight initialization of the client with configured credentials.
      // service should be good to go right away.
      try {
        await this._kcAdminClient.auth({
          grantType: this._grantType,
          clientId: this._clientId,
          clientSecret: this._clientSecret
        });
      } catch (err) {
        log.error('KeycloakAdminService.initialize', `Error during authorization of service credentials: ${err.message}`);
        return false;
      }
      //
      // now, get set up so we can keep refreshing the token for realm admin service...
      //
      try {
        this._keycloakIssuer = await Issuer.discover(this._issuerUrl);
      } catch (err) {
        log.error('KeycloakAdminService.initialize', `Error during discovery of issuer: ${err.message}`);
        return false;
      }

      try {
        this._client = new this._keycloakIssuer.Client({
          client_id: this._clientId,
          client_secret: this._clientSecret
        });
      } catch (err) {
        log.error('KeycloakAdminService.initialize', `Error creating client: ${err.message}`);
        return false;
      }

      try {
        this._tokenSet = await this._client.grant({
          grant_type: this._grantType,
          client_id: this._clientId,
          client_secret: this._clientSecret
        });
      } catch (err) {
        log.error('KeycloakAdminService.initialize', `Error getting tokens: ${err.message}`);
        return false;
      }
      this._initialized = true;
      refreshToken(this); // start the token auto-refresh
    }
    return this._initialized;
  }

  _problem(status, title, detail) {
    throw new Problem(status, title, {detail: detail});
  }

  _notFoundProblem(type, id) {
    throw new Problem(404, 'Not found', {detail: `Could not find ${type} with id ${id}.`});
  }

  async _findClient(id) {
    const result = await this._kcAdminClient.clients.findOne({id: id});
    if (!result) {
      this._notFoundProblem('client', id);
    }
    return result;
  }

  async _findRole(id) {
    const result = await this._kcAdminClient.roles.findOneById({id: id});
    if (!result) {
      this._notFoundProblem('role', id);
    }
    return result;
  }

  async _findUser(id) {
    const result = await this._kcAdminClient.users.findOne({id: id});
    if (!result) {
      this._notFoundProblem('user', id);
    }
    return result;
  }

  async findClients(name, includeRoles = false) {
    try {
      let result = await this._kcAdminClient.clients.find();
      let clients = trimClientData(result);
      if (name) {
        clients = clients.filter(x => x.clientId === name);
      }
      if (includeRoles) {
        for (const c of clients) {
          const roles = await this._kcAdminClient.clients.listRoles({id: c.id});
          c.roles = roles;
        }
      }
      return clients;
    } catch (err) {
      errorToProblem(SERVICE, err);
    }
  }

  async getClient(id, includeRoles = false, includeUsers = false, includeUserRoles = false) {
    try {
      const result = await this._findClient(id);
      const client = trimClientData(result);
      client.roles = [];
      if (includeRoles) {
        client.roles = await this._kcAdminClient.clients.listRoles({id: id});
        for (const r of client.roles) {
          r.users = [];
          if (includeUsers) {
            const users = await this._kcAdminClient.clients.findUsersWithRole({id: id, roleName: r.name});
            r.users = trimUserData(users);
            for (const ur of r.users) {
              ur.roles =[];
              if (includeUserRoles) {
                ur.roles = await this._kcAdminClient.users.listClientRoleMappings({id: ur.id, clientUniqueId: id});
              }
            }
          }
        }
      }
      return client;
    } catch(err) {
      errorToProblem(SERVICE, err);
    }
  }

  async findUsers(search) {
    try {
      const result = await this._kcAdminClient.users.find({search: search});
      return trimUserData(result);
    } catch (err) {
      errorToProblem(SERVICE, err);
    }
  }

  async getUser(id) {
    try {
      const result = await this._findUser(id);
      return trimUserData(result);
    } catch(err) {
      errorToProblem(SERVICE, err);
    }
  }

  async getClientUser(clientId, userId, includeRoles = false) {
    try {
      const result = await this._findUser(userId);
      const user = trimUserData(result);
      if (includeRoles) {
        user.roles = await this._kcAdminClient.users.listClientRoleMappings({id: userId, clientUniqueId: clientId});
      }
      return user;
    } catch(err) {
      errorToProblem(SERVICE, err);
    }
  }

  async addClientRoleMappings(clientId, users, roles) {
    try {
      const roleList = roles.map(x => (({ id, name }) => ({ id, name }))(x));
      for (const u of users) {
        await this._kcAdminClient.users.addClientRoleMappings({id: u.id, clientUniqueId: clientId, roles: roleList});
      }
    } catch(err) {
      errorToProblem(SERVICE, err);
    }
  }

  async removeClientRoleMappings(clientId, users, roles) {
    try {
      const roleList = roles.map(x => (({ id, name }) => ({ id, name }))(x));
      for (const u of users) {
        await this._kcAdminClient.users.delClientRoleMappings({id: u.id, clientUniqueId: clientId, roles: roleList});
      }
    } catch(err) {
      errorToProblem(SERVICE, err);
    }
  }

  async getClientRoleByName(clientId, name) {
    try {
      const role = await this._kcAdminClient.clients.findRole({id: clientId, roleName: name});
      if (!role) {
        this._notFoundProblem('role', name);
      }
      return role;
    } catch(err) {
      errorToProblem(SERVICE, err);
    }
  }

}

module.exports = KeycloakAdminService;
