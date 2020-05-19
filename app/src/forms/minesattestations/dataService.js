const equal = require('fast-deep-equal');
const log = require('npmlog');
const { transaction } = require('objection');
const { v4: uuidv4 } = require('uuid');

const constants = require('./constants');
const Models = require('./models');

const copyAndRemoveStamps = (obj) => {
  let items = obj;
  if (!Array.isArray(items)) {
    items = [obj];
  }
  return items.map(o => {
    const x = {...o};
    ['createdAt','createdBy','updatedAt','updatedBy'].forEach(p => delete x[p]);
    return x;
  });
};

const equalTo = (a, b) => {
  const x = copyAndRemoveStamps(a);
  const y = copyAndRemoveStamps(b);
  return equal(x,y);
};

const dataService = {

  create: async (obj, user) => {
    if (!obj) {
      throw Error('Mines Attestation cannot be created without data');
    }
    let trx;
    try {
      trx = await transaction.start(Models.Metadata.knex());

      const formId = uuidv4();
      // set the metadata
      const metadata = {
        formId: formId,
        slug: constants.SLUG,
        prefix: constants.PREFIX,
        ...obj.metadata
      };
      // set the versions
      const versions = obj.versions.map(v => {
        // this is a new version, set the user stamp
        v.statusCodes.forEach(s => s.createdBy = user.username);
        v.createdBy = user.username;
        return v;
      });

      await Models.Form.query(trx).insertGraph({
        metadata: {
          createdBy: user.username,
          ...metadata
        },
        createdBy: user.username,
        description: obj.description,
        versions: versions
      });

      await trx.commit();

      const result = await dataService.read();
      return result;
    } catch (err) {
      log.error('create', `Error creating Mines Attestation record: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  },

  update: async (obj, user) => {
    if (!obj) {
      throw Error('Mines Attestation cannot be updated without data');
    }
    let trx;
    try {
      trx = await transaction.start(Models.Metadata.knex());

      // this property could come in from a /current query...
      // it's an additional helper field we don't want here.
      delete obj.formVersionId;

      // if exists, then we update with a new version...
      const current = await Models.Form.query()
        .first()
        .throwIfNotFound();

      // set the metadata (ensure nothing critical has changed...)
      const metadata = {
        formId: current.formId,
        slug: constants.SLUG,
        prefix: constants.PREFIX,
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
      await Models.Metadata.query(trx).patchAndFetchById(current.formId, metadata);

      // update the form...
      await Models.Form.query(trx).patchAndFetchById(current.formId, {
        updatedBy: user.username,
        description: obj.description
      });

      // add/update status codes
      await Models.StatusCode.query(trx).upsertGraph(version.statusCodes, { insertMissing: true });

      // add new version
      const versionRec = await Models.Version.query(trx).insert(version);

      // add the relationships for version/codes
      await versionRec.$relatedQuery('statusCodes', trx).relate(version.statusCodes);

      await trx.commit();

      const result = await dataService.read();
      return result;
    } catch (err) {
      log.error('create', `Error updating Mines Attestation record: ${err.message}. Rolling back...`);
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

  current: async (tiny) => {
    let form;
    let version;

    if (tiny) {
      form = await Models.Form.query()
        .first()
        .throwIfNotFound();
      version = await Models.Version.query()
        .first()
        .where('formId', form.formId)
        .modify('orderDescending')
        .throwIfNotFound();
    } else {
      form = await Models.Form.query()
        .first()
        .withGraphFetched({ metadata: true})
        .throwIfNotFound();
      version = await Models.Version.query()
        .first()
        .where('formId', form.formId)
        .withGraphFetched({ statusCodes: true})
        .modify('orderDescending')
        .throwIfNotFound();
    }
    form.versions = [version];
    form.formVersionId = version.formVersionId;
    return form;
  },

  createSubmission: async (obj) => {
    if (!obj) {
      throw Error('Mines Attestation Submission cannot be created without data');
    }
    let trx;
    try {
      trx = await transaction.start(Models.Submission.knex());

      // all submissions use the current version...
      const current = await dataService.current(true);
      obj.formVersionId = current.formVersionId;

      // set up the non-generated ids...
      const submissionId = uuidv4();
      const confirmationId = submissionId.substring(0,8);
      obj.submissionId = submissionId;
      obj.confirmationId = confirmationId;
      obj.attestation.attestationId = uuidv4();

      // add the initial submitted status to the graph
      obj.statuses = [{
        code: constants.INITIAL_STATUS_CODE,
      }];

      await Models.Submission.query(trx).insertGraph(obj);
      await trx.commit();
      const result = await dataService.readSubmission(submissionId);
      return result;
    } catch (err) {
      log.error('create', `Error creating Mines Attestation submission record: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  },

  readSubmission: async (submissionId) => {
    // put a tiny switch in here too, probably needed for public consumption (no notes, statuses etc).
    return Models.Submission.query()
      .findById(submissionId)
      .allowGraph('[attestation, business, contacts, location, statuses.[notes, statusCode], notes]')
      .withGraphFetched('[attestation, business, contacts, location]')
      .withGraphFetched('statuses(orderDescending).[notes(orderDescending),statusCode]')
      .withGraphFetched('notes(orderDescending)')
      .throwIfNotFound();
  },

  updateSubmission: async (submissionId, obj, user) => {
    // update: location, contacts, business
    if (!obj) {
      throw Error('Mines Attestation Submission cannot be updated without data');
    }
    let trx;
    try {
      trx = await transaction.start(Models.Submission.knex());
      let doTheUpdate = false;
      const currentSubmission = await Models.Submission.query()
        .first()
        .where({ submissionId: submissionId })
        .where({ submissionId: obj.submissionId })
        .withGraphFetched('[business, contacts, location]')
        .throwIfNotFound();

      // check business... any changes?
      if (!equalTo(currentSubmission.business, obj.business)) {
        obj.business.updatedBy = user.username;
        await Models.Business.query(trx).patchAndFetchById(obj.business.businessId, obj.business);
        doTheUpdate = true;
      }

      // check contacts... any changes?
      const primary = obj.contacts.find(x => x.contactType === constants.CONTACT_TYPE_PRIMARY);
      if (!equalTo(currentSubmission.contacts.find(x => x.contactType === constants.CONTACT_TYPE_PRIMARY), primary)) {
        primary.updatedBy = user.username;
        await Models.Contact.query(trx).patchAndFetchById(primary.contactId, primary);
        doTheUpdate = true;
      }
      const covid = obj.contacts.find(x => x.contactType === constants.CONTACT_TYPE_COVID);
      if (!equalTo(currentSubmission.contacts.find(x => x.contactType === constants.CONTACT_TYPE_COVID), covid)) {
        covid.updatedBy = user.username;
        await Models.Contact.query(trx).patchAndFetchById(covid.contactId, covid);
        doTheUpdate = true;
      }

      // check location... any changes?
      if (!equalTo(currentSubmission.location, obj.location)) {
        obj.location.updatedBy = user.username;
        await Models.Location.query(trx).patchAndFetchById(obj.location.locationId, obj.location);
        doTheUpdate = true;
      }

      if (doTheUpdate) {
        // only want to update the who and when...
        await Models.Submission.query(trx).patchAndFetchById(obj.submissionId, { updatedBy: user.username });
      }
      await trx.commit();
      const result = await dataService.readSubmission(obj.submissionId);
      return result;
    } catch (err) {
      log.error('create', `Error updating Mines Attestation submission: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  },

  searchSubmissions: async (params) => {
    const tiny = data => {
      if (!data || !Array.isArray(data) || !data.length) {
        return [];
      }
      // asked for the tiny result set, so shrink it down!
      return data.map(d => {
        return {
          submissionId: d.submissionId,
          formVersionId: d.formVersionId,
          confirmationId: d.confirmationId,
          createdAt: d.createdAt,
          businessName: d.business.name,
          city: d.location.city,
          status: d.statuses[0].statusCode.display
        };
      });
    };

    const submissions = await Models.Submission.query()
      .allowGraph('[attestation, business, contacts, location, statuses.[notes, statusCode], notes]')
      .withGraphFetched('[attestation, business, contacts, location]')
      .withGraphFetched('statuses(orderDescending).[notes(orderDescending),statusCode]')
      .withGraphFetched('notes(orderDescending)')
      .joinRelated('business')
      .joinRelated('location')
      .modify('filterVersion', params.version)
      .modify('filterConfirmationId', params.confirmationId)
      .modify('filterBusinessName', params.business)
      .modify('filterCity', params.city)
      .modify('orderDescending');

    return params.tiny ? tiny(submissions) : submissions;
  },

  createSubmissionStatus: async (obj, submissionId, user) => {
    if (!obj) {
      throw Error('Status cannot be created without data');
    }
    let trx;
    try {
      trx = await transaction.start(Models.Status.knex());

      obj.submissionId = submissionId;
      obj.createdBy = user.username;

      if (obj.notes && Array.isArray(obj.notes)) {
        obj.notes.forEach(n => n.createdBy = user.username);
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

      obj.submissionStatusId = parseInt(statusId);
      obj.createdBy = user.username;

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
      obj.createdBy = user.username;

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
  },

  readCurrentStatusCodes: async (enabled) => {
    const current = await dataService.current(true);
    const allStatuses = await Models.StatusCode.query()
      .joinRelated('versions', { formVersionId: current.formVersionId });

    const statuses = await Models.StatusCode.query()
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
  },

  updateCurrentStatusCodes: async (obj, user) => {
    if (!obj || !Array.isArray(obj)) {
      throw Error('Status Codes cannot be updated without data');
    }
    let trx;
    try {
      trx = await transaction.start(Models.StatusCode.knex());
      // this is what we currently have, we cannot delete any status codes...
      const currentStatusCodes = await dataService.readCurrentStatusCodes();
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
      await Models.StatusCode.query().upsertGraph(obj, { insertMissing: true });
      await trx.commit();
      return dataService.readCurrentStatusCodes();
    } catch (err) {
      log.error('updateCurrentStatusCodes', `Error updating status codes: ${err.message}. Rolling back...`);
      log.error(err);
      if (trx) await trx.rollback();
      throw err;
    }
  }
};

module.exports = dataService;
