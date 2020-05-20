const PREFIX = require('../../forms/minesattestations/constants').PREFIX;

exports.up = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.alterTable(`${PREFIX}_submission_status`, table => {
      table.string('assignedToEmail');
    }));
};

exports.down = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.alterTable(`${PREFIX}_submission_status`, table => {
      table.dropColumn('assignedToEmail');
    }));
};
