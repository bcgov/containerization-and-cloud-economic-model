const http = require('http');
const cstk = require('./src/utils/commonServicesToolkit');

// Envars
const PORT = process.env.PORT || 3000;

// Temporary envars - TODO: get these values from frontend
const CONTEXTS = process.env.PATH_CONTEXTS;
const RECIPIENT = process.env.EMAIL_RECIPIENT;
const contexts = require(CONTEXTS);

async function runServer() {
  const server = http.createServer((req, res) => {
    if (req.url === '/') {
      res.write('CEM backend API');
      const spreadsheet = templateToEmail(contexts, RECIPIENT);
      console.log(spreadsheet);
      res.end();
    }
    if (req.url === '/_health') {
      res.write('OK');
      res.end();
    }
  });

  server.listen(PORT);
  console.log(`Listening on port ${PORT}...`);
}

// Send template and contexts, email returned file (spreadsheet)
async function templateToEmail(contexts, recipient) {
  return await cstk.templateToEmail(contexts, recipient);
}

runServer();
