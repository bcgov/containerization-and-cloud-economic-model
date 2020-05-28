const config = require('config');

const KeycloakAdminService = require('./keycloakAdminService');

const baseUrl = config.get('server.keycloak.serverUrl');
const realm = config.get('server.keycloak.realm');
const adminClientId = config.get('server.keycloak.adminClientId');
const adminClientSecret = config.get('server.keycloak.adminClientSecret');

module.exports.keycloakAdminService = new KeycloakAdminService({baseUrl: baseUrl, realm: realm, clientId: adminClientId, clientSecret: adminClientSecret});
