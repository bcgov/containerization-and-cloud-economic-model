const {Model} = require('objection');
const CommonModels = require('../../common/models');
const constants = require('../constants');

const SubmissionSchema = {
  required: ['submissionId', 'formVersionId', 'confirmationId'],
  properties: {
    submissionId: {type: 'string', pattern: constants.UUID_REGEX},
    confirmationId: {type: 'string', pattern: constants.CONFIRMATION_ID_REGEX},
    formVersionId: {type: 'integer'},
    deleted: {type: 'boolean'}
  }
};

class Submission extends CommonModels.Submission {

  static get Attestation () {
    return undefined;
  }

  static get Business () {
    return undefined;
  }

  static get Contact () {
    return undefined;
  }

  static get Location () {
    return undefined;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: SubmissionSchema.required,
      properties: {
        ...SubmissionSchema.properties,
        ...CommonModels.stamps
      },
      additionalProperties: false
    };
  }

  static get modifiers() {
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

  static get relationMappings() {
    return {
      attestation: {
        relation: Model.HasOneRelation,
        modelClass: this.Attestation,
        join: {
          from: `${this.tablePrefix}_submission.submissionId`,
          to: `${this.tablePrefix}_submission_attestation.submissionId`
        }
      },
      business: {
        relation: Model.HasOneRelation,
        modelClass: this.Business,
        join: {
          from: `${this.tablePrefix}_submission.submissionId`,
          to: `${this.tablePrefix}_submission_business.submissionId`
        }
      },
      contacts: {
        relation: Model.HasManyRelation,
        modelClass: this.Contact,
        join: {
          from: `${this.tablePrefix}_submission.submissionId`,
          to: `${this.tablePrefix}_submission_contact.submissionId`
        }
      },
      location: {
        relation: Model.HasOneRelation,
        modelClass: this.Location,
        join: {
          from: `${this.tablePrefix}_submission.submissionId`,
          to: `${this.tablePrefix}_submission_location.submissionId`
        }
      },
      notes: {
        relation: Model.HasManyRelation,
        modelClass: this.Note,
        join: {
          from: `${this.tablePrefix}_submission.submissionId`,
          to: `${this.tablePrefix}_note.submissionId`
        }
      },
      statuses: {
        relation: Model.HasManyRelation,
        modelClass: this.Status,
        join: {
          from: `${this.tablePrefix}_submission.submissionId`,
          to: `${this.tablePrefix}_submission_status.submissionId`
        }
      }
    };
  }
}

class SubmissionOperation extends Submission {

  static get OperationType () {
    return undefined;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [...SubmissionSchema.required, 'type'],
      properties: {
        ...SubmissionSchema.properties,
        type: {type: 'string'},
        ...CommonModels.stamps
      },
      additionalProperties: false
    };
  }

  static get modifiers() {
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
      },
      filterType(query, value) {
        if (value) {
          query.where('type', value);
        }
      }
    };
  }

  static get relationMappings() {
    return {
      attestation: {
        relation: Model.HasOneRelation,
        modelClass: this.Attestation,
        join: {
          from: `${this.tablePrefix}_submission.submissionId`,
          to: `${this.tablePrefix}_submission_attestation.submissionId`
        }
      },
      business: {
        relation: Model.HasOneRelation,
        modelClass: this.Business,
        join: {
          from: `${this.tablePrefix}_submission.submissionId`,
          to: `${this.tablePrefix}_submission_business.submissionId`
        }
      },
      contacts: {
        relation: Model.HasManyRelation,
        modelClass: this.Contact,
        join: {
          from: `${this.tablePrefix}_submission.submissionId`,
          to: `${this.tablePrefix}_submission_contact.submissionId`
        }
      },
      location: {
        relation: Model.HasOneRelation,
        modelClass: this.Location,
        join: {
          from: `${this.tablePrefix}_submission.submissionId`,
          to: `${this.tablePrefix}_submission_location.submissionId`
        }
      },
      notes: {
        relation: Model.HasManyRelation,
        modelClass: this.Note,
        join: {
          from: `${this.tablePrefix}_submission.submissionId`,
          to: `${this.tablePrefix}_note.submissionId`
        }
      },
      statuses: {
        relation: Model.HasManyRelation,
        modelClass: this.Status,
        join: {
          from: `${this.tablePrefix}_submission.submissionId`,
          to: `${this.tablePrefix}_submission_status.submissionId`
        }
      },
      operationType: {
        relation: Model.HasOneRelation,
        modelClass: this.OperationType,
        join: {
          from: `${this.tablePrefix}_submission.type`,
          to: `${this.tablePrefix}_operation_type.type`
        }
      }
    };
  }
}

class OperationType extends CommonModels.Timestamps(Model) {

  static get Submission () {
    return undefined;
  }

  static get tableName() {
    return `${this.tablePrefix}_operation_type`;
  }

