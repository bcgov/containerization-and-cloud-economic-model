const Models = require('./models');

module.exports = {

  fetch: async (slug) => {
    return Models.Form.query()
      .where({slug: slug})
      .throwIfNotFound();
  },

  search: async () => {
    return Models.Form.query();
  }

};
