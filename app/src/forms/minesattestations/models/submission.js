const { Model } = require('objection');
const { UpdatedAt } = require('../../../db/models/mixins');

const PREFIX = require('../constants').PREFIX;
const SUBMISSION = `${PREFIX}_submission`;

class Submission extends UpdatedAt(Model) {
  static get tableName () {
    return `${SUBMISSION}`;
  }

  static get idColumn () {
    return 'submissionId';
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
      contacts: {
        relation: Model.HasManyRelation,
        modelClass: Contact,
        join: {
          from: `${SUBMISSION}.submissionId`,
          to: `${SUBMISSION}_contact.submissionId`
        }
      },
      location: {
        relation: Model.HasOneRelation,
        modelClass: Location,
        join: {
          from: `${SUBMISSION}.submissionId`,
          to: `${SUBMISSION}_location.submissionId`
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
