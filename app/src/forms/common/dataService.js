const log = require('npmlog');
const Problem = require('api-problem');
const { transaction } = require('objection');

class DataService {

  constructor(models) {
    this._models = models;
  }

  async current(tiny){
    let form;
    let version;

    if (tiny) {
      form = await this._models.Form.query()
        .first()
        .throwIfNotFound();
      version = await this._models.Version.query()
        .first()
        .where('formId', form.formId)
        .modify('orderDescending')
        .throwIfNotFound();
    } else {
      form = await this._models.Form.query()
        .first()
        .withGraphFetched({ metadata: true})
        .throwIfNotFound();
      version = await this._models.Version.query()
        .first()
        .where('formId', form.formId)
        .withGraphFetched({ statusCodes: true})
        .modify('orderDescending')
        .throwIfNotFound();
    }
    form.versions = [version];
    form.formVersionId = version.formVersionId;
    return form;
  }

  async validateCreateSubmissionStatus(obj, submissionId) {
    const submission = await this.getSubmission(submissionId);
    const currentStatusCode = submission.statuses[0].statusCode;
    // only allow currently active statuses...
    const statusCode = await this._checkStatusCode(obj.code);
    if (!statusCode) {
      throw new Problem(422, 'Invalid Status Code', {detail: `${obj.code} is not a valid, enabled code.`});
    }
    // check that if a classification is set, that it is allowed for this status code...
    if (!await this._checkClassification(statusCode, obj.classification)) {
      throw new Problem(422, 'Invalid Classification', {detail: `${obj.classification} is not valid for status code ${statusCode.display}.`});
    }
    if (!currentStatusCode.nextCodes.includes(statusCode.code)) {
      throw new Problem(422, 'Invalid Next Code', {detail: `Cannot change state from ${currentStatusCode.display} to ${statusCode.display}.`});
    }
  }

