// Requires
const axios = require('axios').default;
const base64 = require('base-64');
const fs = require('fs');
const path = require('path');

// Envars - removing any quotes
const CLIENT_ID = process.env.CLIENT_ID.replace(/['"]+/g, '');
const CLIENT_SECRET = process.env.CLIENT_SECRET.replace(/['"]+/g, '');
if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('CLIENT_ID and CLIENT_SECRET envars must be set');
  process.exit();
}

// Envars - optional
const FILE_NAME = process.env.FILE_NAME || 'results.xlsx';
const EMAIL_SENDER = process.env.EMAIL_SENDER || 'noreply@gov.bc.ca';
const TEMPLATE = process.env.PATH_TEMPLATE || './src/config/template.xlsx';

// URLs default to Common Services' dev APIs
const TOKEN_URL = (
  process.env.TOKEN_URL ||
  'https://dev.oidc.gov.bc.ca/auth/realms/jbd6rnxw/protocol/openid-connect/token'
).replace(/\/$/, '');
const CDOGS_URL = (
  process.env.CDOGS_URL || 'https://cdogs-dev.pathfinder.gov.bc.ca/api/v2'
).replace(/\/$/, '');
const CHES_URL = (
  process.env.CHES_URL || 'https://ches-dev.pathfinder.gov.bc.ca/api/v1'
).replace(/\/$/, '');

// Get token from DocGen SSO
function getToken() {
  // URL query string and config with headers
  const data = `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
  const config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  };
  // Return access token from response
  return new Promise((resolve, reject) => {
    axios
      .post(TOKEN_URL, data, config)
      .then((res) => resolve(res.data.access_token))
      .catch((err) => {
        console.log(arguments.callee.name, err.response.data);
        reject(err);
      });
  });
}

// Return a completed document from a template and contexts
async function getDocument(contexts, optionalToken) {
  // Setup axios
  const token = optionalToken || (await getToken());
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  axios.defaults.baseURL = CDOGS_URL;

  // Read contexts and template (base64 encoded), use in CDOGS schema
  const template = base64.encode(fs.readFileSync(TEMPLATE, 'binary'));
  const fileExt = path.extname(FILE_NAME).replace(/^./, '');

  const body = {
    data: contexts,
    options: {
      overwrite: true,
      reportName: FILE_NAME,
    },
    template: {
      content: template,
      encodingType: 'base64',
      fileType: fileExt,
    },
  };

  // Generate and save file using a template and contexts
  const config = { responseType: 'arraybuffer' };
  return new Promise((resolve, reject) => {
    axios
      .post('/template/render', body, config)
      .then((res) => resolve(res.data))
      .catch((err) => {
        console.log(arguments.callee.name, err.response.data);
        reject(err);
      });
  });
}

// Send a file by email
async function sendFile(file, recipient, optionalToken) {
  // Setup axios
  const token = optionalToken || (await getToken());
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  axios.defaults.baseURL = CHES_URL;

  // Payload
  const attachment = file.toString('base64');
  const email = require('../config/email.json');
  const body = {
    attachments: [
      {
        content: attachment,
        encoding: 'base64',
        filename: FILE_NAME,
      },
    ],
    bodyType: email.bodyType,
    body: email.body,
    delayTS: email.delayTS,
    from: EMAIL_SENDER,
    subject: email.subject,
    to: [recipient],
  };

  // Send email, return file name (by convention)
  const config = { responseType: 'arraybuffer' };
  return new Promise((resolve, reject) => {
    axios
      .post('/email', body, config)
      .then(resolve(FILE_NAME))
      .catch((err) => {
        console.log(arguments.callee.name, err.response.data);
        reject(err);
      });
  });
}

// Create file from template and contexts, send by email
async function renderToEmail(body) {
  const { contexts, recipient } = body;
  const optionalToken = await getToken();
  const file = await getDocument(contexts, optionalToken);
  return sendFile(file, recipient, optionalToken);
}

// Exports
exports.renderToEmail = renderToEmail;
