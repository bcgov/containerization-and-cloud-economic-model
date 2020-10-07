const stamps = require('../stamps');

const PREFIX = require('../../forms/cloudeconomicmodel/constants').PREFIX;

exports.up = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.createTable(`${PREFIX}_submission_survey`, table => {
      table.increments('surveyId').primary();
      table.uuid('submissionId').references('submissionId').inTable(`${PREFIX}_submission`).notNullable().index();
      table.string('submitter').notNullable();
      table.string('answer1').notNullable();
      table.string('answer2').notNullable();
      table.string('answer3').nullable();
      stamps(knex, table);
    }));
};

exports.down = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.dropTableIfExists(`${PREFIX}_submission_survey`));
};
