const pkg = require('../../../package.json');

exports.up = function (knex) {
  return Promise.resolve()
    .then(() => knex.schema.createTable('release_notes', table => {
      table.uuid('releaseNotesId').primary();
      table.string('version').notNullable().defaultTo(pkg.version);
      table.string('notes').notNullable().defaultTo(pkg.name);
      table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
      table.timestamp('updatedAt', { useTz: true }).defaultTo(knex.fn.now());
    }));
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('release_notes');
};
