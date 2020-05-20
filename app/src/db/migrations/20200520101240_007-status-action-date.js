const PREFIX = require('../../forms/minesattestations/constants').PREFIX;

exports.up = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.alterTable(`${PREFIX}_submission_status`, table => {
      table.date('actionDate').nullable();
    }));
};

exports.down = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.alterTable(`${PREFIX}_submission_status`, table => {
      table.dropColumn('actionDate');
    }));
};
