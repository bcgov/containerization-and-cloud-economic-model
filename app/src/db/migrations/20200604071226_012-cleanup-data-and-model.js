
const AGRI_PREFIX = require('../../forms/agriseafoodopscreening/constants').PREFIX;
const AGRI_TITLE = require('../../forms/agriseafoodopscreening/constants').TITLE;
const AGRI_TITLE_ORIG = 'Agriculture/Seafood Operator Screening';

const FOREST_PREFIX = require('../../forms/forestrysectoroperatorscreening/constants').PREFIX;
const FOREST_TITLE = require('../../forms/forestrysectoroperatorscreening/constants').TITLE;
const FOREST_TITLE_ORIG = 'Forestry Sector Operator Screening';

const MINES_PREFIX = require('../../forms/minesoperatorscreening/constants').PREFIX;

const CREATED_BY = 'migration-012';
const UPDATED_BY = CREATED_BY;

exports.up = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.alterTable(`${AGRI_PREFIX}_submission_location`, table => {
      table.dropColumn('mineNumber');
      table.dropColumn('permitNumber');
    }))
    .then(() => knex.schema.alterTable(`${FOREST_PREFIX}_submission_location`, table => {
      table.dropColumn('mineNumber');
      table.dropColumn('permitNumber');
    }))
    .then(() => {
      return knex(`${MINES_PREFIX}_settings`).where('name', 'notificationEmail').first();
    })
    .then((setting) => {
      setting.name = 'confirmationEmail';
      setting.createdBy = CREATED_BY;
      return knex(`${MINES_PREFIX}_settings`).insert(setting);
    })
    .then(() => {
      return knex(`${MINES_PREFIX}_settings`).where('name', 'notificationEmail').del();
    })
    .then((setting) => {
      console.log(setting); // eslint-disable-line no-console
    })
    .then(() => {
      return knex('form').where('prefix', AGRI_PREFIX).update({
        name: AGRI_TITLE,
        updatedBy: UPDATED_BY
      }).returning('formId');
    })
    .then((formIds) => {
      return knex(`${AGRI_PREFIX}_form`).where('formId', formIds[0]).update({
        description: `This is an attestation form for ${AGRI_TITLE}`,
        updatedBy: UPDATED_BY
      });
    })
    .then(() => {
      return knex('form').where('prefix', FOREST_PREFIX).update({
        name: FOREST_TITLE,
        updatedBy: UPDATED_BY
      }).returning('formId');
    })
    .then((formIds) => {
      return knex(`${FOREST_PREFIX}_form`).where('formId', formIds[0]).update({
        description: `This is an attestation form for ${FOREST_TITLE}`,
        updatedBy: UPDATED_BY
      });
    })
    .then(() => {
      return knex(`${AGRI_PREFIX}_settings`).where('name', 'submissionEmail').first();
    })
    .then((setting) => {
      setting.config.subject = `${AGRI_TITLE} Form Submission`;
      setting.config.title = `${AGRI_TITLE} Form Submission`;
      return knex(`${AGRI_PREFIX}_settings`).where('name', 'submissionEmail').update({
        config: setting.config,
        updatedBy: UPDATED_BY
      });
    })
    .then(() => {
      return knex(`${AGRI_PREFIX}_settings`).where('name', 'confirmationEmail').first();
    })
    .then((setting) => {
      setting.config.subject = `${AGRI_TITLE} Form Accepted`;
      setting.config.title = `${AGRI_TITLE} Form Accepted`;
      setting.config.messageLinkText = `Please login to view the details of this ${AGRI_TITLE} Attestation`;
      return knex(`${AGRI_PREFIX}_settings`).where('name', 'confirmationEmail').update({
        config: setting.config,
        updatedBy: UPDATED_BY
      });
    })
    .then(() => {
      return knex(`${AGRI_PREFIX}_settings`).where('name', 'statusAssignmentEmail').first();
    })
    .then((setting) => {
      setting.config.subject = `${AGRI_TITLE} Assignment`;
      setting.config.title = `${AGRI_TITLE} Assignment`;
      setting.config.messageLinkText = `Please login to view the details of this ${AGRI_TITLE} Attestation`;
      return knex(`${AGRI_PREFIX}_settings`).where('name', 'statusAssignmentEmail').update({
        config: setting.config,
        updatedBy: UPDATED_BY
      });
    })
    .then(() => {
      return knex(`${AGRI_PREFIX}_settings`).where('name', 'accessRequestedEmail').first();
    })
    .then((setting) => {
      setting.config.subject = `${AGRI_TITLE} - Access Requested`;
      setting.config.message = `A request for access has been received for your ${AGRI_TITLE} administration page.`;
      return knex(`${AGRI_PREFIX}_settings`).where('name', 'accessRequestedEmail').update({
        config: setting.config,
        updatedBy: UPDATED_BY
      });
    })
    .then(() => {
      return knex(`${FOREST_PREFIX}_settings`).where('name', 'submissionEmail').first();
    })
    .then((setting) => {
      setting.config.subject = `${FOREST_TITLE} Form Submission`;
      setting.config.title = `${FOREST_TITLE} Form Submission`;
      return knex(`${FOREST_PREFIX}_settings`).where('name', setting).update({
        config: setting.config,
        updatedBy: UPDATED_BY
      });
    })
    .then(() => {
      return knex(`${FOREST_PREFIX}_settings`).where('name', 'confirmationEmail').first();
    })
    .then((setting) => {
      setting.config.subject = `${FOREST_TITLE} Form Accepted`;
      setting.config.title = `${FOREST_TITLE} Form Accepted`;
      setting.config.messageLinkText = `Please login to view the details of this ${FOREST_TITLE} Attestation`;
      return knex(`${FOREST_PREFIX}_settings`).where('name', 'confirmationEmail').update({
        config: setting.config,
        updatedBy: UPDATED_BY
      });
    })
    .then(() => {
      return knex(`${FOREST_PREFIX}_settings`).where('name', 'statusAssignmentEmail').first();
    })
    .then((setting) => {
      setting.config.subject = `${FOREST_TITLE} Assignment`;
      setting.config.title = `${FOREST_TITLE} Assignment`;
      setting.config.messageLinkText = `Please login to view the details of this ${FOREST_TITLE} Attestation`;
      return knex(`${FOREST_PREFIX}_settings`).where('name', 'statusAssignmentEmail').update({
        config: setting.config,
        updatedBy: UPDATED_BY
      });
    })
    .then(() => {
      return knex(`${FOREST_PREFIX}_settings`).where('name', 'accessRequestedEmail').first();
    })
    .then((setting) => {
      setting.config.subject = `${FOREST_TITLE} - Access Requested`;
      setting.config.message = `A request for access has been received for your ${FOREST_TITLE} administration page.`;
      return knex(`${FOREST_PREFIX}_settings`).where('name', 'accessRequestedEmail').update({
        config: setting.config,
        updatedBy: UPDATED_BY
      });
    });
};

