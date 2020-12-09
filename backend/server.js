const http = require('http');

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

server.listen(3000);

console.log('Listening on port 3000...');
