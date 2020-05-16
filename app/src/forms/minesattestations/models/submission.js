const { Model } = require('objection');
const { UpdatedAt } = require('../../../db/models/mixins');

const Models = require('./base');
const constants = require('../constants');
const PREFIX = constants.PREFIX;
const SUBMISSION = `${PREFIX}_submission`;

class Submission extends UpdatedAt(Model) {
  static get tableName () {
    return `${SUBMISSION}`;
  }

  static get idColumn () {
    return 'submissionId';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['submissionId', 'formVersionId', 'confirmationId'],
      properties: {
        submissionId: { type: 'string', pattern: constants.UUID_REGEX },
        confirmationId: { type: 'string', pattern: constants.CONFIRMATION_ID_REGEX },
        formVersionId: { type: 'integer'},
        createdBy: { type: ['string', 'null'] },
        createdAt: { type: ['string', 'null'], format: 'date-time' },
        updatedBy: { type: ['string', 'null'] },
        updatedAt: { type: ['string', 'null'], format: 'date-time' }
      },
      additionalProperties: false
    };
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

  static get relationMappings () {
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

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['submissionId', 'code'],
      properties: {
        submissionStatusId: { type: 'integer' },
        submissionId: { type: 'string', pattern: constants.UUID_REGEX },
        code: { type: 'string', minLength: 1, maxLength: 255 },
        assignedTo: { type: ['string', 'null'], maxLength: 255 },
        createdBy: { type: ['string', 'null'] },
        createdAt: { type: ['string', 'null'], format: 'date-time' },
        updatedBy: { type: ['string', 'null'] },
        updatedAt: { type: ['string', 'null'], format: 'date-time' }
      },
      additionalProperties: false
    };
  }

  static get relationMappings () {
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

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['attestationId', 'submissionId', 'sleepingAreaType', 'sharedSleepingPerRoom'],
      properties: {
        attestationId: { type: 'string', pattern: constants.UUID_REGEX },
        submissionId: { type: 'string', pattern: constants.UUID_REGEX },
        sleepingAreaType: { type: 'string', enum: ['SINGLE', 'SHARED'] },
        sharedSleepingPerRoom: { type: 'integer', minimum: 0, maximum: 100000 },
        guidelinesRead: { type: 'boolean' },
        assessmentCompleted: { type: 'boolean' },
        developedPlan: { type: 'boolean' },
        protectionSignage: { type: 'boolean' },
        workerContactPersonnel: { type: 'boolean' },
        commonAreaDistancing: { type: 'boolean' },
        sharedSleepingDistancing: { type: 'boolean' },
        selfIsolateUnderstood: { type: 'boolean' },
        selfIsolateAccommodation: { type: 'boolean' },
        laundryServices: { type: 'boolean' },
        wasteManagementGloves: { type: 'boolean' },
        wasteManagementSchedule: { type: 'boolean' },
        wasteManagementBags: { type: 'boolean' },
        handWashingStations: { type: 'boolean' },
        handWashingSoapWater: { type: 'boolean' },
        handWashingWaterless: { type: 'boolean' },
        handWashingPaperTowels: { type: 'boolean' },
        handWashingSignage: { type: 'boolean' },
        distancingMaintained: { type: 'boolean' },
        distancingFaceShields: { type: 'boolean' },
        disinfectingSchedule: { type: 'boolean' },
        educationSignage: { type: 'boolean' },
        educationContactPersonnel: { type: 'boolean' },
        trainingCovid19: { type: 'boolean' },
        trainingEtiquette: { type: 'boolean' },
        trainingLocations: { type: 'boolean' },
        trainingFirstAid: { type: 'boolean' },
        trainingReporting: { type: 'boolean' },
        mealsDistancing: { type: 'boolean' },
        mealsDishware: { type: 'boolean' },
        mealsDishwashing: { type: 'boolean' },
        infectionSeparation: { type: 'boolean' },
        infectionSymptoms: { type: 'boolean' },
        infectionHeathLinkBC: { type: 'boolean' },
        infectionSanitization: { type: 'boolean' },
        infectionAccommodation: { type: 'boolean' },
        infectedFeeding: { type: 'boolean' },
        infectedHousekeeping: { type: 'boolean' },
        infectedWaste: { type: 'boolean' },
        certifyAccurateInformation: { type: 'boolean' },
        agreeToInspection: { type: 'boolean' },
        createdBy: { type: ['string', 'null'] },
        createdAt: { type: ['string', 'null'], format: 'date-time' },
        updatedBy: { type: ['string', 'null'] },
        updatedAt: { type: ['string', 'null'], format: 'date-time' }
      },
      additionalProperties: false
    };
  }
}

