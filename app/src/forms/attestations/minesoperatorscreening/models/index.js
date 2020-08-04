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

  get Attestation() {
    return form.Attestation;
  }

  get Business() {
    return form.Business;
  }

  get Contact() {
    return form.Contact;
  }

  get Location() {
    return form.Location;
  }

  get Status() {
    return form.Status;
  }

  get SubmissionSearch() {
    return form.SubmissionSearch;
  }

  get SubmissionSearchView() {
    return form.SubmissionSearchView;
  }
}

module.exports = {...form, models: new Models()};
