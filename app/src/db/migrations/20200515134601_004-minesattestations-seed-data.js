const { v4: uuidv4 } = require('uuid');

const PREFIX = require('../../forms/minesattestations/constants').PREFIX;
const SLUG = require('../../forms/minesattestations/constants').SLUG;
const CREATED_BY = 'migration-004';

exports.up = function(knex) {
  return knex(`${PREFIX}_status_code`).del()
    .then(()=> {
      return knex(`${PREFIX}_form_version`).del();
    })
    .then(()=> {
      return knex(`${PREFIX}_form`).del();
    })
    .then(()=> {
      return knex('form').del();
    })
    .then(() => {
      const form = {
        formId: uuidv4(),
        name: 'Industrial Camps',
        keywords:['covid','camps','industrial','attestation','attestations', 'mines', 'mx', 'mcad'],
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
        description: 'This is an attestation form for Mine Operations',
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
      const formVersionId = formVersionIds[0];
      const statusCodes = [
        {formVersionId: formVersionId, code:'SUBMITTED', display: 'Submitted', enabled: true, nextCodes: ['ASSIGNED', 'COMPLETED'], createdBy: CREATED_BY},
        {formVersionId: formVersionId, code:'ASSIGNED', display: 'Assigned', enabled: true, nextCodes: ['COMPLETED'], createdBy: CREATED_BY},
        {formVersionId: formVersionId, code:'COMPLETED', display: 'Completed', enabled: true, nextCodes: [], createdBy: CREATED_BY}
      ];
      return knex(`${PREFIX}_status_code`).insert(statusCodes);
    });

};

exports.down = function(knex) {
  return knex(`${PREFIX}_status_code`).del()
    .then(()=> {
      return knex(`${PREFIX}_form_version`).del();
    })
    .then(()=> {
      return knex(`${PREFIX}_form`).del();
    })
    .then(()=> {
      return knex('form').del();
    });
};
