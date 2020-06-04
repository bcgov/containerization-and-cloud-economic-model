const chesService = require('../../components/chesService');
const fs = require('fs');
const log = require('npmlog');

class EmailService {

  constructor(commonDataService, formDataService, assetsPath) {
    this._commonDataService = commonDataService;
    this._formDataService = formDataService;
    this._assetsPath = assetsPath;

    this._submissionEmailBody = null;
    this._confirmationEmailBody = null;
    this._statusAssignmentEmailBody = null;
    this._accessRequestedEmailBody = null;
  }

  async sendSubmissionEmail(submission, to) {
    try {
      const settings = await this._commonDataService.readSettings('submissionEmail');
      if (settings && settings.enabled) {
        if (!this._submissionEmailBody) {
          this._submissionEmailBody = fs.readFileSync(`${this._assetsPath}/${settings.config.template}`, 'utf8');
        }
        const data = {
          body: this._submissionEmailBody,
          bodyType: 'html',
          contexts: [
            {
              context: {
                confirmationNumber: submission.confirmationId,
                title: settings.config.title,
                operationType: submission.operationType.display,
                messageLinkText: settings.config.messageLinkText,
                messageLinkUrl: `${settings.config.messageLinkUrl}/${submission.submissionId}`
              },
              to: [to]
            }
          ],
          ...settings.config
        };
        return await chesService.merge(data);
      } else {
        return false;
      }
    } catch (err) {
      log.error('sendSubmissionEmail', `Error: ${err.message}.`);
      log.error(err);
      throw err;
    }
  }

  async sendConfirmationEmail(submission) {
    try {
      const settings = await this._commonDataService.readSettings('confirmationEmail');
      if (settings && settings.enabled) {
        if (!this._confirmationEmailBody) {
          this._confirmationEmailBody = fs.readFileSync(`${this._assetsPath}/${settings.config.template}`, 'utf8');
        }
        const to = settings.config.to.split(',').filter(x => x);
        const data = {
          body: this._confirmationEmailBody,
          bodyType: 'html',
          contexts: [
            {
              context: {
                confirmationNumber: submission.confirmationId,
                operationType: submission.operationType.display,
                title: settings.config.title,
                messageLinkText: settings.config.messageLinkText,
                messageLinkUrl: `${settings.config.messageLinkUrl}/${submission.submissionId}`
              },
              to: to
            }
          ],
          ...settings.config
        };
        return await chesService.merge(data);
      } else {
        return false;
      }
    } catch (err) {
      log.error('sendConfirmationEmail', `Error: ${err.message}.`);
      log.error(err);
      throw err;
    }
  }

  async sendStatusAssignmentEmail(statusUpdate) {
    try {
      const settings = await this._commonDataService.readSettings('statusAssignmentEmail');
      if (settings && settings.enabled && statusUpdate.assignedToEmail) {
        if (!this._statusAssignmentEmailBody) {
          this._statusAssignmentEmailBody = fs.readFileSync(`${this._assetsPath}/${settings.config.template}`, 'utf8');
        }

        const submission = await this._formDataService.readSubmission(statusUpdate.submissionId);
        const statusCodes = await this._commonDataService.readCurrentStatusCodes();
        const statusCode = statusCodes.find(x => x.code === statusUpdate.code);

        const data = {
          body: this._statusAssignmentEmailBody,
          bodyType: 'html',
          contexts: [
            {
              context: {
                confirmationNumber: submission.confirmationId,
                operationType: submission.operationType.display,
                business: submission.business.name,
                status: statusCode.display,
                message: settings.config.message,
                title: settings.config.title,
                messageLinkText: settings.config.messageLinkText,
                messageLinkUrl: `${settings.config.messageLinkUrl}/${submission.submissionId}`
              },
              to: [statusUpdate.assignedToEmail]
            }
          ],
          ...settings.config
        };
        return await chesService.merge(data);
      } else {
        return false;
      }
    } catch (err) {
      log.error('sendStatusAssignmentEmail', `Error: ${err.message}`);
      log.error(err);
      throw err;
    }
  }

  async sendAccessRequestedEmail(accessRequest) {
    try {
      const settings = await this._commonDataService.readSettings('accessRequestedEmail');
      if (settings && settings.enabled) {
        if (!this._accessRequestedEmailBody) {
          this._accessRequestedEmailBody = fs.readFileSync(`${this._assetsPath}/${settings.config.template}`, 'utf8');
        }
        const to = settings.config.to.split(',').filter(x => x);
        const data = {
          body: this._accessRequestedEmailBody,
          bodyType: 'html',
          contexts: [
            {
              context: {
                title: settings.config.title,
                userInfo: `${accessRequest.firstName} ${accessRequest.lastName} - ${accessRequest.email}`,
                message: settings.config.message,
                messageLinkText: settings.config.messageLinkText,
                messageLinkUrl: `${settings.config.messageLinkUrl}`
              },
              to: to
            }
          ],
          ...settings.config
        };
        return await chesService.merge(data);
      } else {
        return false;
      }
    } catch (err) {
      log.error('sendAccessRequestedEmail', `Error: ${err.message}.`);
      log.error(err);
      throw err;
    }
  }

}

module.exports = EmailService;
