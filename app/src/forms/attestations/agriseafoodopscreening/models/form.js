const CommonModels = require('../../../common/models');
const AttestationModels = require('../../models');

const constants = require('../constants');
const PREFIX = constants.PREFIX;

class Form extends CommonModels.Form {

  static get tablePrefix() {
    return PREFIX;
  }

  static get Metadata() {
    return CommonModels.Metadata;
  }

  static get Version() {
    return Version;
  }
}

class Version extends CommonModels.Version {

  static get tablePrefix() {
    return PREFIX;
  }

  static get StatusCode() {
    return StatusCode;
  }
}

class StatusCode extends CommonModels.StatusCode {

  static get tablePrefix() {
    return PREFIX;
  }

  static get Version() {
    return Version;
  }
}

class Note extends CommonModels.Note {

  static get tablePrefix() {
    return PREFIX;
  }
}

class Settings extends CommonModels.Settings {

  static get tablePrefix() {
    return PREFIX;
  }
}

class Status extends CommonModels.Status {
  static get tablePrefix() {
    return PREFIX;
  }

  static get Note() {
    return Note;
  }

  static get StatusCode() {
    return StatusCode;
  }
}


class Submission extends AttestationModels.SubmissionOperation {
  static get tablePrefix() {
    return PREFIX;
  }

  static get Attestation () {
    return Attestation;
  }

  static get Business () {
    return Business;
  }

  static get Contact () {
    return Contact;
  }

  static get Location () {
    return Location;
  }

  static get OperationType () {
    return OperationType;
  }

  static get Note () {
    return Note;
  }

  static get Status () {
    return Status;
  }

}

class OperationType extends AttestationModels.OperationType {
  static get tablePrefix() {
    return PREFIX;
  }

  static get Submission () {
    return Submission;
  }

}

class Attestation extends AttestationModels.AttestationTransportation {
  static get tablePrefix() {
    return PREFIX;
  }

  static get jsonSchema() {
    const schemaProperties = {...AttestationModels.AttestationTransportationSchema.properties};
    // need to remove some properties
    delete schemaProperties.sharedSleepingPerRoom;
    delete schemaProperties.sleepingAreaType;
    delete schemaProperties.commonAreaDistancing;
    // and add the new ones.
    schemaProperties.sharedSleepingCommunication = {type: 'boolean'};
    schemaProperties.sharedSleepingProvidedAccommodations = {type: 'boolean'};
    return {
      type: 'object',
      required: Object.keys(schemaProperties).map(x => x),
      properties: {
        ...schemaProperties,
        ...CommonModels.stamps
      },
      additionalProperties: false
    };
  }
}

class Business extends AttestationModels.Business {
  static get tablePrefix() {
    return PREFIX;
  }

}

class Contact extends AttestationModels.Contact {
  static get tablePrefix() {
    return PREFIX;
  }

}

class Location extends AttestationModels.Location {
  static get tablePrefix() {
    return PREFIX;
  }

}

class SubmissionSearchView extends AttestationModels.SubmissionSearchView {
  static get tablePrefix() {
    return PREFIX;
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
      },
      filterType(query, value) {
        if (value) {
          query.where('operationType', value);
        }
      }
    };
  }
}

module.exports.Metadata = CommonModels.Metadata;
module.exports.Form = Form;
module.exports.Version = Version;
module.exports.StatusCode = StatusCode;
module.exports.Note = Note;
module.exports.Settings = Settings;
module.exports.Status = Status;
module.exports.Submission = Submission;
module.exports.OperationType = OperationType;
module.exports.Attestation = Attestation;
module.exports.Business = Business;
module.exports.Contact = Contact;
module.exports.Location = Location;
module.exports.SubmissionSearch = AttestationModels.OperationTypesSubmissionSearch;
module.exports.SubmissionSearchView = SubmissionSearchView;
