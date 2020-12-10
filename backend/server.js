const express = require('express');
const cstk = require('./src/utils/commonServicesToolkit');

// Express
const app = express();
app.use(express.json());

// Envars
const PORT = process.env.PORT || 3000;

// Receive contexts and email recipient, create and send file
app.post('/render', (req, res) => {
  // TODO: get these values from frontend
  const RECIPIENT = process.env.EMAIL_RECIPIENT;
  const contexts = require('./CEM_contexts.json');
  console.log('Recipient:', RECIPIENT);
  console.log('Contexts:', contexts);
  console.log('Request keys:', Object.keys(req));
  try {
    // TODO: uncomment the line below when ready
    // const newFile = cstk.templateToEmail(contexts, RECIPIENT);
    // console.log('newFile keys:', Object.keys(newFile));
    res.status(200).send('Generated!');
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
  res.send();
});

app.get('/', (req, res) => {
  res.status(200).send('Cloud Economic Model Backend API');
});

app.get('/_health', (req, res) => {
  res.status(200).send('OK');
});

app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

// Run server
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

// TODO: tie in template/email
// templateToEmail(contexts, RECIPIENT);
