const { Model } = require('objection');
const { UpdatedAt } = require('../../../db/models/mixins');

const PREFIX = require('../constants').PREFIX;

class Metadata extends UpdatedAt(Model) {
  static get tableName () {
    return 'form';
  }

  static get idColumn () {
    return 'formId';
  }
}

class Form extends UpdatedAt(Model) {
  static get tableName () {
    return `${PREFIX}_form`;
  }

  static get idColumn () {
    return 'formId';
  }

  static relationMappings () {
    return {
      metadata: {
        relation: Model.BelongsToOneRelation,
        modelClass: Metadata,
        join: {
          from: 'form.formId',
          to: `${PREFIX}_form.formId`
        }
      },
      versions: {
        relation: Model.HasManyRelation,
        modelClass: Version,
        join: {
          from: `${PREFIX}_form.formId`,
          to: `${PREFIX}_form_version.formId`
        }
      }
    };
  }
}

class Version extends UpdatedAt(Model) {
  static get tableName () {
    return `${PREFIX}_form_version`;
  }

  static get idColumn () {
    return 'formVersionId';
  }

  static relationMappings () {
    return {
      statusCodes: {
        relation: Model.HasManyRelation,
        modelClass: StatusCode,
        join: {
          from: `${PREFIX}_form_version.formVersionId`,
          to: `${PREFIX}_status_code.formVersionId`
        }
      }
    };
  }

  static get modifiers () {
    return {
      orderDescending(builder) {
        builder.orderBy('formVersionId', 'desc');
      }
    };
  }
}

class Submission extends UpdatedAt(Model) {
  static get tableName () {
    return `${PREFIX}_submission`;
  }

  static get idColumn () {
    return 'submissionId';
  }
}

class StatusCode extends UpdatedAt(Model) {
  static get tableName () {
    return `${PREFIX}_status_code`;
  }

  static get idColumn () {
    return 'code';
  }
}

class SubmissionStatus extends UpdatedAt(Model) {
  static get tableName () {
    return `${PREFIX}_submission_status`;
  }

  static get idColumn () {
    return 'submissionStatusId';
  }
}

class Note extends UpdatedAt(Model) {
  static get tableName () {
    return `${PREFIX}_notes`;
  }

  static get idColumn () {
    return 'noteId';
  }
}

module.exports.Metadata = Metadata;
module.exports.Form = Form;
module.exports.Version = Version;
module.exports.Submission = Submission;
module.exports.StatusCode = StatusCode;
module.exports.SubmissionStatus = SubmissionStatus;
module.exports.Note = Note;
