const chesService = require('../../components/chesService');
const dataService = require('./dataService');
const fs = require('fs');
const log = require('npmlog');
const path = require('path');

const assetsPath = path.join(__dirname, 'assets');

let submissionEmailBody;
let notificationEmailBody;
let statusAssignmentEmailBody;
let accessRequestedEmailBody;

const emailService = {

  sendSubmissionEmail: async (submission, to) => {
    try {
      const settings = await dataService.readSettings('submissionEmail');
      if (settings.enabled) {
        if (!submissionEmailBody) {
          submissionEmailBody = fs.readFileSync(`${assetsPath}/${settings.config.template}`, 'utf8');
        }
        const data = {
          body: submissionEmailBody,
          bodyType: 'html',
          contexts: [
            {
              context: {
                confirmationNumber: submission.confirmationId,
                title: settings.config.title,
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
  },

  sendNotificationEmail: async (submission) => {
    try {
      const settings = await dataService.readSettings('notificationEmail');
      if (settings.enabled) {
        if (!notificationEmailBody) {
          notificationEmailBody = fs.readFileSync(`${assetsPath}/${settings.config.template}`, 'utf8');
        }
        const to = settings.config.to.split(',').filter(x => x);
        const data = {
          body: notificationEmailBody,
          bodyType: 'html',
          contexts: [
            {
              context: {
                confirmationNumber: submission.confirmationId,
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
      log.error('sendSubmissionEmail', `Error: ${err.message}.`);
      log.error(err);
      throw err;
    }
  },

  sendStatusAssignmentEmail: async (statusUpdate) => {
    try {
      const settings = await dataService.readSettings('statusAssignmentEmail');
      if (settings.enabled && statusUpdate.assignedToEmail) {
        if (!statusAssignmentEmailBody) {
          statusAssignmentEmailBody = fs.readFileSync(`${assetsPath}/${settings.config.template}`, 'utf8');
        }
        // get the submission.
        const submission = await dataService.readSubmission(statusUpdate.submissionId);
        const statusCodes = await dataService.readCurrentStatusCodes();
        const statusCode = statusCodes.find(x => x.code === statusUpdate.code);

        const data = {
          body: statusAssignmentEmailBody,
          bodyType: 'html',
          contexts: [
            {
              context: {
                confirmationNumber: submission.confirmationId,
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
  },

  sendAccessRequestedEmail: async () => {
    try {
      const settings = await dataService.readSettings('accessRequestedEmail');
      if (settings.enabled) {
        if (!accessRequestedEmailBody) {
          accessRequestedEmailBody = fs.readFileSync(`${assetsPath}/${settings.config.template}`, 'utf8');
        }
        const to = settings.config.to.split(',').filter(x => x);
        const data = {
          body: accessRequestedEmailBody,
          bodyType: 'html',
          contexts: [
            {
              context: {
                title: settings.config.title,
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

};

module.exports = emailService;
