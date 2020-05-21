const PREFIX = require('../../forms/minesoperatorscreening/constants').PREFIX;

exports.up = function(knex) {
  return knex(`${PREFIX}_settings`).del()
    .then(() => {
      const data = {
        name: 'submissionEmail',
        enabled: true,
        config: {
          template: 'confirmation-number-email.html',
          from: 'MCAD.RegionalOps@gov.bc.ca',
          subject: 'Industrial Camps Form Receipt',
          title: 'Industrial Camps Form Receipt',
          priority: 'normal',
          messageLinkText: 'Click to view your Receipt',
          messageLinkUrl: 'https://comfort-dev.pathfinder.gov.bc.ca/app/minesoperatorscreening/review'
        },
        createdBy: 'migration-006'
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
          subject: 'Industrial Camps Form Accepted',
          title: 'Industrial Camps Form Accepted',
          priority: 'normal',
          messageLinkText: 'Please login to view the details of this Industrial Camps Attestation',
          messageLinkUrl: 'https://comfort-dev.pathfinder.gov.bc.ca/app/minesoperatorscreening/admin/submission'
        },
        createdBy: 'migration-006'
      };
      return knex(`${PREFIX}_settings`).insert(data);
    })
    .then(() => {
      const data = {
        name: 'statusAssignmentEmail',
        enabled: true,
        config: {
          template: 'status-assignment-email.html',
          from: 'MCAD.RegionalOps@gov.bc.ca',
          subject: 'Industrial Camps Assignment',
          title: 'Industrial Camps Assignment',
          priority: 'normal',
          message: 'The status of the above attestation has changed. You have been assigned to review this attestation.',
          messageLinkText: 'Please login to view the details of this Industrial Camps Attestation',
          messageLinkUrl: 'https://comfort-dev.pathfinder.gov.bc.ca/app/minesoperatorscreening/admin/submission'
        },
        createdBy: 'migration-006'
      };
      return knex(`${PREFIX}_settings`).insert(data);
    })
    .then(() => {
      const data = {
        name: 'generateSubmissionPdf',
        enabled: true,
        config: {
          template: 'generate-submission-pdf-001.html',
          templateJson: 'generate-submission-pdf-001.json'
        },
        createdBy: 'migration-006'
      };
      return knex(`${PREFIX}_settings`).insert(data);
    });
};

exports.down = function(knex) {
  return knex(`${PREFIX}_settings`).del();
};
