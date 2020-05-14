const log = require('npmlog');
const { transaction } = require('objection');

const DataConnection = require('../../db/dataConnection');

const Camp = require('./models/camp');

class DataService {
  constructor() {
    this.connection = new DataConnection();
  }

  get connection() {
    return this._connection;
  }

  set connection(v) {
    this._connection = v;
  }

  async create(obj, createdBy) {
    if (!obj) {
      throw Error('Industrial Camp cannot be created with data');
    }
    if (!obj.formId) {
      throw Error('Industrial Camp cannot be created with form');
    }
    let trx;
    try {
      trx = await transaction.start(Camp.knex());

      await Camp.query(trx).insert({
        createdBy: createdBy,
        ...obj
      });

      await trx.commit();

      const result = await this.read(obj.formId);
      return result;
    } catch (err) {
      log.error('create', `Error creating camp record: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  }

  async read(formId) {
    return Camp.query()
      .findById(formId)
      .throwIfNotFound();
  }

  async all() {
    return Camp.query().first();
  }

}

module.exports = DataService;
