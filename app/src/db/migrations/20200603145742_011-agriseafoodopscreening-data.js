const { v4: uuidv4 } = require('uuid');

const PREFIX = require('../../forms/agriseafoodopscreening/constants').PREFIX;
const SLUG = require('../../forms/agriseafoodopscreening/constants').SLUG;
const CREATED_BY = 'migration-011';

const FORM_NAME = 'Agriculture/Seafood Operator Screening';
const EMAIL_FROM = 'NR.CommonServiceShowcase@gov.bc.ca';

const operationTypes = [
  {type:'AGRICULTURE', display: 'Agriculture', enabled: true, createdBy: CREATED_BY},
  {type:'SEAFOOD', display: 'Seafood', enabled: true, createdBy: CREATED_BY}
];

const statusCodes = [
  {code:'SUBMITTED', display: 'Submitted', enabled: true, nextCodes: ['ASSIGNED', 'COMPLETED'], allowedClassifications: [], createdBy: CREATED_BY},
  {code:'ASSIGNED', display: 'Assigned', enabled: true, nextCodes: ['ASSIGNED', 'COMPLETED'], allowedClassifications: [], createdBy: CREATED_BY},
  {code:'COMPLETED', display: 'Completed', enabled: true, nextCodes: ['ASSIGNED'], allowedClassifications: [], createdBy: CREATED_BY}
];

exports.up = function(knex) {
  return Promise.resolve()
    .then(() => {
      return knex(`${PREFIX}_version_status_code`).del();
    })
    .then(() => {
      return knex(`${PREFIX}_status_code`).del();
    })
    .then(()=> {
      return knex(`${PREFIX}_form_version`).del();
    })
    .then(()=> {
      return knex(`${PREFIX}_form`).del();
    })
    .then(()=> {
      return knex('form').where('prefix', PREFIX).del();
    })
    .then(() => {
      return knex(`${PREFIX}_status_code`).insert(statusCodes);
    })
    .then(() => {
      return knex(`${PREFIX}_operation_type`).insert(operationTypes);
    })
    .then(() => {
      const form = {
        formId: uuidv4(),
        name: FORM_NAME,
        keywords:['covid','attestation','attestations', 'agriculture', 'seafood', 'operator', 'screening'],
        public: true,
        active: true,
        prefix: PREFIX,
        slug: SLUG,
        createdBy: CREATED_BY
      };
      return knex('form').insert(form).returning('formId');
    })
    .then(formIds => {
      const form = {
        formId: formIds[0],
        description: 'This is an attestation form for Agriculture/Seafood Operator Screening',
        createdBy: CREATED_BY
      };
      return knex(`${PREFIX}_form`).insert(form).returning('formId');
    })
    .then(formIds => {
      const version = {
        formId: formIds[0],
        createdBy: CREATED_BY
      };
      return knex(`${PREFIX}_form_version`).insert(version).returning('formVersionId');
    })
    .then(formVersionIds => {
      const versionCodes = statusCodes.map(c => { return {code: c.code, formVersionId: formVersionIds[0]}; });
      return knex(`${PREFIX}_version_status_code`).insert(versionCodes);
    })
    .then(() => {
      const data = {
        name: 'submissionEmail',
        enabled: true,
        config: {
          template: 'confirmation-number-email.html',
          from: EMAIL_FROM,
          subject: `${FORM_NAME} Form Submission`,
          title: `${FORM_NAME} Form Submission`,
          priority: 'normal',
          messageLinkText: 'Click to view your Submission',
          messageLinkUrl: `https://comfort-dev.pathfinder.gov.bc.ca/app/${SLUG}/review`
        },
        createdBy: 'migration-006'
      };
      return knex(`${PREFIX}_settings`).insert(data);
    })
    .then(() => {
      const data = {
        name: 'confirmationEmail',
        enabled: true,
        config: {
          template: 'confirmation-number-email.html',
          from: EMAIL_FROM,
          to: 'NR.CommonServiceShowcase@gov.bc.ca',
          subject: `${FORM_NAME} Form Accepted`,
          title: `${FORM_NAME} Form Accepted`,
          priority: 'normal',
          messageLinkText: `Please login to view the details of this ${FORM_NAME} Attestation`,
          messageLinkUrl: `https://comfort-dev.pathfinder.gov.bc.ca/app/${SLUG}/admin/submission`
        },
        createdBy: CREATED_BY
      };
      return knex(`${PREFIX}_settings`).insert(data);
    })
    .then(() => {
      const data = {
        name: 'statusAssignmentEmail',
        enabled: true,
        config: {
          template: 'status-assignment-email.html',
          from: EMAIL_FROM,
          subject: `${FORM_NAME} Assignment`,
          title: `${FORM_NAME} Assignment`,
          priority: 'normal',
          message: 'The status of the above attestation has changed. You have been assigned to review this attestation.',
          messageLinkText: `Please login to view the details of this ${FORM_NAME} Attestation`,
          messageLinkUrl: `https://comfort-dev.pathfinder.gov.bc.ca/app/${SLUG}/admin/submission`
        },
        createdBy: CREATED_BY
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
        createdBy: CREATED_BY
      };
      return knex(`${PREFIX}_settings`).insert(data);
    })
    .then(() => {
      const data = {
        name: 'accessRequestedEmail',
        enabled: true,
        config: {
          template: 'access-requested-email.html',
          from: EMAIL_FROM,
          to: 'NR.CommonServiceShowcase@gov.bc.ca',
          subject: `${FORM_NAME} - Access Requested`,
          title: 'Access Requested',
          priority: 'normal',
          message: `A request for access has been received for your ${FORM_NAME} administration page.`,
          messageLinkText: 'Please Login to view the Access Request(s).',
          messageLinkUrl: `https://comfort-dev.pathfinder.gov.bc.ca/app/${SLUG}/admin/team`
        },
        createdBy: CREATED_BY
      };
      return knex(`${PREFIX}_settings`).insert(data);
    });
};

exports.down = function(knex) {
  return Promise.resolve()
    .then(() => {
      return knex(`${PREFIX}_settings`).del();
    })
    .then(() => {
      return knex(`${PREFIX}_note`).del();
    })
    .then(() => {
      return knex(`${PREFIX}_submission_status`).del();
    })
    .then(() => {
      return knex(`${PREFIX}_submission_location`).del();
    })
    .then(() => {
      return knex(`${PREFIX}_submission_contact`).del();
    })
    .then(() => {
      return knex(`${PREFIX}_submission_business`).del();
    })
    .then(() => {
      return knex(`${PREFIX}_submission_attestation`).del();
    })
    .then(() => {
      return knex(`${PREFIX}_submission`).del();
    })
    .then(() => {
      return knex(`${PREFIX}_operation_type`).del();
    })
    .then(() => {
      return knex(`${PREFIX}_version_status_code`).del();
    })
    .then(() => {
      return knex(`${PREFIX}_status_code`).del();
    })
    .then(()=> {
      return knex(`${PREFIX}_form_version`).del();
    })
    .then(()=> {
      return knex(`${PREFIX}_form`).del();
    })
    .then(()=> {
      return knex('form').where('prefix', PREFIX).del();
    });
};