  async createSubmissionStatus(obj, submissionId, user) {
    if (!obj) {
      throw Error('Status cannot be created without data');
    }

    await this.validateCreateSubmissionStatus(obj, submissionId);

    let trx;
    try {

      trx = await transaction.start(this._models.Status.knex());

      obj.submissionId = submissionId;
      obj.createdBy = user.username;

      if (obj.notes && Array.isArray(obj.notes)) {
        obj.notes.forEach(n => n.createdBy = user.username);
      }

      const result = await this._models.Status.query(trx).insertGraph(obj).returning('*');
      await trx.commit();
      return result;
    } catch (err) {
      log.error('createSubmissionStatus', `Error creating status record: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  }

  async readSubmissionStatuses(submissionId){
    return this._models.Status.query()
      .where({submissionId: submissionId})
      .allowGraph('[notes]')
      .withGraphFetched('notes(orderDescending)')
      .modify('orderDescending')
      .throwIfNotFound();
  }

  async createSubmissionStatusNote(obj, statusId, user) {
    if (!obj) {
      throw Error('Note cannot be created without data');
    }
    let trx;
    try {
      trx = await transaction.start(this._models.Note.knex());

      obj.submissionStatusId = parseInt(statusId);
      obj.createdBy = user.username;

      const result = await this._models.Note.query(trx).insert(obj).returning('*');
      await trx.commit();
      return result;
    } catch (err) {
      log.error('createSubmissionStatusNote', `Error creating status note record: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  }

  async readSubmissionStatusNotes(statusId){
    const results = this._models.Note.query()
      .where({submissionStatusId: statusId})
      .modify('orderDescending');
    return results || [];
  }

  async createSubmissionNote(obj, submissionId, user){
    if (!obj) {
      throw Error('Note cannot be created without data');
    }
    let trx;
    try {
      trx = await transaction.start(this._models.Note.knex());

      obj.submissionId = submissionId;
      obj.createdBy = user.username;

      const result = await this._models.Note.query(trx).insert(obj).returning('*');
      await trx.commit();
      return result;
    } catch (err) {
      log.error('createSubmissionNote', `Error creating note record: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  }

  async readSubmissionNotes(submissionId){
    let results = this._models.Note.query()
      .where({submissionId: submissionId})
      .modify('orderDescending');
    if (!results) {
      results = [];
    }
    return results;
  }

  async readCurrentStatusCodes (enabled) {
    const current = await this.current(true);
    const allStatuses = await this._models.StatusCode.query()
      .joinRelated('versions', { formVersionId: current.formVersionId });

    const statuses = await this._models.StatusCode.query()
      .joinRelated('versions', { formVersionId: current.formVersionId })
      .modify('filterEnabled', enabled);

    // let's flesh out the nextCodes by adding display and enabled...
    statuses.forEach(s => {
      s.nextCodes = s.nextCodes.map(n => {
        const sc = allStatuses.find(x => x.code === n);
        if (sc) return { code: n, display: sc.display, enabled: sc.enabled };
      }).filter(f => enabled === undefined || (enabled && f.enabled));
    });
    return statuses;
  }

  async getSubmission(submissionId) {
    return this._models.Submission.query()
      .findById(submissionId)
      .allowGraph('[statuses.statusCode]')
      .withGraphFetched('statuses(orderDescending).[statusCode]')
      .throwIfNotFound();
  }

  async updateCurrentStatusCodes (obj, user){
    if (!obj || !Array.isArray(obj)) {
      throw Error('Status Codes cannot be updated without data');
    }
    let trx;
    try {
      trx = await transaction.start(this._models.StatusCode.knex());
      // this is what we currently have, we cannot delete any status codes...
      const currentStatusCodes = await this.readCurrentStatusCodes();
      const currentCodes = currentStatusCodes.map(x => x.code);
      // these are all the codes that were submitted
      const submittedCodes = obj.map(x => x.code);
      const allowedNextCodes = Array.from(new Set([...currentCodes, ...submittedCodes]));

      // are we missing any current code from submitted codes?
      const missingCodes = currentCodes.filter(x => !submittedCodes.includes(x));
      // add them to our list, but mark disabled...
      missingCodes.forEach(x => {
        const sc = currentStatusCodes.find(c => c.code === x);
        sc.enabled = false;
        obj.push(sc);
      });

      // now, we filter out any "bad" next codes...
      obj.forEach(o => {
        o.nextCodes = o.nextCodes.filter(x => allowedNextCodes.includes(x));
        // and set the updated by
        o.updatedBy = user.username;
        if (!currentCodes.includes(o.code)) {
          o.createdBy = user.username;
        }
      });

      // ok, now let's upsert!
      await this._models.StatusCode.query().upsertGraph(obj, { insertMissing: true });
      await trx.commit();
      return this.readCurrentStatusCodes();
    } catch (err) {
      log.error('updateCurrentStatusCodes', `Error updating status codes: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  }

  async createSettings(obj, user){
    if (!obj) {
      throw Error('Settings cannot be created without data');
    }
    let trx;
    try {
      trx = await transaction.start(this._models.Settings.knex());

      obj.createdBy = user.username;
      await this._models.Settings.query().insert(obj);

      await trx.commit();

      const result = await this.readSettings(obj.name);
      return result;
    } catch (err) {
      log.error('create', `Error creating settings record: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  }

  async updateSettings(name, obj, user){
    if (!obj) {
      throw Error('Settings cannot be updated without data');
    }
    let trx;
    try {
      trx = await transaction.start(this._models.Settings.knex());
      obj.updatedBy = user.username;
      await this._models.Settings.query(trx).patchAndFetchById(name, obj).throwIfNotFound();
      await trx.commit();
      const result = await this.readSettings(name);
      return result;
    } catch (err) {
      log.error('create', `Error updating settings record: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  }

  async settingsExist(name) {
    return this._models.Settings.query().findById(name);
  }

  async readSettings (name) {
    return this._models.Settings.query()
      .findById(name)
      .throwIfNotFound();
  }

  async allSettings(enabled){
    return this._models.Settings.query()
      .modify('filterEnabled', enabled)
      .modify('orderDescending');
  }

  async _checkStatusCode(code) {
    if (code === undefined || code === null) return null;
    const statusCodes = await this.readCurrentStatusCodes(true);
    return statusCodes.find(x => x.code === code);
  }

  async _checkClassification(code, classification) {
    if (classification === undefined || classification === null) return true;

    const classifications = code.allowedClassifications || [];
    return classifications.includes(classification);
  }

}

module.exports = DataService;
