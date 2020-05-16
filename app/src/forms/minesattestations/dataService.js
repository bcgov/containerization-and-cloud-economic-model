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
  },

  createSubmission: async (obj) => {
    if (!obj) {
      throw Error('Industrial Camp Submission cannot be created without data');
    }
    let trx;
    try {
      trx = await transaction.start(Models.Submission.knex());

      // all submissions use the current version...
      const current = await dataService.current();
      obj.formVersionId = current.versions[0].formVersionId;

      // set up the non-generated ids...
      const submissionId = uuidv4();
      const confirmationId = submissionId.substring(0,8);
      obj.submissionId = submissionId;
      obj.confirmationId = confirmationId;
      obj.attestation.attestationId = uuidv4();

      // add the initial submitted status to the graph
      obj.statuses = [{
        createdBy: '',
        code: constants.INITIAL_STATUS_CODE,
      }];

      await Models.Submission.query(trx).insertGraph(obj);
      await trx.commit();
      const result = await dataService.readSubmission(submissionId);
      return result;
    } catch (err) {
      log.error('create', `Error creating camp submission record: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  },

  readSubmission: async (submissionId) => {
    return Models.Submission.query()
      .findById(submissionId)
      .allowGraph('[attestation, business, covidContact, location, primaryContact, statuses.notes, notes]')
      .withGraphFetched('[attestation, business, covidContact, location, primaryContact]')
      .withGraphFetched('statuses(orderDescending).notes(orderDescending)')
      .withGraphFetched('notes(orderDescending)')
      .throwIfNotFound();
  },

  updateSubmission: async (obj, user) => {
    return {...obj, ...user};
  },

  searchSubmissions: async (params) => {
    return Models.Submission.query()
      .allowGraph('[attestation, business, covidContact, location, primaryContact, statuses.notes, notes]')
      .withGraphFetched('[attestation, business, covidContact, location, primaryContact]')
      .withGraphFetched('statuses(orderDescending).notes(orderDescending)')
      .withGraphFetched('notes(orderDescending)')
      .joinRelated('business')
      .joinRelated('location')
      .modify('filterVersion', params.version)
      .modify('filterConfirmationId', params.confirmationId)
      .modify('filterBusinessName', params.business)
      .modify('filterCity', params.city);
  },

  createSubmissionStatus: async (obj, submissionId, user) => {
    if (!obj) {
      throw Error('Status cannot be created without data');
    }
    let trx;
    try {
      trx = await transaction.start(Models.Status.knex());

      obj.submissionId = submissionId;
      obj.createdBy = user;

      if (obj.notes && Array.isArray(obj.notes)) {
        obj.notes.forEach(n => n.createdBy = user);
      }

      const result = await Models.Status.query(trx).insertGraph(obj).returning('*');
      await trx.commit();
      return result;
    } catch (err) {
      log.error('createSubmissionStatus', `Error creating status record: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  },

  readSubmissionStatuses: async (submissionId) => {
    return Models.Status.query()
      .where({submissionId: submissionId})
      .allowGraph('[notes]')
      .withGraphFetched('notes(orderDescending)')
      .modify('orderDescending')
      .throwIfNotFound();
  },

  createSubmissionStatusNote: async (obj, statusId, user) => {
    if (!obj) {
      throw Error('Note cannot be created without data');
    }
    let trx;
    try {
      trx = await transaction.start(Models.Note.knex());

      obj.submissionStatusId = statusId;
      obj.createdBy = user;

      const result = await Models.Note.query(trx).insert(obj).returning('*');
      await trx.commit();
      return result;
    } catch (err) {
      log.error('createSubmissionStatusNote', `Error creating status note record: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  },

  readSubmissionStatusNotes: async (statusId) => {
    const results = Models.Note.query()
      .where({submissionStatusId: statusId})
      .modify('orderDescending');
    return results || [];
  },

  createSubmissionNote: async (obj, submissionId, user) => {
    if (!obj) {
      throw Error('Note cannot be created without data');
    }
    let trx;
    try {
      trx = await transaction.start(Models.Note.knex());

      obj.submissionId = submissionId;
      obj.createdBy = user;

      const result = await Models.Note.query(trx).insert(obj).returning('*');
      await trx.commit();
      return result;
    } catch (err) {
      log.error('createSubmissionNote', `Error creating note record: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  },

  readSubmissionNotes: async (submissionId) => {
    let results = Models.Note.query()
      .where({submissionId: submissionId})
      .modify('orderDescending');
    if (!results) {
      results = [];
    }
    return results;
  }
};

module.exports = dataService;
