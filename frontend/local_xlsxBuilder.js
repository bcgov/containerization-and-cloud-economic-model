// Requires
const cstk = require('./src/utils/commonServicesToolkit');

// Envars
const CONTEXTS = process.env.PATH_CONTEXTS;
const RECIPIENT = process.env.EMAIL_RECIPIENT;

// Send template and contexts, email returned file (spreadsheet)
async function templateToEmail() {
  await cstk.templateToEmail(require(CONTEXTS), RECIPIENT);
}

try {
  templateToEmail();
} catch (e) {
  console.log(e);
}
