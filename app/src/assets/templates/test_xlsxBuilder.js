// Requires
const axios = require('axios').default;
const base64 = require('base-64');
const fs = require('fs');
const { Promise } = require('core-js');
const crypto = require('crypto');
const FormData = require('form-data');

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
function getHash(template) {
  return require('crypto').createHash('sha256').update(template).digest('hex');
}

// Is template cached?  True|false
async function isCached(hash) {
  const result = await axios
    .get(`/template/${hash}`)
    .then(() => {
      console.log('Cached: OK');
      return true;
    })
    .catch(() => {
      console.log('Cached: No');
      return false;
    });
}

async function uploadTemplate() {
  try {
    const form = new FormData();
    form.append('template', fs.createReadStream(TEMPLATE));

    const url = `${CDOGS_URL}/template`;
    console.log(arguments.callee.name, `POST to ${url}`);

    const { data, headers, status } = await axios({
      method: 'post',
      url: url,
      data: form,
      headers: {
        'content-type': `multipart/form-data; boundary=${form._boundary}`,
      },
    });
    return { data, headers, status };
  } catch (e) {
    console.log(arguments.callee.name, e);
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
  const template = base64.encode(fs.readFileSync(TEMPLATE, 'binary'));

  // Read and parse contexts
  const contexts = JSON.parse(fs.readFileSync(CONTEXTS, 'utf8'));

  // CDOGS schema with contexts and template (encoded)
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

  // Calculate hash from template
  let hash = await getHash(template);
  console.log('Hash:', hash);

  // Check if template has been cached
  if (!(await isCached(hash))) {
    console.log('Uploading template');
    uploadTemplate();
  }

  // Generate a document from an uploaded template
  const getBack = await apiPost('/template/render', body);
  fs.writeFileSync(OUTPUT, getBack.data);
}

docGenExportToXLSX();