exports.down = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.alterTable(`${AGRI_PREFIX}_submission_location`, table => {
      table.string('mineNumber').nullable();
      table.string('permitNumber').nullable();
    }))
    .then(() => knex.schema.alterTable(`${FOREST_PREFIX}_submission_location`, table => {
      table.string('mineNumber').nullable();
      table.string('permitNumber').nullable();
    }))
    .then(() => {
      return knex(`${MINES_PREFIX}_settings`).where('name', 'confirmationEmail').first();
    })
    .then((setting) => {
      setting.name = 'notificationEmail';
      setting.updatedBy = UPDATED_BY;
      return knex(`${MINES_PREFIX}_settings`).insert(setting);
    })
    .then(() => {
      return knex(`${MINES_PREFIX}_settings`).where('name', 'confirmationEmail').del();
    })
    .then(() => {
      return knex('form').where('prefix', AGRI_PREFIX).update({
        name: AGRI_TITLE_ORIG,
        updatedBy: UPDATED_BY
      }).returning('formId');
    })
    .then((formIds) => {
      return knex(`${AGRI_PREFIX}_form`).where('formId', formIds[0]).update({
        description: `This is an attestation form for ${AGRI_TITLE_ORIG}`,
        updatedBy: UPDATED_BY
      });
    })
    .then(() => {
      return knex('form').where('prefix', FOREST_PREFIX).update({
        name: FOREST_TITLE_ORIG,
        updatedBy: UPDATED_BY
      }).returning('formId');
    })
    .then((formIds) => {
      return knex(`${FOREST_PREFIX}_form`).where('formId', formIds[0]).update({
        description: `This is an attestation form for ${FOREST_TITLE_ORIG}`,
        updatedBy: UPDATED_BY
      });
    })
    .then(() => {
      return knex(`${AGRI_PREFIX}_settings`).where('name', 'submissionEmail').first();
    })
    .then((setting) => {
      setting.config.subject = `${AGRI_TITLE_ORIG} Form Submission`;
      setting.config.title = `${AGRI_TITLE_ORIG} Form Submission`;
      return knex(`${AGRI_PREFIX}_settings`).where('name', 'submissionEmail').update({
        config: setting.config,
        updatedBy: UPDATED_BY
      });
    })
    .then(() => {
      return knex(`${AGRI_PREFIX}_settings`).where('name', 'confirmationEmail').first();
    })
    .then((setting) => {
      setting.config.subject = `${AGRI_TITLE_ORIG} Form Accepted`;
      setting.config.title = `${AGRI_TITLE_ORIG} Form Accepted`;
      setting.config.messageLinkText = `Please login to view the details of this ${AGRI_TITLE_ORIG} Attestation`;
      return knex(`${AGRI_PREFIX}_settings`).where('name', 'confirmationEmail').update({
        config: setting.config,
        updatedBy: UPDATED_BY
      });
    })
    .then(() => {
      return knex(`${AGRI_PREFIX}_settings`).where('name', 'statusAssignmentEmail').first();
    })
    .then((setting) => {
      setting.config.subject = `${AGRI_TITLE_ORIG} Assignment`;
      setting.config.title = `${AGRI_TITLE_ORIG} Assignment`;
      setting.config.messageLinkText = `Please login to view the details of this ${AGRI_TITLE_ORIG} Attestation`;
      return knex(`${AGRI_PREFIX}_settings`).where('name', 'statusAssignmentEmail').update({
        config: setting.config,
        updatedBy: UPDATED_BY
      });
    })
    .then(() => {
      return knex(`${AGRI_PREFIX}_settings`).where('name', 'accessRequestedEmail').first();
    })
    .then((setting) => {
      setting.config.subject = `${AGRI_TITLE_ORIG} - Access Requested`;
      setting.config.message = `A request for access has been received for your ${AGRI_TITLE_ORIG} administration page.`;
      return knex(`${AGRI_PREFIX}_settings`).where('name', 'accessRequestedEmail').update({
        config: setting.config,
        updatedBy: UPDATED_BY
      });
    })
    .then(() => {
      return knex(`${FOREST_PREFIX}_settings`).where('name', 'submissionEmail').first();
    })
    .then((setting) => {
      setting.config.subject = `${FOREST_TITLE_ORIG} Form Submission`;
      setting.config.title = `${FOREST_TITLE_ORIG} Form Submission`;
      return knex(`${FOREST_PREFIX}_settings`).where('name', 'submissionEmail').update({
        config: setting.config,
        updatedBy: UPDATED_BY
      });
    })
    .then(() => {
      return knex(`${FOREST_PREFIX}_settings`).where('name', 'confirmationEmail').first();
    })
    .then((setting) => {
      setting.config.subject = `${FOREST_TITLE_ORIG} Form Accepted`;
      setting.config.title = `${FOREST_TITLE_ORIG} Form Accepted`;
      setting.config.messageLinkText = `Please login to view the details of this ${FOREST_TITLE_ORIG} Attestation`;
      return knex(`${FOREST_PREFIX}_settings`).where('name', 'confirmationEmail').update({
        config: setting.config,
        updatedBy: UPDATED_BY
      });
    })
    .then(() => {
      return knex(`${FOREST_PREFIX}_settings`).where('name', 'statusAssignmentEmail').first();
    })
    .then((setting) => {
      setting.config.subject = `${FOREST_TITLE_ORIG} Assignment`;
      setting.config.title = `${FOREST_TITLE_ORIG} Assignment`;
      setting.config.messageLinkText = `Please login to view the details of this ${FOREST_TITLE_ORIG} Attestation`;
      return knex(`${FOREST_PREFIX}_settings`).where('name', 'statusAssignmentEmail').update({
        config: setting.config,
        updatedBy: UPDATED_BY
      });
    })
    .then(() => {
      return knex(`${FOREST_PREFIX}_settings`).where('name', 'accessRequestedEmail').first();
    })
    .then((setting) => {
      setting.config.subject = `${FOREST_TITLE_ORIG} - Access Requested`;
      setting.config.message = `A request for access has been received for your ${FOREST_TITLE_ORIG} administration page.`;
      return knex(`${FOREST_PREFIX}_settings`).where('name', 'accessRequestedEmail').update({
        config: setting.config,
        updatedBy: UPDATED_BY
      });
    });
};
