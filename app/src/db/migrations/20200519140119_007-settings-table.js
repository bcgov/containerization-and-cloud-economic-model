const stamps = require('../stamps');

const PREFIX = require('../../forms/minesattestations/constants').PREFIX;

exports.up = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.createTable(`${PREFIX}_settings`, table => {
      table.string('name').primary();
      table.boolean('enabled').notNullable().defaultTo(true);
      table.jsonb('config');
      stamps(knex, table);
    }));
};

exports.down = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.dropTableIfExists(`${PREFIX}_settings`));
};
