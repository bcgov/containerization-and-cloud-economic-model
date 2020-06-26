const {Model} = require('objection');
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


class Submission extends CommonModels.Submission {
  static get tablePrefix() {
    return PREFIX;
  }

  static get Survey () {
    return Survey;
  }

  static get Note () {
    return Note;
  }

  static get Status () {
    return Status;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['submissionId', 'formVersionId'],
      properties: {
        submissionId: {type: 'string', pattern: constants.UUID_REGEX},
        formVersionId: {type: 'integer'},
        deleted: {type: 'boolean'},
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
      filterDeleted(query, value) {
        if (value !== undefined) {
          query.where('deleted', value);
        }
      }
    };
  }

  static get relationMappings() {
    return {
      survey: {
        relation: Model.HasOneRelation,
        modelClass: this.Survey,
        join: {
          from: `${this.tablePrefix}_submission.submissionId`,
          to: `${this.tablePrefix}_submission_survey.submissionId`
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

class Survey extends CommonModels.Timestamps(Model) {
  static get tablePrefix() {
    return PREFIX;
  }

  static get tableName() {
    return `${this.tablePrefix}_submission_survey`;
  }

  static get idColumn() {
    return 'surveyId';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['submissionId', 'submitter', 'answer1', 'answer2'],
      properties: {
        surveyId: {type: 'integer'},
        submissionId: {type: 'string', pattern: constants.UUID_REGEX},
        submitter: {type: 'string', minLength: 1, maxLength: 255},
        answer1: {type: 'string', minLength: 1, maxLength: 255},
        answer2: {type: 'string', minLength: 1, maxLength: 255},
        answer3: {type: ['string', 'null'], maxLength: 255},
        ...CommonModels.stamps
      },
      additionalProperties: false
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
module.exports.Survey = Survey;
