const express = require('express');
const cstk = require('./src/utils/commonServicesToolkit');

// Express
const app = express();
app.use(express.json());

// Envars
const TITLE = process.env.TITLE || 'Wrapper and Credential Handler for Common Services APIs';
const PORT = process.env.PORT || 3000;

// Receive contexts and email recipient, create and send file
app.post('/render', async (req, res) => {
  try {
    const filename = await cstk.renderToEmail(req.body);
    res.status(200).send(filename);
  } catch (error) {
    res.status(400).send(error);
  }
  res.send();
});

// Minimal routing for landing, health check and 404
app.get(['/_health', '/health'], ({ res }) => res.status(200).send('OK'));
app.get('/', ({ res }) => res.status(200).send(TITLE));
app.get('*', ({ res }) => res.status(404).send('Not Found'));

// Run server
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
