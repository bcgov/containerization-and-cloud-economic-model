
const AGRI_PREFIX = require('../../forms/attestations/agriseafoodopscreening/constants').PREFIX;

exports.up = function (knex) {
  return Promise.resolve()
    .then(() => knex.schema.alterTable(`${AGRI_PREFIX}_submission_attestation`, table => {
      table.boolean('sharedSleepingCommunication').notNullable().defaultTo(false);
      table.boolean('sharedSleepingProvidedAccommodations').notNullable().defaultTo(false);

      table.dropColumn('sharedSleepingPerRoom');
      table.dropColumn('sleepingAreaType');
      table.dropColumn('commonAreaDistancing');
    }))
    .then(() => knex.schema.alterTable(`${AGRI_PREFIX}_submission_attestation`, table => {
      table.boolean('sharedSleepingCommunication').notNullable().alter();
      table.boolean('sharedSleepingProvidedAccommodations').notNullable().alter();
    }));
};

exports.down = function (knex) {
  return Promise.resolve()
    .then(() => knex.schema.alterTable(`${AGRI_PREFIX}_submission_attestation`, table => {
      table.dropColumn('sharedSleepingProvidedAccommodations');
      table.dropColumn('sharedSleepingCommunication');

      table.boolean('commonAreaDistancing').notNullable().defaultTo(false);
      table.enu('sleepingAreaType', ['SINGLE', 'SHARED']).notNullable().defaultTo('SINGLE');
      table.integer('sharedSleepingPerRoom').notNullable().defaultTo(0);
    }));
};
