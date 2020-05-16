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

  allSubmissions:  async (req, res, next) => {
    try {
      const response = await dataService.allSubmissions();
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
      const response = await dataService.readSubmission(req.params.submissionId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  updateSubmission: async (req, res, next) => {
    try {
      const user = 'replace from auth';
      const response = await dataService.updateSubmission(req.body, user);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  createSubmissionStatus: async (req, res, next) => {
    try {
      const user = 'replace from auth';
      const response = await dataService.createSubmissionStatus(req.body, req.params.submissionId, user);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  },

  readSubmissionStatuses: async (req, res, next) => {
    try {
      const response = await dataService.readSubmissionStatuses(req.params.submissionId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  createSubmissionStatusNote: async (req, res, next) => {
    try {
      const user = 'replace from auth';
      const response = await dataService.createSubmissionStatusNote(req.body, req.params.statusId, user);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  },

  readSubmissionStatusNotes: async (req, res, next) => {
    try {
      const response = await dataService.readSubmissionStatusNotes(req.params.statusId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  createSubmissionNote: async (req, res, next) => {
    try {
      const user = 'replace from auth';
      const response = await dataService.createSubmissionNote(req.body, req.params.submissionId, user);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  },

  readSubmissionNotes: async (req, res, next) => {
    try {
      const response = await dataService.readSubmissionNotes(req.params.submissionId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }


};
