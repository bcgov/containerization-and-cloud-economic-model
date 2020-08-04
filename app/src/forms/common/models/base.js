const { Model } = require('objection');
const constants = require('../constants');
const stamps = require('./jsonSchema').stamps;
const Timestamps = require('./mixins').Timestamps;

class Metadata extends Timestamps(Model) {
  static get tableName () {
    return 'form';
  }

  static get idColumn () {
    return 'formId';
  }

  // exclude keywords array from explicit JSON conversion
  // encounter malformed array literal
  static get jsonAttributes() {
    return ['formId', 'name', 'slug', 'prefix', 'public', 'active', 'createdBy', 'createdAt', 'updatedBy', 'updatedAt'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'slug', 'public', 'active', 'prefix'],
      properties: {
        formId: { type: 'string', pattern: constants.UUID_REGEX },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        slug: { type: 'string', minLength: 1, maxLength: 255 },
        prefix: { type: 'string', minLength: 1, maxLength: 255 },
        public: { type: 'boolean' },
        active: { type: 'boolean' },
        keywords: { type: 'array', items: { type: 'string'}},
        ...stamps
      },
      additionalProperties: false
    };
  }

  static get modifiers () {
    return {
      filterActive(query, value) {
        if (value !== undefined) {
          query.where('active', value);
        }
      },
      filterPublic(query, value) {
        if (value !== undefined) {
          query.where('public', value);
        }
      },
      filterName(query, value) {
        if (value) {
          // ilike is postrges case insensitive like
          query.where('name', 'ilike', `%${value}%`);
        }
      },
      filterSlug(query, value) {
        if (value) {
          // ilike is postrges case insensitive like
          query.where('slug', 'ilike', `%${value}%`);
        }
      },
      filterKeyword(query, value) {
        if (value) {
          query.whereRaw(`'${value}' = ANY (keywords)`);
        }
      }
    };
  }
}

class Form extends Timestamps(Model) {

  static get Metadata () {
    return undefined;
  }

  static get Version () {
    return undefined;
  }

  static get tablePrefix () {
    return undefined;
  }

  static get tableName () {
    return `${this.tablePrefix}_form`;
  }

  static get idColumn () {
    return 'formId';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        formId: { type: 'string', pattern: constants.UUID_REGEX },
        description: { type: ['string', 'null'], maxLength: 255 },
        ...stamps
      },
      additionalProperties: false
    };
  }

  static get relationMappings () {
    return {
      metadata: {
        relation: Model.BelongsToOneRelation,
        modelClass: this.Metadata,
        join: {
          from: 'form.formId',
          to: `${this.tablePrefix}_form.formId`
        }
      },
      versions: {
        relation: Model.HasManyRelation,
        modelClass: this.Version,
        join: {
          from: `${this.tablePrefix}_form.formId`,
          to: `${this.tablePrefix}_form_version.formId`
        }
      }
    };
  }
}

class Version extends Timestamps(Model) {

  static get StatusCode () {
    return undefined;
  }

  static get tablePrefix () {
    return undefined;
  }

  static get tableName () {
    return `${this.tablePrefix}_form_version`;
  }

