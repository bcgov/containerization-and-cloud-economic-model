const { Model } = require('objection');
const { UpdatedAt } = require('../../../db/models/mixins');

class Form extends UpdatedAt(Model) {
  static get tableName () {
    return 'camp_form';
  }

  static get idColumn () {
    return 'formId';
  }

}

module.exports = Form;
