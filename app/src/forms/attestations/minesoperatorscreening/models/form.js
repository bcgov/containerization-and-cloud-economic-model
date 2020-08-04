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


class Submission extends AttestationModels.Submission {
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

  static get Note () {
    return Note;
  }

  static get Status () {
    return Status;
  }

}

class Attestation extends AttestationModels.AttestationTransportation {
  static get tablePrefix() {
    return PREFIX;
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

class Location extends AttestationModels.LocationMines {
  static get tablePrefix() {
    return PREFIX;
  }

}

class SubmissionSearchView extends AttestationModels.SubmissionSearchView {
  static get tablePrefix() {
    return PREFIX;
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
module.exports.Attestation = Attestation;
module.exports.Business = Business;
module.exports.Contact = Contact;
module.exports.Location = Location;
module.exports.SubmissionSearch = AttestationModels.SubmissionSearch;
module.exports.SubmissionSearchView = SubmissionSearchView;
