// Requires
const axios = require('axios').default;
const base64 = require('base-64');
const fs = require('fs');
const { Promise } = require('core-js');

// Envars (clip url trailing slashes)
const CLIENT_ID = process.env.CMNSRV_CLIENTID;
const CLIENT_SECRET = process.env.CMNSRV_CLIENTSECRET;
const TOKEN_URL = process.env.KEYCLOAK_OIDC_ENDPOINT.replace(/\/$/, '');
const CDOGS_URL = process.env.CS_CDOGS_ENDPOINT.replace(/\/$/, '');
const CONTEXTS = process.env.PATH_CONTEXTS;
const TEMPLATE = process.env.PATH_TEMPLATE;
const OUTPUT = process.env.PATH_OUTPUT;

// Get token from DocGen SSO
function getDocGenToken() {
  // URL query string and config with headers
  const data = `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
  const config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  };

  // Return access token from response
  return new Promise((resolve) => {
    axios
      .post(TOKEN_URL, data, config)
      .then((res) => {
        resolve(res.data.access_token);
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

// Accepts a data dict and a path to an xlsx template and makes a request to CDOGS.
// Returns the response content object that can be added to a starlette.responses.Response.
async function docGenExportToXLSX() {
  // Get auth token and setup Axios defaults
  const token = await getDocGenToken();
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  axios.defaults.baseURL = CDOGS_URL;

  // Check CDOGS API health and authentication
  const haCheck = await new Promise((resolve) => {
    axios
      .get('/health')
      .then((res) => {
        resolve(res.statusText);
      })
      .catch((err) => {
        resolve(err.response.statusText);
      });
  });
  console.log('Health/Auth:', haCheck);

  // Read contexts and template (base64 encoded), use in CDOGS schema
  const template = base64.encode(fs.readFileSync(TEMPLATE, 'binary'));
  const contexts = JSON.parse(fs.readFileSync(CONTEXTS, 'utf8'));
  const body = {
    data: contexts,
    options: {
      overwrite: true,
      reportName: OUTPUT,
    },
    template: {
      content: template,
      encodingType: 'base64',
      fileType: 'xlsx',
    },
  };

  // Generate and save template
  const config = { responseType: 'arraybuffer' };
  await axios
    .post('/template/render', body, config)
    .then((res) => {
      fs.writeFileSync(OUTPUT, res.data);
    })
    .catch((err) => {
      console.log(err.response.statusText);
    });
}

docGenExportToXLSX();
