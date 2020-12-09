const http = require('http');
const cstk = require('./src/utils/commonServicesToolkit');

// Envars
const PORT = process.env.PORT || 3000;

// Temporary envars - TODO: get these values from frontend
const CONTEXTS = process.env.PATH_CONTEXTS;
const RECIPIENT = process.env.EMAIL_RECIPIENT;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('CEM backend API');
    res.end();
  }
  if (req.url === '/_health') {
    res.write('OK');
    res.end();
  }
});

server.listen(PORT);
console.log(`Listening on port ${PORT}...`);
