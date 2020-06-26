const form = require('./form');

class Models {
  constructor() {
  }

  get Metadata() {
    return form.Metadata;
  }

  get Form() {
    return form.Form;
  }

  get Version() {
    return form.Version;
  }

  get StatusCode() {
    return form.StatusCode;
  }

  get Note() {
    return form.Note;
  }

  get Settings() {
    return form.Settings;
  }

  get Submission() {
    return form.Submission;
  }

  get Status() {
    return form.Status;
  }

  get Survey() {
    return form.Survey;
  }

}

module.exports = {...form, models: new Models()};
