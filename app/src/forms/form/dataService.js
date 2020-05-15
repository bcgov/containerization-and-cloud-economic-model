const Models = require('./models');

module.exports = {

  fetch: async (slug) => {
    return Models.Metadata.query()
      .where({slug: slug})
      .throwIfNotFound();
  },

  search: async (name, slug, keyword, publicOnly, activeOnly) => {
    return Models.Metadata.query()
      .modify('activeOnly', activeOnly)
      .modify('publicOnly', publicOnly)
      .modify('filterName', name)
      .modify('filterSlug', slug)
      .modify('filterKeyword', keyword);
  }

};
