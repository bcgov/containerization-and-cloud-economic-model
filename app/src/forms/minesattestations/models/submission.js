const { Model } = require('objection');
const { UpdatedAt } = require('../../../db/models/mixins');

const Models = require('./base');
const PREFIX = require('../constants').PREFIX;
const SUBMISSION = `${PREFIX}_submission`;

class Submission extends UpdatedAt(Model) {
  static get tableName () {
    return `${SUBMISSION}`;
  }

  static get idColumn () {
    return 'submissionId';
  }

  static get modifiers () {
    return {
      orderDescending(builder) {
        builder.orderBy('updatedAt', 'desc');
      },
      filterVersion(query, value) {
        if (value) {
          query.where('formVersionId', value);
        }
      },
      filterConfirmationId(query, value) {
        if (value) {
          query.where('confirmationId', value);
        }
      },
      filterBusinessName(query, value) {
        if (value) {
          query.where('business.name', 'ilike', `%${value}%`);
        }
      },
      filterCity(query, value) {
        if (value) {
          query.where('location.city', 'ilike', `%${value}%`);
        }
      }
    };
  }

  static relationMappings () {
    return {
      attestation: {
        relation: Model.HasOneRelation,
        modelClass: Attestation,
        join: {
          from: `${SUBMISSION}.submissionId`,
          to: `${SUBMISSION}_attestation.submissionId`
        }
      },
      business: {
        relation: Model.HasOneRelation,
        modelClass: Business,
        join: {
          from: `${SUBMISSION}.submissionId`,
          to: `${SUBMISSION}_business.submissionId`
        }
      },
      covidContact: {
        relation: Model.HasOneRelation,
        modelClass: Contact,
        join: {
          from: `${SUBMISSION}.submissionId`,
          to: `${SUBMISSION}_contact.submissionId`
        },
        modify: {contactType: 'COVID_COORDINATOR'}
      },
      location: {
        relation: Model.HasOneRelation,
        modelClass: Location,
        join: {
          from: `${SUBMISSION}.submissionId`,
          to: `${SUBMISSION}_location.submissionId`
        }
      },
      primaryContact: {
        relation: Model.HasOneRelation,
        modelClass: Contact,
        join: {
          from: `${SUBMISSION}.submissionId`,
          to: `${SUBMISSION}_contact.submissionId`
        },
        modify: {contactType: 'PRIMARY'}
      },
      notes: {
        relation: Model.HasManyRelation,
        modelClass: Models.Note,
        join: {
          from: `${SUBMISSION}.submissionId`,
          to: `${PREFIX}_note.submissionId`
        }
      },
      statuses: {
        relation: Model.HasManyRelation,
        modelClass: SubmissionStatus,
        join: {
          from: `${SUBMISSION}.submissionId`,
          to: `${SUBMISSION}_status.submissionId`
        }
      }
    };
  }
}

class SubmissionStatus extends UpdatedAt(Model) {
  static get tableName () {
    return `${SUBMISSION}_status`;
  }

  static get idColumn () {
    return 'submissionStatusId';
  }

  static get modifiers () {
    return {
      orderDescending(builder) {
        builder.orderBy('submissionStatusId', 'desc');
      }
    };
  }

  static relationMappings () {
    return {
      notes: {
        relation: Model.HasManyRelation,
        modelClass: Models.Note,
        join: {
          from: `${SUBMISSION}_status.submissionStatusId`,
          to: `${PREFIX}_note.submissionStatusId`
        }
      }
    };
  }
}

class Attestation extends UpdatedAt(Model) {
  static get tableName () {
    return `${SUBMISSION}_attestation`;
  }

  static get idColumn () {
    return 'attestationId';
  }
}

class Business extends UpdatedAt(Model) {
  static get tableName () {
    return `${SUBMISSION}_business`;
  }

  static get idColumn () {
    return 'businessId';
  }
}

class Contact extends UpdatedAt(Model) {
  static get tableName () {
    return `${SUBMISSION}_contact`;
  }

  static get idColumn () {
    return 'contactId';
  }
}

class Location extends UpdatedAt(Model) {
  static get tableName () {
    return `${SUBMISSION}_location`;
  }

  static get idColumn () {
    return 'locationId';
  }
}

module.exports = {
  Attestation: Attestation,
  Business: Business,
  Contact: Contact,
  Location: Location,
  Submission: Submission,
  Status: SubmissionStatus
};
