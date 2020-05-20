const chesService = require('../../components/chesService');
const dataService = require('./dataService');
const fs = require('fs');
const log = require('npmlog');

let submissionEmailBody;
let notificationEmailBody;

const emailService = {

  sendSubmissionEmail: async (submission, to) => {
    try {
      const settings = await dataService.readSettings('submissionEmail');
      if (settings.enabled) {
        if (!submissionEmailBody) {
          submissionEmailBody = fs.readFileSync(`src/assets/${settings.config.template}`, 'utf8');
        }
        const data = {
          body: submissionEmailBody,
          bodyType: 'html',
          contexts: [
            {
              context: {
                confirmationNumber: submission.confirmationId,
                messageLinkText: settings.config.messageLinkText,
                messageLinkUrl: `${settings.config.messageLinkUrl}/${submission.submissionId}`
              },
              to: [to]
            }
          ],
          ...settings.config
        };
        const response = await chesService.merge(data);
        return response;
      } else {
        return false;
      }
    } catch (err) {
      log.error('sendSubmissionEmail', `Error: ${err.message}. Rolling back...`);
      log.error(err);
      throw err;
    }
  },


  sendNotificationEmail: async (submission) => {
    try {
      const settings = await dataService.readSettings('notificationEmail');
      if (settings.enabled) {
        if (!notificationEmailBody) {
          notificationEmailBody = fs.readFileSync(`src/assets/${settings.config.template}`, 'utf8');
        }
        const to = settings.config.to.split(',').filter(x => x);
        const data = {
          body: notificationEmailBody,
          bodyType: 'html',
          contexts: [
            {
              context: {
                confirmationNumber: submission.confirmationId,
                messageLinkText: settings.config.messageLinkText,
                messageLinkUrl: `${settings.config.messageLinkUrl}/${submission.submissionId}`
              },
              to: to
            }
          ],
          ...settings.config
        };
        const response = await chesService.merge(data);
        return response;
      } else {
        return false;
      }
    } catch (err) {
      log.error('sendSubmissionEmail', `Error: ${err.message}. Rolling back...`);
      log.error(err);
      throw err;
    }
  }


};

module.exports = emailService;
