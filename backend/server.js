const express = require('express');
const cstk = require('./src/utils/commonServicesToolkit');

// Express
const app = express();
app.use(express.json());

// Envars
const PORT = process.env.PORT || 3000;

// Receive contexts and email recipient, create and send file
app.post('/render', (req, res) => {
  const { recipient, data } = req.body;
  console.log('Recipient:', recipient);
  console.log('Contexts:', data);

  try {
    const newFile = cstk.templateToEmail(data, recipient);
    console.log('newFile keys:', Object.keys(newFile));
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