  static get idColumn() {
    return 'type';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['type', 'display', 'enabled'],
      properties: {
        type: {type: 'string', minLength: 1, maxLength: 255},
        display: {type: 'string', minLength: 1, maxLength: 255},
        enabled: {type: 'boolean'},
        ...CommonModels.stamps
      },
      additionalProperties: false
    };
  }

  static get relationMappings() {
    return {
      submissions: {
        relation: Model.HasManyRelation,
        modelClass: this.Submission,
        join: {
          from: `${this.tablePrefix}_operation_type.type`,
          to: `${this.tablePrefix}_submission.type`
        }
      }
    };
  }

  static get modifiers() {
    return {
      orderAscending(builder) {
        builder.orderByRaw('CASE WHEN "type" = \'OTHER\' THEN 99 ELSE 1 END asc');
      },
      filterEnabled(query, value) {
        if (value !== undefined) {
          query.where('enabled', value);
        }
      }
    };
  }
}

const AttestationSchema = {
  properties: {
    attestationId: {type: 'string', pattern: constants.UUID_REGEX},
    submissionId: {type: 'string', pattern: constants.UUID_REGEX},
    sleepingAreaType: {type: 'string', enum: constants.SLEEPING_AREA_TYPES},
    sharedSleepingPerRoom: {type: 'integer', minimum: 0, maximum: 100000},
    guidelinesRead: {type: 'boolean'},
    assessmentCompleted: {type: 'boolean'},
    developedPlan: {type: 'boolean'},
    protectionSignage: {type: 'boolean'},
    workerContactPersonnel: {type: 'boolean'},
    commonAreaDistancing: {type: 'boolean'},
    sharedSleepingDistancing: {type: 'boolean'},
    selfIsolateUnderstood: {type: 'boolean'},
    selfIsolateAccommodation: {type: 'boolean'},
    laundryServices: {type: 'boolean'},
    wasteManagementGloves: {type: 'boolean'},
    wasteManagementSchedule: {type: 'boolean'},
    wasteManagementBags: {type: 'boolean'},
    handWashingStations: {type: 'boolean'},
    handWashingSoapWater: {type: 'boolean'},
    handWashingWaterless: {type: 'boolean'},
    handWashingPaperTowels: {type: 'boolean'},
    handWashingSignage: {type: 'boolean'},
    distancingMaintained: {type: 'boolean'},
    distancingFaceShields: {type: 'boolean'},
    disinfectingSchedule: {type: 'boolean'},
    educationSignage: {type: 'boolean'},
    educationContactPersonnel: {type: 'boolean'},
    trainingCovid19: {type: 'boolean'},
    trainingEtiquette: {type: 'boolean'},
    trainingLocations: {type: 'boolean'},
    trainingFirstAid: {type: 'boolean'},
    trainingReporting: {type: 'boolean'},
    mealsDistancing: {type: 'boolean'},
    mealsDishware: {type: 'boolean'},
    mealsDishwashing: {type: 'boolean'},
    infectionSeparation: {type: 'boolean'},
    infectionSymptoms: {type: 'boolean'},
    infectionHeathLinkBC: {type: 'boolean'},
    infectionSanitization: {type: 'boolean'},
    infectionAccommodation: {type: 'boolean'},
    infectedFeeding: {type: 'boolean'},
    infectedHousekeeping: {type: 'boolean'},
    infectedWaste: {type: 'boolean'},
    certifyAccurateInformation: {type: 'boolean'},
    agreeToInspection: {type: 'boolean'}
  }
};

class Attestation extends CommonModels.Timestamps(Model) {
  static get tableName() {
    return `${this.tablePrefix}_submission_attestation`;
  }

  static get idColumn() {
    return 'attestationId';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: Object.keys(AttestationSchema.properties).map(x => x),
      properties: {
        ...AttestationSchema.properties,
        ...CommonModels.stamps
      },
      additionalProperties: false
    };
  }
}

const AttestationTransportationSchema = {
  properties: {
    ...AttestationSchema.properties,
    transportationSingleOccupant: {type: 'boolean'},
    transportationBusesVans: {type: 'boolean'},
    transportationTrucksCars: {type: 'boolean'},
    transportationHelicopter: {type: 'boolean'},
    transportationTravelPod: {type: 'boolean'},
    transportationCleaningDistancing: {type: 'boolean'}
  }
};

class AttestationTransportation extends Attestation {
  static get jsonSchema() {
    return {
      type: 'object',
      required: Object.keys(AttestationTransportationSchema.properties).map(x => x),
      properties: {
        ...AttestationTransportationSchema.properties,
        ...CommonModels.stamps
      },
      additionalProperties: false
    };
  }
}

class Business extends CommonModels.Timestamps(Model) {
  static get tableName() {
    return `${this.tablePrefix}_submission_business`;
  }

