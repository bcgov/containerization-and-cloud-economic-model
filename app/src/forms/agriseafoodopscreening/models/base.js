const CommonModels = require('../../common/models');

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

module.exports.Metadata = CommonModels.Metadata;
module.exports.Form = Form;
module.exports.Version = Version;
module.exports.StatusCode = StatusCode;
module.exports.Note = Note;
module.exports.Settings = Settings;
module.exports.Status = Status;
