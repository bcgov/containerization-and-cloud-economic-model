const PREFIX = require('../../forms/minesoperatorscreening/constants').PREFIX;

exports.up = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.alterTable(`${PREFIX}_submission`, table => {
      table.boolean('deleted').notNullable().defaultTo(false);
    }))
    .then(() => knex.schema.alterTable(`${PREFIX}_submission_status`, table => {
      table.string('classification').nullable().defaultTo(null);
    }))
    .then(() => knex.schema.alterTable(`${PREFIX}_status_code`, table => {
      table.specificType('allowedClassifications', 'text ARRAY').comment('This is an array of values for this status code to be further classified.');
    }));
};

exports.down = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.alterTable(`${PREFIX}_status_code`, table => {
      table.dropColumn('allowedClassifications');
    }))
    .then(() => knex.schema.alterTable(`${PREFIX}_submission_status`, table => {
      table.dropColumn('classification');
    }))
    .then(() => knex.schema.alterTable(`${PREFIX}_submission`, table => {
      table.dropColumn('deleted');
    }));
};
