// Requires
const cstk = require('./src/utils/commonServicesToolkit');
const axios = require('axios').default;
const base64 = require('base-64');
const fs = require('fs');
const { Promise } = require('core-js');

// Envars (clip url trailing slashes)
const CLIENT_ID = process.env.CMNSRV_CLIENTID;
const CLIENT_SECRET = process.env.CMNSRV_CLIENTSECRET;
const TOKEN_URL = process.env.KEYCLOAK_OIDC_ENDPOINT.replace(/\/$/, '');
const CDOGS_URL = process.env.CS_CDOGS_ENDPOINT.replace(/\/$/, '');
const CHES_URL = process.env.CS_CHES_ENDPOINT.replace(/\/$/, '');
const CONTEXTS = process.env.PATH_CONTEXTS;
const TEMPLATE = process.env.PATH_TEMPLATE;
const SPREADSHEET = process.env.SPREADSHEET;
const SENDER = process.env.EMAIL_SENDER;
const RECIPIENT = process.env.EMAIL_RECIPIENT;

// Accepts a data dict and a path to an xlsx template and makes a request to CDOGS.
// Returns the response content object that can be added to a starlette.responses.Response.
async function docGenExportToXLSX() {
  // Get auth token and setup Axios defaults
  const token = await cstk.getToken(TOKEN_URL, CLIENT_ID, CLIENT_SECRET);
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  axios.defaults.baseURL = CDOGS_URL;

  // Check CDOGS API health and authentication
  const haCDOGS = await new Promise((resolve, reject) => {
    axios
      .get('/health')
      .then((res) => {
        resolve(res.statusText);
      })
      .catch((err) => {
        reject(err.response.statusText);
      });
  });
  console.log('CDOGS Health/Auth:', haCDOGS);

  // Read contexts and template (base64 encoded), use in CDOGS schema
  const template = base64.encode(fs.readFileSync(TEMPLATE, 'binary'));
  const contexts = JSON.parse(fs.readFileSync(CONTEXTS, 'utf8'));
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

  // Check CDOGS API health and authentication
  axios.defaults.baseURL = CHES_URL;
  const haCHES = await new Promise((resolve, reject) => {
    axios
      .get('/health')
      .then((res) => {
        resolve(res.statusText);
      })
      .catch((err) => {
        reject(err.statusText);
      });
  });
  console.log('CHES Health/Auth:', haCHES);

  // Payload
  const attachment = spreadsheet.data.toString('base64');
  const bodyCHES = {
    attachments: [
      {
        content: attachment,
        encoding: 'base64',
        filename: SPREADSHEET,
      },
    ],
    bodyType: 'html',
    body: 'Email message body',
    delayTS: '0',
    from: SENDER,
    subject: 'Email subject',
    to: [RECIPIENT],
  };

  // Send email
  await axios
    .post('/email', bodyCHES, config)
    .then((res) => {
      console.log('CHES Email:', res.statusText);
    })
    .catch((err) => {
      console.log(err.response.statusText);
    });
}

docGenExportToXLSX();
