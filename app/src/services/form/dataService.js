const log = require('npmlog');
const { transaction } = require('objection');
const { v4: uuidv4 } = require('uuid');

const DataConnection = require('../../db/dataConnection');

const Form = require('./models/form');

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
      throw Error('Form cannot be created with data');
    }
    let trx;
    try {
      trx = await transaction.start(Form.knex());
      const formId = uuidv4();

      await Form.query(trx).insert({
        formId: formId,
        createdBy: createdBy,
        ...obj
      });

      await trx.commit();

      const result = await this.read(formId);
      return result;
    } catch (err) {
      log.error('create', `Error creating form record: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  }

  async read(formId) {
    return Form.query()
      .findById(formId)
      .throwIfNotFound();
  }

  async all() {
    return Form.query();
  }

}

module.exports = DataService;
