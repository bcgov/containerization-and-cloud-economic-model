const log = require('npmlog');
const { transaction } = require('objection');
const { v4: uuidv4 } = require('uuid');

const constants = require('./constants');
const Models = require('./models');

const dataService = {

  create: async (obj, createdBy) => {
    if (!obj) {
      throw Error('Industrial Camp cannot be created without data');
    }
    let trx;
    try {
      trx = await transaction.start(Models.Metadata.knex());
      const formId = uuidv4();

      // set the created by for each object in the graph...
      const versions = obj.versions.map(v => {
        v.statusCodes.forEach(s => s.createdBy = createdBy);
        v.createdBy = createdBy;
        return v;
      });

      await Models.Form.query(trx).insertGraph({
        metadata: {
          formId: formId,
          createdBy: createdBy,
          slug: constants.SLUG,
          prefix: constants.PREFIX,
          ...obj.metadata
        },
        createdBy: createdBy,
        description: obj.description,
        versions: versions
      });

      await trx.commit();

      const result = await dataService.read();
      return result;
    } catch (err) {
      log.error('create', `Error creating camp record: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  },

  exists: async () => {
    return Models.Form.query()
      .first();
  },

  read: async () => {
    return Models.Form.query()
      .first()
      .allowGraph('[versions.statusCodes, metadata]')
      .withGraphFetched('metadata')
      .withGraphFetched('versions(orderDescending).statusCodes')
      .throwIfNotFound();
  },

  current: async () => {
    const form = await Models.Form.query()
      .first()
      .withGraphFetched({ metadata: true})
      .throwIfNotFound();

    const version = await Models.Version.query()
      .first()
      .where('formId', form.formId)
      .withGraphFetched({ statusCodes: true})
      .modify('orderDescending')
      .throwIfNotFound();

    form.versions = [version];
    return form;
  }

};

module.exports = dataService;
