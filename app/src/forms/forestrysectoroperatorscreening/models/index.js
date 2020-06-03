const base = require('./base');
const subs = require('./submission');
const searchParms = require('./searchParameters');

class CommonModels {
  constructor() {
  }

  get Metadata() {
    return base.Metadata;
  }

  get Form() {
    return base.Form;
  }

  get Version() {
    return base.Version;
  }

  get StatusCode() {
    return base.StatusCode;
  }

  get Note() {
    return base.Note;
  }

  get Settings() {
    return base.Settings;
  }

  get Submission() {
    return subs.Submission;
  }

  get Status() {
    return base.Status;
  }
}

module.exports = {...base, ...subs, ...searchParms, commonModels: new CommonModels()};
