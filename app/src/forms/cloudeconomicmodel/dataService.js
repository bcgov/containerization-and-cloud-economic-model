const equal = require('fast-deep-equal');
const log = require('npmlog');
const {transaction} = require('objection');
const {v4: uuidv4} = require('uuid');

const DataService = require('../common/dataService');

class FormDataService extends DataService {

  constructor(models, constants) {
    super(models);
    this._constants = constants;
  }

  _copyAndRemoveStamps(obj){
    let items = obj;
    if (!Array.isArray(items)) {
      items = [obj];
    }
    return items.map(o => {
      const x = {...o};
      ['createdAt', 'createdBy', 'updatedAt', 'updatedBy'].forEach(p => delete x[p]);
      return x;
    });
  }

  _equalTo(a, b) {
    const x = this._copyAndRemoveStamps(a);
    const y = this._copyAndRemoveStamps(b);
    return equal(x, y);
  }

  // eslint-disable-next-line no-unused-vars
  async validateCreate(obj) {
    return true;
  }

  async create(obj, user) {
    if (!obj) {
      throw Error(`${this._constants.TITLE} cannot be created without data`);
    }

    await this.validateCreate(obj);

    let trx;
    try {
      trx = await transaction.start(this._models.Metadata.knex());

      const formId = uuidv4();
      // set the metadata
      const metadata = {
        formId: formId,
        slug: this._constants.SLUG,
        prefix: this._constants.PREFIX,
        ...obj.metadata
      };
      // set the versions
      const versions = obj.versions.map(v => {
        // this is a new version, set the user stamp
        v.statusCodes.forEach(s => s.createdBy = user.username);
        v.createdBy = user.username;
        return v;
      });

      await this._models.Form.query(trx).insertGraph({
        metadata: {
          createdBy: user.username,
          ...metadata
        },
        createdBy: user.username,
        description: obj.description,
        versions: versions
      });

      await trx.commit();

      const result = await this.read();
      return result;
    } catch (err) {
      log.error('create', `Error creating ${this._constants.TITLE} record: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  }

  // eslint-disable-next-line no-unused-vars
  async validateUpdate(obj) {
    return true;
  }

  async update(obj, user) {
    if (!obj) {
      throw Error(`${this._constants.TITLE} cannot be updated without data`);
    }

    await this.validateUpdate(obj);

    let trx;
    try {
      trx = await transaction.start(this._models.Metadata.knex());

      // this property could come in from a /current query...
      // it's an additional helper field we don't want here.
      delete obj.formVersionId;

      // if exists, then we update with a new version...
      const current = await this._models.Form.query()
        .first()
        .throwIfNotFound();

      // set the metadata (ensure nothing critical has changed...)
      const metadata = {
        formId: current.formId,
        slug: this._constants.SLUG,
        prefix: this._constants.PREFIX,
        ...obj.metadata
      };

      // set the versions (only add the new one(s))
      const version = obj.versions.find(f => !f.formVersionId);
      version.formId = current.formId;
      version.statusCodes.forEach(s => {
        s.createdBy = user.username;
        s.updatedBy = user.username;
      });
      version.createdBy = user.username;

      // update the form metadata...
      await this._models.Metadata.query(trx).patchAndFetchById(current.formId, metadata);

      // update the form...
      await this._models.Form.query(trx).patchAndFetchById(current.formId, {
        updatedBy: user.username,
        description: obj.description
      });

      // add/update status codes
      await this._models.StatusCode.query(trx).upsertGraph(version.statusCodes, {insertMissing: true});

      // add new version
      const versionRec = await this._models.Version.query(trx).insert(version);

      // add the relationships for version/codes
      await versionRec.$relatedQuery('statusCodes', trx).relate(version.statusCodes);

      await trx.commit();

      const result = await this.read();
      return result;
    } catch (err) {
      log.error('create', `Error updating ${this._constants.TITLE} record: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  }

  async exists() {
    return this._models.Form.query().first();
  }

  async read() {
    return this._models.Form.query()
      .first()
      .allowGraph('[versions.statusCodes, metadata]')
      .withGraphFetched('metadata')
      .withGraphFetched('versions(orderDescending).statusCodes')
      .throwIfNotFound();
  }

  async current(tiny) {
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
        .withGraphFetched({metadata: true})
        .throwIfNotFound();
      version = await this._models.Version.query()
        .first()
        .where('formId', form.formId)
        .withGraphFetched({statusCodes: true})
        .modify('orderDescending')
        .throwIfNotFound();
    }
    form.versions = [version];
    form.formVersionId = version.formVersionId;
    return form;
  }

  // eslint-disable-next-line no-unused-vars
  async validateCreateSubmission(obj) {
    return;
  }

  async createSubmission(obj, user) {
    if (!obj) {
      throw Error(`${this._constants.TITLE} Submission cannot be created without data`);
    }

    await this.validateCreateSubmission(obj);

    let trx;
    try {
      trx = await transaction.start(this._models.Submission.knex());

      // all submissions use the current version...
      const current = await this.current(true);
      obj.formVersionId = current.formVersionId;

      // set up the non-generated ids...
      const submissionId = uuidv4();
      obj.submissionId = submissionId;
      obj.createdBy = user.username;

      // add the initial submitted status to the graph
      obj.statuses = [{
        code: this._constants.INITIAL_STATUS_CODE,
        createdBy: user.username
      }];

      await this._models.Submission.query(trx).insertGraph(obj);
      await trx.commit();
      const result = await this.readSubmission(submissionId);
      return result;
    } catch (err) {
      log.error('create', `Error creating ${this._constants.TITLE} submission record: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  }

  async readSubmission(submissionId, tiny) {
    if (tiny) {
      return this._models.Submission.query()
        .findById(submissionId)
        .allowGraph('[survey]')
        .withGraphFetched('[survey]')
        .throwIfNotFound();
    } else {
      return this._models.Submission.query()
        .findById(submissionId)
        .allowGraph('[survey, statuses.[notes, statusCode], notes]')
        .withGraphFetched('[survey]')
        .withGraphFetched('statuses(orderDescending).[notes(orderDescending),statusCode]')
        .withGraphFetched('notes(orderDescending)')
        .throwIfNotFound();
    }
  }

  // eslint-disable-next-line no-unused-vars
  async validateUpdateSubmission(submissionId, obj) {
    return;
  }

  async updateSubmission(submissionId, obj, user) {
    // update: location, contacts, business
    if (!obj) {
      throw Error(`${this._constants.TITLE} Submission cannot be updated without data`);
    }

    await this.validateUpdateSubmission(submissionId, obj);

    let trx;
    try {
      trx = await transaction.start(this._models.Submission.knex());
      let doTheUpdate = false;
      const currentSubmission = await this._models.Submission.query()
        .first()
        .where({submissionId: submissionId})
        .where({submissionId: obj.submissionId})
        .withGraphFetched('[survey]')
        .throwIfNotFound();

      // check survey... any changes?
      if (!this._equalTo(currentSubmission.survey, obj.survey)) {
        obj.survey.updatedBy = user.username;
        await this._models.Survey.query(trx).patchAndFetchById(obj.survey.surveyId, obj.survey);
        doTheUpdate = true;
      }

      if (doTheUpdate) {
        // only want to update the who and when...
        await this._models.Submission.query(trx).patchAndFetchById(obj.submissionId, {updatedBy: user.username});
      }
      await trx.commit();
      const result = await this.readSubmission(obj.submissionId);
      return result;
    } catch (err) {
      log.error('create', `Error updating ${this._constants.TITLE} submission: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  }

  // eslint-disable-next-line no-unused-vars
  async validateDeleteSubmission(submissionId) {
    return;
  }

  async deleteSubmission(submissionId, user) {
    if (!submissionId) {
      throw Error(`${this._constants.TITLE} Submission cannot be deleted without an id`);
    }

    await this.validateDeleteSubmission(submissionId);

    let trx;
    try {
      trx = await transaction.start(this._models.Submission.knex());
      await this._models.Submission.query(trx).patchAndFetchById(submissionId, {
        deleted: true,
        updatedBy: user.username
      });
      await trx.commit();
      const result = await this.readSubmission(submissionId);
      return result;
    } catch (err) {
      log.error('create', `Error deleting ${this._constants.TITLE} submission: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  }

  async searchSubmissions(params) {
    const tiny = data => {
      if (!data || !Array.isArray(data) || !data.length) {
        return [];
      }
      // asked for the tiny result set, so shrink it down!
      return data.map(d => {
        return {
          submissionId: d.submissionId,
          formVersionId: d.formVersionId,
          createdAt: d.createdAt,
          surveyId: d.survey.surveyId,
          submitter: d.survey.submitter,
          city: d.location.city,
          status: d.statuses[0].statusCode.display,
          assignedTo: d.statuses[0].assignedTo,
          deleted: d.deleted
        };
      });
    };

    const submissions = await this._models.Submission.query()
      .allowGraph('[survey, statuses.[notes, statusCode], notes]')
      .withGraphFetched('[survey]')
      .withGraphFetched('statuses(orderDescending).[notes(orderDescending),statusCode]')
      .withGraphFetched('notes(orderDescending)')
      .modify('filterVersion', params.version)
      .modify('filterDeleted', params.deleted)
      .modify('orderDescending');

    return params.tiny ? tiny(submissions) : submissions;
  }

}

module.exports.FormDataService = FormDataService;
