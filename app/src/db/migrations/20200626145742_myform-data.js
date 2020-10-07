const { v4: uuidv4 } = require('uuid');

const PREFIX = require('../../forms/cloudeconomicmodel/constants').PREFIX;
const SLUG = require('../../forms/cloudeconomicmodel/constants').SLUG;
const CREATED_BY = 'migration-cloudeconomicmodel';

const FORM_NAME = 'Cloud Economic Model Survey';

const statusCodes = [
  {code:'SUBMITTED', display: 'Submitted', enabled: true, nextCodes: ['ASSIGNED', 'COMPLETED'], allowedClassifications: [], createdBy: CREATED_BY},
  {code:'ASSIGNED', display: 'Assigned', enabled: true, nextCodes: ['ASSIGNED', 'COMPLETED'], allowedClassifications: [], createdBy: CREATED_BY},
  {code:'COMPLETED', display: 'Completed', enabled: true, nextCodes: ['ASSIGNED'], allowedClassifications: ['Pass', 'Fail'], createdBy: CREATED_BY}
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
      const form = {
        formId: uuidv4(),
        name: FORM_NAME,
        keywords:['demo','sample','example', 'cloudeconomicmodel'],
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
        description: 'This is an example form, for developer demonstration purposes only',
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
        name: 'someConfiguration',
        enabled: true,
        config: {
          data: 'Just a sample of configuration'
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
      return knex(`${PREFIX}_submission_survey`).del();
    })
    .then(() => {
      return knex(`${PREFIX}_submission`).del();
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