  static get idColumn () {
    return 'formVersionId';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        formVersionId: { type: 'integer' },
        formId: { type: 'string', pattern: constants.UUID_REGEX },
        changes: { type: ['string', 'null'], maxLength: 255 },
        ...stamps
      },
      additionalProperties: false
    };
  }

  static get relationMappings () {
    return {
      statusCodes: {
        relation: Model.ManyToManyRelation,
        modelClass: this.StatusCode,
        join: {
          from: `${this.tablePrefix}_form_version.formVersionId`,
          through: {
            from: `${this.tablePrefix}_version_status_code.formVersionId`,
            to: `${this.tablePrefix}_version_status_code.code`
          },
          to: `${this.tablePrefix}_status_code.code`
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

class StatusCode extends Timestamps(Model) {

  static get Version () {
    return undefined;
  }

  static get tablePrefix () {
    return undefined;
  }

  static get tableName () {
    return `${this.tablePrefix}_status_code`;
  }

  static get idColumn () {
    return 'code';
  }

  // exclude nextCodes and allowedClassifications arrays from explicit JSON conversion
  // encounter malformed array literal
  static get jsonAttributes() {
    return ['code', 'display', 'enabled', 'formVersionId', 'createdBy', 'createdAt', 'updatedBy', 'updatedAt'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['code', 'display', 'enabled'],
      properties: {
        code: { type: 'string', minLength: 1, maxLength: 255 },
        display: { type: 'string', minLength: 1, maxLength: 255 },
        enabled: { type: 'boolean' },
        nextCodes: { type: 'array', items: { type: 'string'}},
        allowedClassifications: { type: ['array', 'null'], items: { type: 'string'}},
        ...stamps
      },
      additionalProperties: false
    };
  }

  static get relationMappings () {
    return {
      versions: {
        relation: Model.ManyToManyRelation,
        modelClass: this.Version,
        join: {
          from: `${this.tablePrefix}_status_code.code`,
          through: {
            from: `${this.tablePrefix}_version_status_code.code`,
            to: `${this.tablePrefix}_version_status_code.formVersionId`
          },
          to: `${this.tablePrefix}_form_version.formVersionId`
        }
      }
    };
  }

  static get modifiers () {
    return {
      filterEnabled(query, value) {
        if (value !== undefined) {
          query.where('enabled', value);
        }
      }
    };
  }

}

class Note extends Timestamps(Model) {

  static get tablePrefix () {
    return undefined;
  }

  static get tableName () {
    return `${this.tablePrefix}_note`;
  }

  static get idColumn () {
    return 'noteId';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['note'],
      properties: {
        note: { type: 'string', minLength: 1, maxLength: 4000 },
        submissionId: { type: 'string', pattern: constants.UUID_REGEX },
        submissionStatusId: { type: 'integer' },
        ...stamps
      },
      additionalProperties: false
    };
  }

  static get modifiers () {
    return {
      orderDescending(builder) {
        builder.orderBy('noteId', 'desc');
      }
    };
  }
}

class Settings extends Timestamps(Model) {

  static get tablePrefix () {
    return undefined;
  }

  static get tableName () {
    return `${this.tablePrefix}_settings`;
  }

  static get idColumn () {
    return 'name';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'enabled', 'config'],
      properties: {
        name: { type: 'string', minLength: 1, maxLength: 255 },
        enabled: { type: 'boolean' },
        config: { type: 'jsonb' },
        ...stamps
      },
      additionalProperties: false
    };
  }

  static get modifiers () {
    return {
      filterEnabled(query, value) {
        if (value !== undefined) {
          query.where('enabled', value);
        }
      },
      orderDescending(builder) {
        builder.orderBy('updatedAt', 'desc');
      }
    };
  }
}

class Submission extends Timestamps(Model) {

  static get Note () {
    return undefined;
  }

  static get Status () {
    return undefined;
  }

  static get tablePrefix () {
    return undefined;
  }

  static get tableName () {
    return `${this.tablePrefix}_submission`;
  }

  static get idColumn () {
    return 'submissionId';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['submissionId', 'formVersionId', 'confirmationId'],
      properties: {
        submissionId: { type: 'string', pattern: constants.UUID_REGEX },
        confirmationId: { type: 'string', pattern: constants.CONFIRMATION_ID_REGEX },
        formVersionId: { type: 'integer'},
        deleted: { type: 'boolean' },
        ...stamps
      },
      additionalProperties: false
    };
  }

  static get modifiers () {
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
      }
    };
  }

  static get relationMappings () {
    return {
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

class Status extends Timestamps(Model) {

  static get Note() {
    return undefined;
  }

  static get StatusCode() {
    return undefined;
  }

  static get tablePrefix() {
    return undefined;
  }

  static get tableName() {
    return `${this.tablePrefix}_submission_status`;
  }

  static get idColumn() {
    return 'submissionStatusId';
  }

  static get modifiers() {
    return {
      orderDescending(builder) {
        builder.orderBy('submissionStatusId', 'desc');
      }
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['submissionId', 'code'],
      properties: {
        submissionStatusId: {type: 'integer'},
        submissionId: {type: 'string', pattern: constants.UUID_REGEX},
        code: {type: 'string', minLength: 1, maxLength: 255},
        assignedTo: {type: ['string', 'null'], maxLength: 255},
        assignedToEmail: {type: ['string', 'null'], maxLength: 255},
        actionDate: {type: 'string', format: 'date'},
        classification: {type: ['string', 'null'], maxLength: 255},
        ...stamps
      },
      additionalProperties: false
    };
  }

  static get relationMappings () {
    return {
      notes: {
        relation: Model.HasManyRelation,
        modelClass: this.Note,
        join: {
          from: `${this.tablePrefix}_submission_status.submissionStatusId`,
          to: `${this.tablePrefix}_note.submissionStatusId`
        }
      },
      statusCode: {
        relation: Model.HasOneRelation,
        modelClass: this.StatusCode,
        join: {
          from: `${this.tablePrefix}_submission_status.code`,
          to: `${this.tablePrefix}_status_code.code`
        }
      },
    };
  }
}

class SubmissionSearchView extends Model {

  static get tablePrefix () {
    return undefined;
  }

  static get tableName () {
    return `${this.tablePrefix}_submission_search_vw`;
  }

  static get idColumn () {
    return 'submissionId';
  }
}

module.exports.Metadata = Metadata;
module.exports.Form = Form;
module.exports.Version = Version;
module.exports.StatusCode = StatusCode;
module.exports.Note = Note;
module.exports.Settings = Settings;
module.exports.Submission = Submission;
module.exports.Status = Status;
module.exports.SubmissionSearchView = SubmissionSearchView;
