const PREFIX = require('../../forms/minesattestations/constants').PREFIX;

exports.up = function(knex) {
  return knex(`${PREFIX}_settings`).del()
    .then(() => {
      const data = {
        name: 'submissionEmail',
        enabled: true,
        config: {
          template: 'confirmation-number-email.html',
          from: 'MCAD.RegionalOps@gov.bc.ca',
          subject: 'Industrial Camps',
          title: 'Industrial Camps Form Receipt',
          priority: 'normal',
          messageLinkText: 'Click to view your Receipt',
          messageLinkUrl: 'https://comfort-dev.pathfinder.gov.bc.ca/app/minesattestations/review'
        },
        createdBy: 'migration-007'
      };
      return knex(`${PREFIX}_settings`).insert(data);
    })
    .then(() => {
      const data = {
        name: 'notificationEmail',
        enabled: true,
        config: {
          template: 'confirmation-number-email.html',
          from: 'MCAD.RegionalOps@gov.bc.ca',
          to: 'NR.CommonServiceShowcase@gov.bc.ca',
          subject: 'Industrial Camps',
          title: 'Industrial Camps Form Accepted',
          priority: 'normal',
          messageLinkText: 'Please login to view the details of this Industrial Camps Attestation',
          messageLinkUrl: 'https://comfort-dev.pathfinder.gov.bc.ca/app/minesattestations/admin/submission'
        },
        createdBy: 'migration-007'
      };
      return knex(`${PREFIX}_settings`).insert(data);
    });
};

exports.down = function(knex) {
  return knex(`${PREFIX}_settings`).del();
};
