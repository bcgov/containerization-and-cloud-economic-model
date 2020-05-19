const PREFIX = require('../../forms/minesattestations/constants').PREFIX;

exports.up = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.alterTable(`${PREFIX}_submission_attestation`, table => {
      table.boolean('transportationSingleOccupant').notNullable().defaultTo(false);
      table.boolean('transportationBusesVans').notNullable().defaultTo(false);
      table.boolean('transportationTrucksCars').notNullable().defaultTo(false);
      table.boolean('transportationHelicopter').notNullable().defaultTo(false);
      table.boolean('transportationTravelPod').notNullable().defaultTo(false);
      table.boolean('transportationCleaningDistancing').notNullable().defaultTo(false);
    }));
};

exports.down = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.alterTable(`${PREFIX}_submission_attestation`, table => {
      table.dropColumn('transportationSingleOccupant');
      table.dropColumn('transportationBusesVans');
      table.dropColumn('transportationTrucksCars');
      table.dropColumn('transportationHelicopter');
      table.dropColumn('transportationTravelPod');
      table.dropColumn('transportationCleaningDistancing');
    }));
};
