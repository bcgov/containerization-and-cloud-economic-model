const cdogsService = require('../../components/cdogsService');
const log = require('npmlog');

class PdfService {
  constructor(commonDataService, assetsPath) {
    this._commonDataService = commonDataService;
    this._assetsPath = assetsPath;
  }

  async generateSubmissionPdf(submission) {
    try {
      const settings = await this._commonDataService.readSettings('generateSubmissionPdf');
      if (settings.enabled) {
        const generateSubmissionPdfTemplate = `${this._assetsPath}/${settings.config.template}`;
        const generateSubmissionPdfTemplateJson = require(`${this._assetsPath}/${settings.config.templateJson}`);

        let templateId = await cdogsService.getHash(generateSubmissionPdfTemplate);
        const templateResult = await cdogsService.getTemplate(templateId);
        if (templateResult.status !== 200) {
          const uploadResult = await cdogsService.uploadTemplate(generateSubmissionPdfTemplate);
          templateId = uploadResult.data;
        }

        const body = {...generateSubmissionPdfTemplateJson};
        body.data = {...submission};

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
}

module.exports.PdfService = PdfService;
