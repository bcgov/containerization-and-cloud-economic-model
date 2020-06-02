const { Model } = require('objection');
const CommonModels = require('../../common/models');
const FormModels = require('./base');

const constants = require('../constants');
const PREFIX = constants.PREFIX;
const SUBMISSION = `${PREFIX}_submission`;

class Submission extends CommonModels.Submission {
  static get tablePrefix () {
    return PREFIX;
  }

  static get Note () {
    return FormModels.Note;
  }

  static get Status () {
    return FormModels.Status;
  }

  static get modifiers () {
    return {
      orderDescending(builder) {
        builder.orderBy('createdAt', 'desc');
      },
      filterVersion(query, value) {
        if (value) {
          query.where('formVersionId', value);
        }
      },
      filterConfirmationId(query, value) {
        if (value) {
          query.where('confirmationId', 'ilike', `%${value}%`);
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
      },
      filterDeleted(query, value) {
        if (value !== undefined) {
          query.where('deleted', value);
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
        modelClass: this.Note,
        join: {
          from: `${SUBMISSION}.submissionId`,
          to: `${PREFIX}_note.submissionId`
        }
      },
      statuses: {
        relation: Model.HasManyRelation,
        modelClass: this.Status,
        join: {
          from: `${SUBMISSION}.submissionId`,
          to: `${SUBMISSION}_status.submissionId`
        }
      }
    };
  }
}

class Attestation extends CommonModels.Timestamps(Model) {
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
        sleepingAreaType: { type: 'string', enum: constants.SLEEPING_AREA_TYPES },
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
        transportationSingleOccupant: { type: 'boolean' },
        transportationBusesVans: { type: 'boolean' },
        transportationTrucksCars: { type: 'boolean' },
        transportationHelicopter: { type: 'boolean' },
        transportationTravelPod: { type: 'boolean' },
        transportationCleaningDistancing: { type: 'boolean' },
        ...CommonModels.stamps
      },
      additionalProperties: false
    };
  }
}

class Business extends CommonModels.Timestamps(Model) {
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
        ...CommonModels.stamps
      },
      additionalProperties: false
    };
  }
}

class Contact extends CommonModels.Timestamps(Model) {
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
        contactType: { type: 'string', enum: constants.CONTACT_TYPES },
        firstName: { type: 'string', minLength: 1, maxLength: 255 },
        lastName: { type: 'string', minLength: 1, maxLength: 255 },
        phone1: { type: ['string', 'null'], maxLength: 30 },
        phone2: { type: ['string', 'null'], maxLength: 30 },
        email: { type: ['string', 'null'], format: 'email' },
        ...CommonModels.stamps
      },
      additionalProperties: false
    };
  }

  static get modifiers () {
    return {
      orderContactType(builder) {
        builder.orderByRaw('CASE WHEN "contactType" = \'PRIMARY\' THEN 1 WHEN "contactType" = \'COVID_COORDINATOR\' THEN 2 END asc');
      }
    };
  }
}

class Location extends CommonModels.Timestamps(Model) {
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
        mineNumber: { type: ['string', 'null'], maxLength: 255, pattern: constants.MINE_NUMBER_REGEX },
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
        ...CommonModels.stamps
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
  Submission: Submission
};
