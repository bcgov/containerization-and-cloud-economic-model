const { Model } = require('objection');
const Models = require('../../common/models');

const constants = require('../constants');
const PREFIX = constants.PREFIX;

class Metadata extends Models.Timestamps(Model) {
  static get tableName () {
    return 'form';
  }

  static get idColumn () {
    return 'formId';
  }

  // exclude keywords array from explicit JSON conversion
  // encounter malformed array literal
  static get jsonAttributes() {
    return ['formId', 'name', 'slug', 'prefix', 'public', 'active', 'createdAt', 'updatedBy', 'updatedAt'];
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
        ...Models.stamps
      },
      additionalProperties: false
    };
  }
}

class Form extends Models.Timestamps(Model) {
  static get tableName () {
    return `${PREFIX}_form`;
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
        ...Models.stamps
      },
      additionalProperties: false
    };
  }

  static get relationMappings () {
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

class Version extends Models.Timestamps(Model) {
  static get tableName () {
    return `${PREFIX}_form_version`;
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
        ...Models.stamps
      },
      additionalProperties: false
    };
  }

  static get relationMappings () {
    return {
      statusCodes: {
        relation: Model.ManyToManyRelation,
        modelClass: StatusCode,
        join: {
          from: `${PREFIX}_form_version.formVersionId`,
          through: {
            from: `${PREFIX}_version_status_code.formVersionId`,
            to: `${PREFIX}_version_status_code.code`
          },
          to: `${PREFIX}_status_code.code`
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

class StatusCode extends Models.Timestamps(Model) {
  static get tableName () {
    return `${PREFIX}_status_code`;
  }

  static get idColumn () {
    return 'code';
  }

  // exclude nextCodes array from explicit JSON conversion
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
        ...Models.stamps
      },
      additionalProperties: false
    };
  }

  static get relationMappings () {
    return {
      versions: {
        relation: Model.ManyToManyRelation,
        modelClass: Version,
        join: {
          from: `${PREFIX}_status_code.code`,
          through: {
            from: `${PREFIX}_version_status_code.code`,
            to: `${PREFIX}_version_status_code.formVersionId`
          },
          to: `${PREFIX}_form_version.formVersionId`
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

class Note extends Models.Timestamps(Model) {
  static get tableName () {
    return `${PREFIX}_note`;
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
        ...Models.stamps
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

module.exports.Metadata = Metadata;
module.exports.Form = Form;
module.exports.Version = Version;
module.exports.StatusCode = StatusCode;
module.exports.Note = Note;
