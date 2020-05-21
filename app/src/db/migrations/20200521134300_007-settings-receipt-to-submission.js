const PREFIX = require('../../forms/minesoperatorscreening/constants').PREFIX;

exports.up = function (knex) {
  return Promise.resolve()
    .then(() => {
      const config = {
        template: 'confirmation-number-email.html',
        from: 'MCAD.RegionalOps@gov.bc.ca',
        subject: 'Industrial Camps Form Submission',
        title: 'Industrial Camps Form Submission',
        priority: 'normal',
        messageLinkText: 'Click to view your Submission',
        messageLinkUrl: 'https://comfort-dev.pathfinder.gov.bc.ca/app/minesoperatorscreening/review'
      };
      return knex(`${PREFIX}_settings`).where('name', 'submissionEmail').update({
        config: config,
        updatedBy: 'migration-007'
      });
    });
};

exports.down = function (knex) {
  return Promise.resolve()
    .then(() => {
      const config = {
        template: 'confirmation-number-email.html',
        from: 'MCAD.RegionalOps@gov.bc.ca',
        subject: 'Industrial Camps Form Receipt',
        title: 'Industrial Camps Form Receipt',
        priority: 'normal',
        messageLinkText: 'Click to view your Receipt',
        messageLinkUrl: 'https://comfort-dev.pathfinder.gov.bc.ca/app/minesoperatorscreening/review'
      };
      return knex(`${PREFIX}_settings`).where('name', 'submissionEmail').update({config: config, updatedBy: null});
    });
};

