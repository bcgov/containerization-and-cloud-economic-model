const equal = require('fast-deep-equal');
const log = require('npmlog');
const Problem = require('api-problem');
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
      const confirmationId = submissionId.substring(0, 8).toUpperCase(); // for that nice frontend look!
      obj.submissionId = submissionId;
      obj.confirmationId = confirmationId;
      obj.attestation.attestationId = uuidv4();
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
        .allowGraph('[attestation, business, contacts, location]')
        .withGraphFetched('[attestation, business, location]')
        .withGraphFetched('contacts(orderContactType)')
        .throwIfNotFound();
    } else {
      return this._models.Submission.query()
        .findById(submissionId)
        .allowGraph('[attestation, business, contacts, location, statuses.[notes, statusCode], notes]')
        .withGraphFetched('[attestation, business, location]')
        .withGraphFetched('contacts(orderContactType)')
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
        .withGraphFetched('[business, contacts, location]')
        .throwIfNotFound();

      // check business... any changes?
      if (!this._equalTo(currentSubmission.business, obj.business)) {
        obj.business.updatedBy = user.username;
        await this._models.Business.query(trx).patchAndFetchById(obj.business.businessId, obj.business);
        doTheUpdate = true;
      }

      // check contacts... any changes?
      const primary = obj.contacts.find(x => x.contactType === this._constants.CONTACT_TYPE_PRIMARY);
      if (!this._equalTo(currentSubmission.contacts.find(x => x.contactType === this._constants.CONTACT_TYPE_PRIMARY), primary)) {
        primary.updatedBy = user.username;
        await this._models.Contact.query(trx).patchAndFetchById(primary.contactId, primary);
        doTheUpdate = true;
      }
      const covid = obj.contacts.find(x => x.contactType === this._constants.CONTACT_TYPE_COVID);
      if (!this._equalTo(currentSubmission.contacts.find(x => x.contactType === this._constants.CONTACT_TYPE_COVID), covid)) {
        covid.updatedBy = user.username;
        await this._models.Contact.query(trx).patchAndFetchById(covid.contactId, covid);
        doTheUpdate = true;
      }

      // check location... any changes?
      if (!this._equalTo(currentSubmission.location, obj.location)) {
        obj.location.updatedBy = user.username;
        await this._models.Location.query(trx).patchAndFetchById(obj.location.locationId, obj.location);
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
    if (params && params.tiny) {
      const submissions = await this._models.SubmissionSearchView.query()
        .modify('filterVersion', params.version)
        .modify('filterConfirmationId', params.confirmationId)
        .modify('filterBusinessName', params.business)
        .modify('filterCity', params.city)
        .modify('filterDeleted', params.deleted)
        .modify('orderDescending');
      return submissions;
    } else {
      const submissions = await this._models.Submission.query()
        .allowGraph('[attestation, business, contacts, location, statuses.[notes, statusCode], notes]')
        .withGraphFetched('[attestation, business, location]')
        .withGraphFetched('contacts(orderContactType)')
        .withGraphFetched('statuses(orderDescending).[notes(orderDescending),statusCode]')
        .withGraphFetched('notes(orderDescending)')
        .joinRelated('business')
        .joinRelated('location')
        .modify('filterVersion', params.version)
        .modify('filterConfirmationId', params.confirmationId)
        .modify('filterBusinessName', params.business)
        .modify('filterCity', params.city)
        .modify('filterDeleted', params.deleted)
        .modify('orderDescending');
      return submissions;
    }
  }
}

class OperationTypesDataService extends FormDataService {

  constructor(models, constants) {
    super(models, constants);
  }

  async readTypes(enabled) {
    return this._models.OperationType.query()
      .modify('filterEnabled', enabled)
      .modify('orderAscending');
  }

  async validateCreateSubmission(obj) {
    const types = await this.readTypes(true);
    const typeCode = types.find(x => equal(x.type, obj.type));
    if (!typeCode) {
      throw new Problem(422, 'Invalid Operation Type Code', {detail: `${obj.type||'<null>'} is not a valid, enabled operation type code.`});
    }
  }

  async readSubmission(submissionId, tiny) {
    if (tiny) {
      return this._models.Submission.query()
        .findById(submissionId)
        .allowGraph('[operationType, attestation, business, contacts, location]')
        .withGraphFetched('[operationType, attestation, business, location]')
        .withGraphFetched('contacts(orderContactType)')
        .throwIfNotFound();
    } else {
      return this._models.Submission.query()
        .findById(submissionId)
        .allowGraph('[operationType, attestation, business, contacts, location, statuses.[notes, statusCode], notes]')
        .withGraphFetched('[operationType, attestation, business, location]')
        .withGraphFetched('contacts(orderContactType)')
        .withGraphFetched('statuses(orderDescending).[notes(orderDescending),statusCode]')
        .withGraphFetched('notes(orderDescending)')
        .throwIfNotFound();
    }
  }

  async searchSubmissions(params) {
    if (params && params.tiny) {
      const submissions = await this._models.SubmissionSearchView.query()
        .modify('filterVersion', params.version)
        .modify('filterConfirmationId', params.confirmationId)
        .modify('filterBusinessName', params.business)
        .modify('filterCity', params.city)
        .modify('filterType', params.type)
        .modify('filterDeleted', params.deleted)
        .modify('orderDescending');
      return submissions;
    } else {

      const submissions = await this._models.Submission.query()
        .allowGraph('[operationType, attestation, business, contacts, location, statuses.[notes, statusCode], notes]')
        .withGraphFetched('[operationType, attestation, business, location]')
        .withGraphFetched('contacts(orderContactType)')
        .withGraphFetched('statuses(orderDescending).[notes(orderDescending),statusCode]')
        .withGraphFetched('notes(orderDescending)')
        .joinRelated('business')
        .joinRelated('location')
        .modify('filterVersion', params.version)
        .modify('filterConfirmationId', params.confirmationId)
        .modify('filterBusinessName', params.business)
        .modify('filterCity', params.city)
        .modify('filterType', params.type)
        .modify('filterDeleted', params.deleted)
        .modify('orderDescending');
      return submissions;
    }
  }

}

module.exports.FormDataService = FormDataService;
module.exports.OperationTypesDataService = OperationTypesDataService;
