const EventEmitter = require('events');

const events = require('./events');

class Controller extends EventEmitter {
  constructor(dataService) {
    super();
    this._dataService = dataService;
  }

  async current(req, res, next) {
    try {
      const response = await this._dataService.current();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async createSubmissionStatus (req, res, next) {
    try {
      const response = await this._dataService.createSubmissionStatus(req.body, req.params.submissionId, req.currentUser);
      this.emit(events.STATUS_CREATED, response);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async readSubmissionStatuses(req, res, next){
    try {
      const response = await this._dataService.readSubmissionStatuses(req.params.submissionId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async createSubmissionStatusNote(req, res, next){
    try {
      const response = await this._dataService.createSubmissionStatusNote(req.body, req.params.statusId, req.currentUser);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async readSubmissionStatusNotes (req, res, next){
    try {
      const response = await this._dataService.readSubmissionStatusNotes(req.params.statusId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async createSubmissionNote(req, res, next) {
    try {
      const response = await this._dataService.createSubmissionNote(req.body, req.params.submissionId, req.currentUser);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async readSubmissionNotes(req, res, next) {
    try {
      const response = await this._dataService.readSubmissionNotes(req.params.submissionId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async readCurrentStatusCodes(req, res, next) {
    try {
      const enabled = ['true','false'].includes(req.query.enabled) ? req.query.enabled === 'true' : undefined;
      const response = await this._dataService.readCurrentStatusCodes(enabled);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateCurrentStatusCodes(req, res, next) {
    try {
      const response = await this._dataService.updateCurrentStatusCodes(req.body, req.currentUser);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async createSettings(req, res, next){
    try {
      const response = await this._dataService.createSettings(req.body, req.currentUser);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateSettings (req, res, next) {
    try {
      const response = await this._dataService.updateSettings(req.params.name, req.body, req.currentUser);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async readSettings(req, res, next) {
    try {
      const response = await this._dataService.readSettings(req.params.name);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async allSettings(req, res, next){
    try {
      const enabled = ['true','false'].includes(req.query.enabled) ? req.query.enabled === 'true' : undefined;
      const response = await this._dataService.allSettings(enabled);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