  static get idColumn() {
    return 'businessId';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['submissionId', 'name', 'addressLine1', 'city', 'province', 'postalCode'],
      properties: {
        businessId: {type: 'integer'},
        submissionId: {type: 'string', pattern: constants.UUID_REGEX},
        name: {type: 'string', minLength: 1, maxLength: 255},
        orgBookId: {type: ['string', 'null']},
        addressLine1: {type: 'string', minLength: 1, maxLength: 255},
        addressLine2: {type: ['string', 'null']},
        city: {type: 'string', minLength: 1, maxLength: 255},
        province: {type: 'string', minLength: 1, maxLength: 30},
        postalCode: {type: 'string', minLength: 1, maxLength: 30},
        ...CommonModels.stamps
      },
      additionalProperties: false
    };
  }
}

class Contact extends CommonModels.Timestamps(Model) {
  static get tableName() {
    return `${this.tablePrefix}_submission_contact`;
  }

  static get idColumn() {
    return 'contactId';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['submissionId', 'contactType', 'firstName', 'lastName'],
      properties: {
        contactId: {type: 'integer'},
        submissionId: {type: 'string', pattern: constants.UUID_REGEX},
        contactType: {type: 'string', enum: constants.CONTACT_TYPES},
        firstName: {type: 'string', minLength: 1, maxLength: 255},
        lastName: {type: 'string', minLength: 1, maxLength: 255},
        phone1: {type: ['string', 'null'], maxLength: 30},
        phone2: {type: ['string', 'null'], maxLength: 30},
        email: {type: ['string', 'null'], format: 'email'},
        ...CommonModels.stamps
      },
      additionalProperties: false
    };
  }

  static get modifiers() {
    return {
      orderContactType(builder) {
        builder.orderByRaw('CASE WHEN "contactType" = \'PRIMARY\' THEN 1 WHEN "contactType" = \'COVID_COORDINATOR\' THEN 2 END asc');
      }
    };
  }
}

const LocationSchema = {
  required: ['submissionId', 'city', 'numberOfWorkers', 'accTents', 'accMotel', 'accWorkersHome', 'startDate', 'endDate'],
  properties: {
    locationId: {type: 'integer'},
    submissionId: {type: 'string', pattern: constants.UUID_REGEX},
    startDate: {type: 'string', format: 'date'},
    endDate: {type: 'string', format: 'date'},
    city: {type: 'string', minLength: 1, maxLength: 255},
    cityLatitude: {type: ['number', 'null'], minimum: -90, maximum: 90},
    cityLongitude: {type: ['number', 'null'], minimum: -180, maximum: 180},
    numberOfWorkers: {type: 'integer', minimum: 1, maximum: 100000},
    accTents: {type: 'boolean'},
    tentDetails: {type: ['string', 'null'], maxLength: 255},
    accMotel: {type: 'boolean'},
    motelName: {type: ['string', 'null'], maxLength: 255},
    motelAddressLine1: {type: ['string', 'null'], maxLength: 255},
    motelAddressLine2: {type: ['string', 'null'], maxLength: 255},
    motelCity: {type: ['string', 'null'], maxLength: 255},
    motelProvince: {type: ['string', 'null'], maxLength: 30},
    motelPostalCode: {type: ['string', 'null'], maxLength: 30},
    accWorkersHome: {type: 'boolean'}
  }
};

class Location extends CommonModels.Timestamps(Model) {
  static get tableName() {
    return `${this.tablePrefix}_submission_location`;
  }

  static get idColumn() {
    return 'locationId';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: LocationSchema.required,
      properties: {
        ...LocationSchema.properties,
        ...CommonModels.stamps
      },
      additionalProperties: false
    };
  }
}

class LocationLicencees extends Location {

  static get jsonSchema() {
    return {
      type: 'object',
      required: LocationSchema.required,
      properties: {
        ...LocationSchema.properties,
        licencees: { type: ['string', 'null'], maxLength: 1000 },
        ...CommonModels.stamps
      },
      additionalProperties: false
    };
  }
}

class LocationMines extends Location {

  static get jsonSchema() {
    return {
      type: 'object',
      required: LocationSchema.required,
      properties: {
        ...LocationSchema.properties,
        mineNumber: { type: ['string', 'null'], maxLength: 255, pattern: constants.MINE_NUMBER_REGEX },
        permitNumber: { type: ['string', 'null'], maxLength: 255 },
        ...CommonModels.stamps
      },
      additionalProperties: false
    };
  }
}

class SubmissionSearchView extends CommonModels.SubmissionSearchView {

  static get modifiers() {
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
          query.where('name', 'ilike', `%${value}%`);
        }
      },
      filterCity(query, value) {
        if (value) {
          query.where('city', 'ilike', `%${value}%`);
        }
      },
      filterDeleted(query, value) {
        if (value !== undefined) {
          query.where('deleted', value);
        }
      }
    };
  }
}

module.exports = {
  Attestation: Attestation,
  AttestationSchema: AttestationSchema,
  AttestationTransportation: AttestationTransportation,
  AttestationTransportationSchema: AttestationTransportationSchema,
  Business: Business,
  Contact: Contact,
  Location: Location,
  LocationLicencees: LocationLicencees,
  LocationMines: LocationMines,
  Submission: Submission,
  SubmissionOperation: SubmissionOperation,
  OperationType: OperationType,
  SubmissionSearchView: SubmissionSearchView
};
