// Requires
const cstk = require('./src/utils/commonServicesToolkit');

// Envars
const CONTEXTS = process.env.PATH_CONTEXTS;
const RECIPIENT = process.env.EMAIL_RECIPIENT;

// Accepts a data dict and a path to an xlsx template and makes a request to CDOGS.
// Returns the response content object that can be added to a starlette.responses.Response.
async function templateToEmail() {
  // Send template and contexts, email returned spreadsheet
  await cstk.templateToEmail(require(CONTEXTS), RECIPIENT);
}

templateToEmail();
