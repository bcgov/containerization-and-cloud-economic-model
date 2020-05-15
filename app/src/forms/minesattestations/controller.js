const dataService = require('./dataService');

module.exports = {
  create: async (req, res, next) => {
    try {
      // there can be only 1!
      let response = await dataService.exists();
      if (response) {
        response = await dataService.read();
        res.status(302).json(response);
      } else {
        const createdBy ='this gets replaced with token value';
        response = await dataService.create(req.body, createdBy);
        res.status(201).json(response);
      }
    } catch (error) {
      next(error);
    }
  },

  read: async (req, res, next) => {
    try {
      const response = await dataService.read();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  current: async (req, res, next) => {
    try {
      const response = await dataService.current();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  all:  async (req, res, next) => {
    try {
      const response = await dataService.all();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  createSubmission: async (req, res, next) => {
    try {
      const response = await dataService.createSubmission(req.body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  },

  readSubmission: async (req, res, next) => {
    try {
      const response = await dataService.readSubmission(req.params.confirmationId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

};
