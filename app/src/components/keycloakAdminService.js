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

const trimGroupData = (data, nullDataValue = []) => {
  if (!data) return nullDataValue;

  const trim = g => {
    // only return id, username, firstName, lastName, email
    return (({ id, name }) => ({ id, name }))(g);
  };
  if (Array.isArray(data)) {
    return data.map(g => trim(g));
  }
  return trim(data);
};

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

  _notFoundProblem(type, id) {
    throw new Problem(404, 'Not found', {detail: `Could not find ${type} with id ${id}.`});
  }

  async _findGroup(id) {
    const result = await this._kcAdminClient.groups.findOne({id: id});
    if (!result) {
      this._notFoundProblem('group', id);
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

  async findUsers(search, includeGroups = false) {
    try {
      const result = await this._kcAdminClient.users.find({search: search});
      const users = trimUserData(result);
      if (includeGroups) {
        for (const u of users) {
          const groups = await this._kcAdminClient.users.listGroups({id: u.id});
          u.groups = trimGroupData(groups);
        }
      }
      return users;
    } catch (err) {
      errorToProblem(SERVICE, err);
    }
  }

  async getUser(id, includeGroups = false) {
    try {
      const result = await this._findUser(id);
      const user = trimUserData(result);
      user.groups = [];
      if (includeGroups) {
        const groups = await this._kcAdminClient.users.listGroups({id: id, });
        user.groups = trimGroupData(groups);
      }
      return user;
    } catch(err) {
      errorToProblem(SERVICE, err);
    }
  }

  async findGroups(search, includeUsers = false) {
    try {
      const result = await this._kcAdminClient.groups.find({search: search});
      const groups = trimGroupData(result);
      if (includeUsers) {
        for (const g of groups) {
          const users = await this._kcAdminClient.groups.listMembers({id: g.id});
          g.users = trimUserData(users);
        }
      }
      return groups;
    } catch(err) {
      errorToProblem(SERVICE, err);
    }
  }

  async getGroup(id, includeUsers = false) {
    try {
      const result = await this._findGroup(id);
      const group = trimGroupData(result);
      group.users = [];
      if (includeUsers) {
        const users = await this._kcAdminClient.groups.listMembers({id: id});
        group.users = trimUserData(users);
      }
      return group;
    } catch(err) {
      errorToProblem(SERVICE, err);
    }
  }

}

module.exports = KeycloakAdminService;
