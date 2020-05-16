const stamps = require('../stamps');

exports.up = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.createTable('form', table => {
      table.uuid('formId').primary();
      table.string('name').unique().notNullable();
      table.string('slug').unique().notNullable().comment('This will be used for paths and user interactions');
      table.boolean('public').notNullable().defaultTo(true);
      table.boolean('active').notNullable().defaultTo(true);
      table.specificType('keywords', 'text ARRAY');
      table.string('prefix').unique().notNullable().comment('This is the database table prefix for all the form business tables.');
      stamps(knex, table);
    }));
};

exports.down = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.dropTableIfExists('form'));
};
