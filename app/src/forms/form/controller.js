const dataService = require('./dataService');

module.exports = {
  fetch: async (req, res, next) => {
    try {
      let formId = req.params.slug;
      const response = await dataService.fetch(formId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
  search:  async (req, res, next) => {
    try {
      const response = await dataService.search(req.query.name, req.query.slug, req.query.keyword, req.query.public, req.query.active);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
};
