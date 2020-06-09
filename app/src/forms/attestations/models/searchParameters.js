class SubmissionSearch {
  constructor() {
    this.version = undefined;
    this.confirmationId = undefined;
    this.business = undefined;
    this.city = undefined;
    this.deleted = false;
    this.tiny = true;
  }

  get ints() {
    return ['version'];
  }

  get strings() {
    return ['confirmationId', 'business', 'city'];
  }

  get booleans() {
    return ['deleted', 'full'];
  }
}

class OperationTypesSubmissionSearch extends SubmissionSearch {
  constructor() {
    super();
    this.type = undefined;
  }

  get strings() {
    return ['confirmationId', 'business', 'city', 'type'];
  }
}

module.exports.SubmissionSearch = SubmissionSearch;
module.exports.OperationTypesSubmissionSearch = OperationTypesSubmissionSearch;
