const { Model } = require('objection');
const { Timestamps } = require('../../../db/models/mixins');

const constants = require('../constants');
const PREFIX = constants.PREFIX;

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
        createdBy: { type: ['string', 'null'] },
        createdAt: { type: ['string', 'null'], format: 'date-time' },
        updatedBy: { type: ['string', 'null'] },
        updatedAt: { type: ['string', 'null'], format: 'date-time' }
      },
      additionalProperties: false
    };
  }
}

class Form extends Timestamps(Model) {
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
        createdBy: { type: ['string', 'null'] },
        createdAt: { type: ['string', 'null'], format: 'date-time' },
        updatedBy: { type: ['string', 'null'] },
        updatedAt: { type: ['string', 'null'], format: 'date-time' }
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

class Version extends Timestamps(Model) {
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
        changes: { type: ['string', 'null'], maxLength: 255 },
        createdBy: { type: ['string', 'null'] },
        createdAt: { type: ['string', 'null'], format: 'date-time' },
        updatedBy: { type: ['string', 'null'] },
        updatedAt: { type: ['string', 'null'], format: 'date-time' }
      },
      additionalProperties: false
    };
  }

  static get relationMappings () {
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

class StatusCode extends Timestamps(Model) {
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
      required: ['code', 'display', 'enabled', 'formVersionId'],
      properties: {
        formVersionId: { type: 'integer' },
        code: { type: 'string', minLength: 1, maxLength: 255 },
        display: { type: 'string', minLength: 1, maxLength: 255 },
        enabled: { type: 'boolean' },
        nextCodes: { type: 'array', items: { type: 'string'}},
        createdBy: { type: ['string', 'null'] },
        createdAt: { type: ['string', 'null'], format: 'date-time' },
        updatedBy: { type: ['string', 'null'] },
        updatedAt: { type: ['string', 'null'], format: 'date-time' }
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
      }
    };
  }

}

class Note extends Timestamps(Model) {
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
        createdBy: { type: ['string', 'null'] },
        createdAt: { type: ['string', 'null'], format: 'date-time' },
        updatedBy: { type: ['string', 'null'] },
        updatedAt: { type: ['string', 'null'], format: 'date-time' }
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
