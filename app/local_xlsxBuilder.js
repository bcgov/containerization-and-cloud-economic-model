// Requires
const cstk = require('./src/utils/commonServicesToolkit');
const axios = require('axios').default;
const { Promise } = require('core-js');

// Envars (clip url trailing slashes)
const CLIENT_ID = process.env.CMNSRV_CLIENTID;
const CLIENT_SECRET = process.env.CMNSRV_CLIENTSECRET;
const TOKEN_URL = process.env.KEYCLOAK_OIDC_ENDPOINT.replace(/\/$/, '');
const CONTEXTS = process.env.PATH_CONTEXTS;
const RECIPIENT = process.env.EMAIL_RECIPIENT;

// Accepts a data dict and a path to an xlsx template and makes a request to CDOGS.
// Returns the response content object that can be added to a starlette.responses.Response.
async function templateToEmail() {
  // Get auth token and setup Axios defaults
  const token = await cstk.getToken(TOKEN_URL, CLIENT_ID, CLIENT_SECRET);
  axios.defaults.headers.Authorization = `Bearer ${token}`;

  // Send template and contexts, receive completed spreadsheet
  const contexts = require(CONTEXTS);
  const spreadsheet = await cstk.getDocument(contexts, token);

  // Send spreadsheet by email
  const checkSend = await cstk.sendFile(spreadsheet.data, RECIPIENT, token);
  console.log(checkSend);
}

templateToEmail();
