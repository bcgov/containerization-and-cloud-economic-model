// Requires
const axios = require('axios').default;
const base64 = require('base-64');
const fs = require('fs'); //TODO: remove fs

// Envars (clip url trailing slashes)
const CDOGS_URL = process.env.CS_CDOGS_ENDPOINT.replace(/\/$/, '');
const TEMPLATE = process.env.PATH_TEMPLATE;
const SPREADSHEET = process.env.SPREADSHEET;

// Get token from DocGen SSO
function getToken(url, clientId, clientSecret) {
  // URL query string and config with headers
  const data = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;
  const config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  };

  // Return access token from response
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, config)
      .then((res) => resolve(res.data.access_token))
      .catch((err) => reject(err));
  });
}

// Return a completed document from a template and contexts
async function getDocument(contexts, token) {
  // Setup axios
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  axios.defaults.baseURL = CDOGS_URL;

  // Check CDOGS API health and authentication
  const haCDOGS = await new Promise((resolve, reject) => {
    axios
      .get('/health')
      .then((res) => resolve(res.statusText))
      .catch((err) => reject(err.response.statusText));
  });
  console.log('CDOGS Health/Auth:', haCDOGS);

  // Read contexts and template (base64 encoded), use in CDOGS schema
  const template = base64.encode(fs.readFileSync(TEMPLATE, 'binary'));
  const bodyCDOGS = {
    data: contexts,
    options: {
      overwrite: true,
      reportName: SPREADSHEET,
    },
    template: {
      content: template,
      encodingType: 'base64',
      fileType: 'xlsx',
    },
  };

  // Generate and save template
  const config = { responseType: 'arraybuffer' };
  const spreadsheet = await new Promise((resolve, reject) => {
    axios
      .post('/template/render', bodyCDOGS, config)
      .then((res) => {
        resolve({
          statusText: res.statusText,
          data: res.data,
        });
      })
      .catch((err) => {
        reject({
          statusText: err.statusText,
          data: err.data,
        });
      });
  });
  console.log('CDOGS Generation:', spreadsheet.statusText);
  fs.writeFileSync(SPREADSHEET, spreadsheet.data);
  return spreadsheet;
}

// Exports
exports.getToken = getToken;
exports.getDocument = getDocument;
