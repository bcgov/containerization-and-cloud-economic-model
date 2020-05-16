const Models = require('./models');

module.exports = {

  fetch: async (slug) => {
    return Models.Metadata.query()
      .where({slug: slug})
      .throwIfNotFound();
  },

  search: async (params) => {
    return Models.Metadata.query()
      .modify('filterActive', params.active)
      .modify('filterPublic', params.public)
      .modify('filterName', params.name)
      .modify('filterSlug', params.slug)
      .modify('filterKeyword', params.keyword);
  }

};
