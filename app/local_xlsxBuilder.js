// Requires
const cstk = require('./src/utils/commonServicesToolkit');
const axios = require('axios').default;
const { Promise } = require('core-js');

// Envars (clip url trailing slashes)
const CLIENT_ID = process.env.CMNSRV_CLIENTID;
const CLIENT_SECRET = process.env.CMNSRV_CLIENTSECRET;
const TOKEN_URL = process.env.KEYCLOAK_OIDC_ENDPOINT.replace(/\/$/, '');
const CHES_URL = process.env.CS_CHES_ENDPOINT.replace(/\/$/, '');
const CONTEXTS = process.env.PATH_CONTEXTS;
const SPREADSHEET = process.env.SPREADSHEET;
const SENDER = process.env.EMAIL_SENDER;
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
  const config = { responseType: 'arraybuffer' };
  await axios
    .post('/email', bodyCHES, config)
    .then((res) => {
      console.log('CHES Email:', res.statusText);
    })
    .catch((err) => {
      console.log(err.response.statusText);
    });
}

templateToEmail();
