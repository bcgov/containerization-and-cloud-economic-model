// Requires
const axios = require('axios').default;
const base64 = require('base-64');
const utf8 = require('utf8');
const fs = require('fs');
const { Promise } = require('core-js');
const crypto = require('crypto');

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

// Axios get from CDOGS API
function apiGet(url) {
  return new Promise((resolve) => {
    axios
      .get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err.response.data, url);
      });
  });
}

// Axios post to CDOGS API specifying authentication, content type, encoding and response type
function apiPost(url, data) {
  const config = { responseType: 'arraybuffer' };
  return new Promise((resolve) => {
    axios
      .post(url, data, config)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err.response.data, url);
      });
  });
}

// Create hash based on file input
function getHash() {
  const hash = crypto.createHash('sha256');
  const stream = fs.createReadStream(TEMPLATE);
  return new Promise((resolve, reject) => {
    stream
      .on('readable', () => {
        let chunk;
        while ((chunk = stream.read()) !== null) {
          hash.update(chunk);
        }
      })
      .on('end', () => resolve(hash.digest('hex')))
      .on('error', (err) => reject(err));
  });
}

// Is template cached?  True|false
async function isCached(hash) {
  try {
    await axios.get(`/template/${hash}`);
    return true;
  } catch {
    return false;
  }
}

// Accepts a data dict and a path to an xlsx template and makes a request to CDOGS.
// Returns the response content object that can be added to a starlette.responses.Response.
async function docGenExportToXLSX() {
  // Get auth token and prepare it as an Authorization: Bearer <token> header.
  const token = await getDocGenToken();

  // Setup Axios defaults for default URL and formatting for auth token
  axios.defaults.baseURL = CDOGS_URL;
  axios.defaults.headers.Authorization = `Bearer ${token}`;

  // CDOGS API health check
  console.log('Health:', (await apiGet('/health')).statusText);

  // Read template and encode for upload (UTF-8, base 64)
  const template_data = fs.readFileSync(TEMPLATE, 'utf8');
  const base64_encoded = base64.encode(utf8.encode(template_data));

  // Read and parse contexts
  const contexts = JSON.parse(fs.readFileSync(CONTEXTS, 'utf8'));

  // CDOGS schema with contexts and template (encoded)
  const data = {
    data: contexts,
    options: {
      reportName: OUTPUT,
    },
    template: {
      encodingType: 'base64',
      content: base64_encoded,
      fileType: 'xlsx',
    },
  };

  // Calculate hash from template
  let hash = await getHash();
  console.log('Hash:', hash);

  // Check if hash has been cached
  if (!(await isCached(hash))) {
    console.log('Todo: upload template');
    process.exit();
  }

  // Generate a document from an uploaded template
  const getBack = await apiPost(`/template/${hash}/render`, data);
  fs.writeFileSync(OUTPUT, getBack.data);
}

docGenExportToXLSX();
