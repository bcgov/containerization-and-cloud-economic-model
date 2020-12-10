const express = require('express');
const cstk = require('./src/utils/commonServicesToolkit');

// Express
const app = express();
app.use(express.json());

// Envars
const PORT = process.env.PORT || 3000;

// Temporary envars - TODO: get these values from frontend
const RECIPIENT = process.env.EMAIL_RECIPIENT;
const CONTEXTS = process.env.PATH_CONTEXTS;
const contexts = require(CONTEXTS);

// Send template and contexts, email returned file (spreadsheet)
async function templateToEmail(contexts, recipient) {
  return cstk.templateToEmail(contexts, recipient);
}

app.get('/', (req, res) => {
  res.status(200).send('Cloud Economic Model Backend API');
});

app.get('/_health', (req, res) => {
  res.status(200).send('OK');
});

// Run server
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

// TODO: tie in template/email
// templateToEmail(contexts, RECIPIENT);
