const PREFIX = require('../../forms/minesattestations/constants').PREFIX;

exports.up = function(knex) {
  return knex(`${PREFIX}_settings`).where({ name: 'generateSubmissionPdf'}).del()
    .then(() => {
      const data = {
        name: 'generateSubmissionPdf',
        enabled: true,
        config: {
          template: 'generate-submission-pdf.docx',
          templateJson: 'generate-submission-pdf.json'
        },
        createdBy: 'migration-008'
      };
      return knex(`${PREFIX}_settings`).insert(data);
    });
};

exports.down = function(knex) {
  return knex(`${PREFIX}_settings`).where({ name: 'generateSubmissionPdf'}).del();
};
