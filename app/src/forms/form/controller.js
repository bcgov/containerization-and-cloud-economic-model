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
      const response = await dataService.search(req.searchParameters);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
};
