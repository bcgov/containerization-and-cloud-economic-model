const dataService = require('./dataService');
const emailService = require('./emailService');

module.exports = {
  create: async (req, res, next) => {
    try {
      // there can be only 1!
      let response = await dataService.exists();
      if (response) {
        response = await dataService.read();
        res.status(302).json(response);
      } else {
        response = await dataService.create(req.body, req.currentUser);
        res.status(201).json(response);
      }
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const response = await dataService.update(req.body, req.currentUser);
      res.status(200).json(response);
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

  searchSubmissions:  async (req, res, next) => {
    try {
      const response = await dataService.searchSubmissions(req.searchParameters);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  createSubmission: async (req, res, next) => {
    try {
      const response = await dataService.createSubmission(req.body);
      // don't await here...
      emailService.sendNotificationEmail(response);
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
      const response = await dataService.updateSubmission(req.params.submissionId, req.body, req.currentUser);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  createSubmissionStatus: async (req, res, next) => {
    try {
      const response = await dataService.createSubmissionStatus(req.body, req.params.submissionId, req.currentUser);
      // don't await here...
      emailService.sendStatusAssignmentEmail(response);
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
      const response = await dataService.createSubmissionStatusNote(req.body, req.params.statusId, req.currentUser);
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
      const response = await dataService.createSubmissionNote(req.body, req.params.submissionId, req.currentUser);
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
  },

  readCurrentStatusCodes: async (req, res, next) => {
    try {
      const enabled = ['true','false'].includes(req.query.enabled) ? req.query.enabled === 'true' : undefined;
      const response = await dataService.readCurrentStatusCodes(enabled);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  updateCurrentStatusCodes: async (req, res, next) => {
    try {
      const response = await dataService.updateCurrentStatusCodes(req.body, req.currentUser);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  },

  createSettings: async (req, res, next) => {
    try {
      const response = await dataService.createSettings(req.body, req.currentUser);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  },

  updateSettings: async (req, res, next) => {
    try {
      const response = await dataService.updateSettings(req.params.name, req.body, req.currentUser);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  readSettings: async (req, res, next) => {
    try {
      const response = await dataService.readSettings(req.params.name);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  allSettings: async (req, res, next) => {
    try {
      const enabled = ['true','false'].includes(req.query.enabled) ? req.query.enabled === 'true' : undefined;
      const response = await dataService.allSettings(enabled);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  sendSubmissionEmail: async (req, res, next) => {
    try {
      const submission = await dataService.readSubmission(req.body.submissionId);
      const result = await emailService.sendSubmissionEmail(submission, req.body.to);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

};
