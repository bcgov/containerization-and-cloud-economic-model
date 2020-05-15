const { Model } = require('objection');
const { UpdatedAt } = require('../../../db/models/mixins');

class Metadata extends UpdatedAt(Model) {
  static get tableName () {
    return 'form';
  }

  static get idColumn () {
    return 'formId';
  }

  static get modifiers () {
    return {
      activeOnly(query, value) {
        if (value !== undefined) {
          query.where('active', true);
        }
      },
      publicOnly(query, value) {
        if (value !== undefined) {
          query.where('public', true);
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
