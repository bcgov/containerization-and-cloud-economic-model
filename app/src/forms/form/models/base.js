const { Model } = require('objection');
const Models = require('../../common/models');
const constants = require('../constants');

class Metadata extends Models.Timestamps(Model) {
  static get tableName () {
    return 'form';
  }

  static get idColumn () {
    return 'formId';
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

module.exports.Metadata = Metadata;
