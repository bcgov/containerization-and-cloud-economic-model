const express = require('express');
const cors = require('cors');
const cstk = require('./src/commonServicesToolkit');

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8080';
// Express
const app = express();
app.use(express.json());
app.use(cors({ origin: FRONTEND_URL }));

// Envars
const TITLE =
  process.env.TITLE ||
  'Wrapper and Credential Handler for Common Services APIs';
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
