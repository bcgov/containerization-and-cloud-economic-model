
const AGRI_PREFIX = require('../../forms/attestations/agriseafoodopscreening/constants').PREFIX;

exports.up = function (knex) {
  return Promise.resolve()
    .then(() => knex.schema.alterTable(`${AGRI_PREFIX}_submission_location`, table => {
      table.dropColumn('licencees');
    }));
};

exports.down = function (knex) {
  return Promise.resolve()
    .then(() => knex.schema.alterTable(`${AGRI_PREFIX}_submission_location`, table => {
      table.string('licencees', 1000).nullable().comment('Name of licencee(s) (free text)');
    }));
};
