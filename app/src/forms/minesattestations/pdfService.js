const cdogsService = require('../../components/cdogsService');
const dataService = require('./dataService');
const log = require('npmlog');
const path = require('path');

const assetsPath = path.join(__dirname, 'assets');
let generateSubmissionPdfTemplate;
let generateSubmissionPdfTemplateJson;

const pdfService = {

  generateSubmissionPdf: async (submission) => {
    try {
      const settings = await dataService.readSettings('generateSubmissionPdf');
      if (settings.enabled) {
        if (!generateSubmissionPdfTemplate) {
          generateSubmissionPdfTemplate = `${assetsPath}/${settings.config.template}`;
          generateSubmissionPdfTemplateJson = require(`${assetsPath}/${settings.config.templateJson}`);
        }
        let templateId = await cdogsService.getHash(generateSubmissionPdfTemplate);
        const templateResult = await cdogsService.getTemplate(templateId);
        if (templateResult.status !== 200) {
          const uploadResult = await cdogsService.uploadTemplate(generateSubmissionPdfTemplate);
          templateId = uploadResult.data;
        }

        const body = { ...generateSubmissionPdfTemplateJson };
        body.data = { ...submission };

        return await cdogsService.templateRender(templateId, body);
      } else {
        return false;
      }
    } catch (err) {
      log.error('generateSubmissionPdf', `Error: ${err.message}.`);
      log.error(err);
      throw err;
    }
  }
};

module.exports = pdfService;
