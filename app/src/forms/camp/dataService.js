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
      trx = await transaction.start(Models.Root.knex());
      const formId = uuidv4();
      const formVersionId = uuidv4();

      await Models.Root.query(trx).insert({
        formId: formId,
        createdBy: createdBy,
        slug: constants.SLUG,
        prefix: constants.PREFIX,
        name: obj.name,
        public: obj.public || false,
        keywords: obj.keywords || []
      });

      await Models.Form.query(trx).insert({
        formId: formId,
        createdBy: createdBy,
        name: obj.name,
        description: obj.description,
        startDate: obj.startDate,
        endDate: obj.endDate
      });

      await Models.Version.query(trx).insert({
        formId: formId,
        formVersionId: formVersionId,
        createdBy: createdBy
      });

      if (Array.isArray(obj.statusCodes)) {
        await Promise.all(obj.statusCodes.map(s => {
          return Models.StatusCode.query(trx).insert({
            formVersionId: formVersionId,
            ...s
          });
        }));
      }

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
      .withGraphFetched({versions: { statusCodes: true }})
      .throwIfNotFound();
  }

};

module.exports = dataService;