class Business extends UpdatedAt(Model) {
  static get tableName () {
    return `${SUBMISSION}_business`;
  }

  static get idColumn () {
    return 'businessId';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['submissionId', 'name', 'addressLine1', 'city', 'province', 'postalCode'],
      properties: {
        businessId: { type: 'integer'},
        submissionId: { type: 'string', pattern: constants.UUID_REGEX },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        orgBookId: { type: ['string', 'null'] },
        addressLine1: { type: 'string', minLength: 1, maxLength: 255 },
        addressLine2: { type: ['string', 'null'] },
        city: { type: 'string', minLength: 1, maxLength: 255 },
        province: { type: 'string', minLength: 1, maxLength: 30 },
        postalCode: { type: 'string', minLength: 1, maxLength: 30 },
        createdBy: { type: ['string', 'null'] },
        createdAt: { type: ['string', 'null'], format: 'date-time' },
        updatedBy: { type: ['string', 'null'] },
        updatedAt: { type: ['string', 'null'], format: 'date-time' }
      },
      additionalProperties: false
    };
  }
}

class Contact extends UpdatedAt(Model) {
  static get tableName () {
    return `${SUBMISSION}_contact`;
  }

  static get idColumn () {
    return 'contactId';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['submissionId', 'contactType', 'firstName', 'lastName'],
      properties: {
        contactId: { type: 'integer'},
        submissionId: { type: 'string', pattern: constants.UUID_REGEX },
        contactType: { type: 'string', enum: ['PRIMARY', 'COVID_COORDINATOR'] },
        firstName: { type: 'string', minLength: 1, maxLength: 255 },
        lastName: { type: 'string', minLength: 1, maxLength: 255 },
        phone1: { type: ['string', 'null'], maxLength: 30 },
        phone2: { type: ['string', 'null'], maxLength: 30 },
        email: { type: ['string', 'null'], format: 'email' },
        createdBy: { type: ['string', 'null'] },
        createdAt: { type: ['string', 'null'], format: 'date-time' },
        updatedBy: { type: ['string', 'null'] },
        updatedAt: { type: ['string', 'null'], format: 'date-time' }
      },
      additionalProperties: false
    };
  }
}

class Location extends UpdatedAt(Model) {
  static get tableName () {
    return `${SUBMISSION}_location`;
  }

  static get idColumn () {
    return 'locationId';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['submissionId', 'city', 'numberOfWorkers', 'accTents', 'accMotel', 'accWorkersHome', 'startDate', 'endDate'],
      properties: {
        locationId: { type: 'integer'},
        submissionId: { type: 'string', pattern: constants.UUID_REGEX },
        startDate: { type: 'string', format: 'date' },
        endDate: { type: 'string', format: 'date' },
        city: { type: 'string', minLength: 1, maxLength: 255 },
        cityLatitude: { type: ['number', 'null'], minimum: -90, maximum: 90 },
        cityLongitude: { type: ['number', 'null'], minimum: -180, maximum: 180 },
        mineNumber: { type: ['string', 'null'], maxLength: 255 },
        permitNumber: { type: ['string', 'null'], maxLength: 255 },
        numberOfWorkers: { type: 'integer', minimum: 1, maximum: 100000 },
        accTents: { type: 'boolean' },
        tentDetails: { type: ['string', 'null'], maxLength: 255 },
        accMotel: { type: 'boolean' },
        motelName: { type: ['string', 'null'], maxLength: 255 },
        motelAddressLine1: { type: ['string', 'null'], maxLength: 255 },
        motelAddressLine2: { type: ['string', 'null'], maxLength: 255 },
        motelCity: { type: ['string', 'null'], maxLength: 255 },
        motelProvince: { type: ['string', 'null'], maxLength: 30 },
        motelPostalCode: { type: ['string', 'null'], maxLength: 30 },
        accWorkersHome: { type: 'boolean' },
        createdBy: { type: ['string', 'null'] },
        createdAt: { type: ['string', 'null'], format: 'date-time' },
        updatedBy: { type: ['string', 'null'] },
        updatedAt: { type: ['string', 'null'], format: 'date-time' }
      },
      additionalProperties: false
    };
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
